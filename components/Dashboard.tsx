'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'
import { PackageSearch } from 'lucide-react'
import { useEffect } from 'react'

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  color: string;
  size: string;
}

interface Order {
  id: string;
  totalAmount: number;
  createdAt: string;
  customerDetails: {
    firstName: string;
    lastName: string;
    email: string;
  };
  items: OrderItem[];
}

export default function DashboardClient({ orders }: { orders: Order[] }) {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    console.log('Orders received in DashboardClient:', JSON.stringify(orders, null, 2))
  }, [orders])

  if (!isLoaded) {
    console.log('User not loaded yet')
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const role = user?.publicMetadata?.role
  console.log('User role:', role)

  if (role !== 'admin') {
    console.log('User is not an admin, redirecting')
    router.push('/')
    return null
  }

  if (!Array.isArray(orders)) {
    console.error('Orders is not an array:', orders)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-xl font-semibold text-red-600">Error Loading Orders</h2>
        <p className="text-gray-500 mt-2">There was an error loading the orders. Please try again later.</p>
      </div>
    )
  }

  if (orders.length === 0) {
    console.log('No orders found in DashboardClient')
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600">No Orders Found</h2>
        <p className="text-gray-500 mt-2">Orders will appear here once customers start placing them.</p>
      </div>
    )
  }

  console.log('Rendering orders in DashboardClient')
    
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders Dashboard</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold">Order #{order.id}</h2>
            <p>Customer: {order.customerDetails.firstName} {order.customerDetails.lastName}</p>
            <p>Email: {order.customerDetails.email}</p>
            <p>Total Amount: PKR {order.totalAmount.toLocaleString()}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <h3 className="text-lg font-semibold mt-2">Items:</h3>
            <ul className="list-disc list-inside">
              {order.items.map((item) => (
                <li key={item.id} className="ml-4">
                  {item.name} - Quantity: {item.quantity}, Price: PKR {item.price.toLocaleString()}, Color: {item.color}, Size: {item.size}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}