'use client'

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from 'next/navigation'
import { PackageSearch } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


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
    city: string;
    houseNo: string;
    postalCode: number;
    phoneNumber: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  items: OrderItem[];
}

export default function DashboardClient({ orders }: { orders: Order[] }) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const ordersPerPage = 10

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const { user, isLoaded } = useUser()
  const router = useRouter()


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
    <div className="min-h-screen">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{`${order.customerDetails.firstName} ${order.customerDetails.lastName}`}</TableCell>
              <TableCell>{order.customerDetails.email}</TableCell>
              <TableCell>{order.customerDetails.phoneNumber}</TableCell>
              <TableCell className="flex flex-col">{`${order.customerDetails.city}, ${order.customerDetails.houseNo}, ${order.customerDetails.postalCode}`}</TableCell>
              <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{`${item.name} (x${item.quantity})`}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}