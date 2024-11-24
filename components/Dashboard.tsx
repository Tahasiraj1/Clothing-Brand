'use client'

import { useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'

interface Order {
  id: string;
  totalAmount: number;
  createdAt: Date;
  customerDetails: {
    firstName: string;
    lastName: string;
  } | null;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export default function DashboardClient({ orders }: { orders: Order[] }) {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  if (!isLoaded) return <div>Loading...</div>

  const role = user?.publicMetadata?.role

  if (role !== 'admin') {
    router.push('/')
    return null
  }
    
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders Dashboard</h1>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">Order #{order.id}</h2>
            <p>Customer: {order.customerDetails?.firstName} {order.customerDetails?.lastName}</p>
            <p>Total Amount: PKR {order.totalAmount}</p>
            <p>Date: {order.createdAt.toLocaleString()}</p>
            <h3 className="text-lg font-semibold mt-2">Items:</h3>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity}, Price: PKR {item.price}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}