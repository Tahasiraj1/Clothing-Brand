import { Suspense } from 'react'
import ConfirmedOrdersClient from '@/components/ConfirmedOrders'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getConfirmedOrders() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_CONFIRMED_API_URL || `https://clothing-brand-beige.vercel.app/api/orders?status=confirmed`
    console.log('Fetching confirmed orders from:', apiUrl)
    
    const res = await fetch(apiUrl, { 
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
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
    <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>
          <div className='gap-4 flex'>
            <Link href="/dashboard">
              <Button className="bg-emerald-800 hover:bg-emerald-800 text-white">
                Pending Orders
              </Button>
            </Link>
            <Link href="/dashboard/dispatched-orders">
              <Button className="bg-emerald-800 hover:bg-emerald-800 text-white">
                Dispatched Orders
              </Button>
            </Link>
          </div>
        </div>
      <Suspense fallback={<div>Loading orders...</div>}>
        <ConfirmedOrdersClient orders={orders} />
      </Suspense>
    </div>
  );
}