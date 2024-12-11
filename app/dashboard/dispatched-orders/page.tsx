import { Suspense } from 'react'
import DispatchedOrdersClient from '@/components/DispatchedOrders'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getDispatchedOrders() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_DISPATCHED_API_URL || `https://clothing-brand-beige.vercel.app/api/orders?status=dispatched`
    console.log('Fetching dispatched orders from:', apiUrl)
    
    const res = await fetch(apiUrl, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
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
          <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>
          <div className='gap-4 flex'>
            <Link href="/dashboard">
              <Button className="bg-emerald-800 hover:bg-emerald-800 text-white">
                Pending Orders
              </Button>
            </Link>
            <Link href="/dashboard/confirmed-orders">
              <Button className="bg-emerald-800 hover:bg-emerald-800 text-white">
                Confirmed Orders
              </Button>
            </Link>
          </div>
        </div>
        <Suspense fallback={<div>Loading orders...</div>}>
          <DispatchedOrdersClient orders={orders} />
        </Suspense>
    </div>
  );
}