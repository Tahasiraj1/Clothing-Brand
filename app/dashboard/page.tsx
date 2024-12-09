import { Suspense } from 'react'
import DashboardClient from '@/components/Dashboard'

async function getOrders() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://clothing-brand-beige.vercel.app/api/orders?status=pending'
    console.log('Fetching orders from:', apiUrl)
    
    const res = await fetch(apiUrl, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch orders: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    // console.log('Fetched orders:', JSON.stringify(data, null, 2))
    return data.data
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

export default async function DashboardPage() {
  const orders = await getOrders()
  console.log('Pending Orders in DashboardPage:', JSON.stringify(orders, null, 2))
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Suspense fallback={<div>Loading orders...</div>}>
        <DashboardClient orders={orders} />
      </Suspense>
    </div>
  )
}
