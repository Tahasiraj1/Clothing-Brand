import { Suspense } from 'react'
import DashboardClient from '@/components/Dashboard'

async function getOrders() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}`, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error('Failed to fetch orders')
    }
    const data = await res.json()
    console.log('Fetched orders:', data)
    return data.data
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

export default async function DashboardPage() {
  const orders = await getOrders()
  console.log('Orders in DashboardPage:', orders)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Suspense fallback={<div>Loading orders...</div>}>
        <DashboardClient orders={orders} />
      </Suspense>
    </div>
  )
}