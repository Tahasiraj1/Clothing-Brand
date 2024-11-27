'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'
import { PackageSearch } from 'lucide-react'

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  totalAmount: number;
  createdAt: string;
  customerDetails: {
    firstName: string;
    lastName: string;
  } | null;
  items: OrderItem[];
}

export default function DashboardClient({ orders }: { orders: Order[] }) {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const role = user?.publicMetadata?.role

  if (role !== 'admin') {
    router.push('/')
    return null
  }

  console.log('Orders in DashboardClient:', orders)

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600">No Orders Found</h2>
        <p className="text-gray-500 mt-2">Orders will appear here once customers start placing them.</p>
      </div>
    )
  }
    
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders Dashboard</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold">Order #{order.id}</h2>
            <p>Customer: {order.customerDetails?.firstName} {order.customerDetails?.lastName}</p>
            <p>Total Amount: PKR {order.totalAmount.toLocaleString()}</p>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            <h3 className="text-lg font-semibold mt-2">Items:</h3>
            <ul className="list-disc list-inside">
              {order.items.map((item, index) => (
                <li key={index} className="ml-4">
                  {item.name} - Quantity: {item.quantity}, Price: PKR {item.price.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}