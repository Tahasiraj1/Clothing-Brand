import { Suspense } from 'react'
import DashboardClient from '@/components/Dashboard'
import OrdersTypeSelector from '@/components/OrdersTypeSelector'
import { auth } from '@clerk/nextjs/server';

async function getOrders() {
  try {
    const { userId, getToken } = await auth();
    const token = await getToken();

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const apiUrl = process.env.NEXT_PUBLIC_PENDING_API_URL || 'https://clothing-brand-beige.vercel.app/api/orders?status=pending'
    console.log('Fetching orders from:', apiUrl)
    
    const res = await fetch(apiUrl, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>
          <OrdersTypeSelector currentPage="pending" />
        </div>
      <Suspense fallback={<div>Loading orders...</div>}>
        <DashboardClient orders={orders} />
      </Suspense>
    </div>
  )
}
