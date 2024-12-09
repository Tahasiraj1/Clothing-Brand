import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'


export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received order data:', JSON.stringify(body, null, 2))

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { customerDetails, items, totalAmount } = body

    if (!customerDetails || !items || typeof totalAmount !== 'number') {
      return NextResponse.json(
        { success: false, error: 'Invalid order data' },
        { status: 400 }
      )
    }

    const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'email', 'city', 'houseNo', 'postalCode', 'country']
    for (const field of requiredFields) {
      if (!customerDetails[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const order = await prisma.order.create({
      data: {
        customerDetails,
        items,
        totalAmount,
        status: 'pending' // This should now work with the updated schema
      }
    })

    console.log('Order created successfully:', JSON.stringify(order, null, 2))

    return NextResponse.json({ success: true, data: order, orderId: order.id, orderDate: order.updatedAt }, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    
    let errorMessage = 'An unexpected error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create order', details: errorMessage },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  console.log('GET request received for orders')
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where = status ? { status } : {}

    const orders = await prisma.order.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`Found ${orders.length} orders:`, JSON.stringify(orders, null, 2))

    if (!orders || orders.length === 0) {
      console.log('No orders found')
      return NextResponse.json({ success: false, message: 'No orders found' }, { status: 404 })
    }

    console.log('Returning orders')
    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    console.log('Received update data:', JSON.stringify(body, null, 2))

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { ids, status } = body

    if (!Array.isArray(ids) || ids.length === 0 || typeof status !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid update data' },
        { status: 400 }
      )
    }

    const updatedOrders = await prisma.order.updateMany({
      where: {
        id: { in: ids }
      },
      data: {
        status
      }
    })

    console.log('Orders updated successfully:', JSON.stringify(updatedOrders, null, 2))

    return NextResponse.json({ success: true, updatedCount: updatedOrders.count }, { status: 200 })
  } catch (error) {
    console.error('Error updating orders:', error)
    
    let errorMessage = 'An unexpected error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update orders', details: errorMessage },
      { status: 500 }
    )
  }
}