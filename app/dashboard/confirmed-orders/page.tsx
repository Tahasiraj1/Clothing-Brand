import { Suspense } from 'react'
import ConfirmedOrdersClient from '@/components/ConfirmedOrders'
import OrdersTypeSelector from '@/components/OrdersTypeSelector'
import { auth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic'

async function getConfirmedOrders() {
  try {
    const { userId, getToken } = await auth();
    const token = await getToken();

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const apiUrl = process.env.NEXT_PUBLIC_CONFIRMED_API_URL || `https://clothing-brand-beige.vercel.app/api/orders?status=confirmed`
    console.log('Fetching confirmed orders from:', apiUrl)
    
    const res = await fetch(apiUrl, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch confirmed orders: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    // console.log('Fetched confirmed orders:', JSON.stringify(data, null, 2))
    return data.data
  } catch (error) {
    console.error('Error fetching confirmed orders:', error)
    return []
  }
}

export default async function ConfirmedOrdersPage() {
  const orders = await getConfirmedOrders()
  console.log('Confirmed Orders in ConfirmedOrdersPage:', JSON.stringify(orders, null, 2))

  return (
    <div className="w-full px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Confirmed Orders</h1>
          <OrdersTypeSelector currentPage='confirmed' />
        </div>
      <Suspense fallback={<div>Loading orders...</div>}>
        <ConfirmedOrdersClient orders={orders} />
      </Suspense>
    </div>
  );
}