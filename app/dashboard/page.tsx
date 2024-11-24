import { PrismaClient } from '@prisma/client'
import DashboardClient from '@/components/Dashboard'
import { headers } from 'next/headers'

async function getOrders() {
  try {
    const prisma = new PrismaClient()
    const orders = await prisma.order.findMany({
      include: {
        customerDetails: true,
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    await prisma.$disconnect()
    return { orders, error: null }
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return { 
      orders: [], 
      error: 'Failed to connect to the database. Please try again later.' 
    }
  }
}

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const { orders, error } = await getOrders()

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    )
  }

  return <DashboardClient orders={orders} />
}