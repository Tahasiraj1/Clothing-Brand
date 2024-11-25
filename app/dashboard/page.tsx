// import { PrismaClient } from '@prisma/client'
// import DashboardClient from '@/components/Dashboard'

// async function getOrders() {
//   try {
//     const prisma = new PrismaClient()
//     const orders = await prisma.order.findMany({
//       include: {
//         customerDetails: true,
//         items: true,
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     })
//     await prisma.$disconnect()
//     return { orders, error: null }
//   } catch (error) {
//     console.error('Failed to fetch orders:', error)
//     return { 
//       orders: [], 
//       error: 'Failed to connect to the database. Please try again later.' 
//     }
//   }
// }

// export const dynamic = 'force-dynamic'

// export default async function DashboardPage() {
//   const { orders, error } = await getOrders()

//   if (error) {
//     return (
//       <div className="p-4">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Error:</strong>
//           <span className="block sm:inline"> {error}</span>
//         </div>
//       </div>
//     )
//   }

//   return <DashboardClient orders={orders} />
// }




import { Suspense } from 'react'
import DashboardClient from '@/components/Dashboard';

async function getOrders() {
  try {
    // Since this is a server component, we can directly call the API route
    const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/orders`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error('Failed to fetch orders')
    }
    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

export default async function DashboardPage() {
  const orders = await getOrders()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Suspense fallback={<div>Loading orders...</div>}>
        <DashboardClient orders={orders} />
      </Suspense>
    </div>
  )
}