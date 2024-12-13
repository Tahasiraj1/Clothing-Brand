import { Suspense } from 'react'
import DispatchedOrdersClient from '@/components/DispatchedOrders'
import OrdersTypeSelector from '@/components/OrdersTypeSelector'
import { auth } from '@clerk/nextjs/server';

async function getDispatchedOrders() {
  try {
    const { userId, getToken } = await auth();
    const token = await getToken();

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const apiUrl = process.env.NEXT_PUBLIC_DISPATCHED_API_URL || `https://clothing-brand-beige.vercel.app/api/orders?status=dispatched`
    console.log('Fetching dispatched orders from:', apiUrl)
    
    const res = await fetch(apiUrl, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch dispatched orders: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    // console.log('Fetched dispatched orders:', JSON.stringify(data, null, 2))
    return data.data
  } catch (error) {
    console.error('Error fetching dispatched orders:', error)
    return []
  }
}

export default async function DispatchedOrdersPage() {
  const orders = await getDispatchedOrders()
  console.log('Dispatched Orders in DispatchedOrdersPage:', JSON.stringify(orders, null, 2))

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">Dispatched Orders</h1>
          <OrdersTypeSelector currentPage='dispatched' />
        </div>
        <Suspense fallback={<div>Loading orders...</div>}>
          <DispatchedOrdersClient orders={orders} />
        </Suspense>
    </div>
  );
}