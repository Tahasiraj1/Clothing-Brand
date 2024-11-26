import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received order data:', JSON.stringify(body, null, 2))

    if (!body || typeof body !== 'object') {
      console.error('Invalid request body:', body)
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { customerDetails, items, totalAmount } = body

    if (!customerDetails || !items || typeof totalAmount !== 'number') {
      console.error('Invalid order data:', { customerDetails, items, totalAmount })
      return NextResponse.json(
        { success: false, error: 'Invalid order data' },
        { status: 400 }
      )
    }

    console.log('Creating order with data:', JSON.stringify({ customerDetails, items, totalAmount }, null, 2))

    const order = await prisma.order.create({
      data: {
        customerDetails: {
          create: customerDetails
        },
        items: {
          create: items
        },
        totalAmount
      },
      include: {
        customerDetails: true,
        items: true
      }
    })

    console.log('Order created successfully:', JSON.stringify(order, null, 2))

    return NextResponse.json({ success: true, data: order }, { status: 201 })
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

export async function GET() {
  try {
    console.log("Fetching orders from the database...");
    const orders = await prisma.order.findMany({
      include: {
        customerDetails: true,
        items: true
      }
    })
    console.log("Fetched orders:", orders);

    if (!orders || orders.length === 0) {
      return NextResponse.json({ success: false, error: 'No orders found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}