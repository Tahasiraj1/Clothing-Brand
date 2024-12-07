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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

  if (!Array.isArray(orders)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-xl font-semibold text-red-600">Error Loading Orders</h2>
        <p className="text-gray-500 mt-2">There was an error loading the orders. Please try again later.</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600">No Orders Found</h2>
        <p className="text-gray-500 mt-2">Orders will appear here once customers start placing them.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="overflow-x-auto">
        <Table className="border border-emerald-800 bg-lime-100 w-full">
          <TableHeader>
            <TableRow className="border border-emerald-800">
              <TableHead className="hidden md:table-cell">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="hidden md:table-cell">Items</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow className="border-emerald-800 hover:bg-lime-200" key={order.id}>
                <TableCell className="hidden md:table-cell">{order.id}</TableCell>
                <TableCell>{`${order.customerDetails.firstName} ${order.customerDetails.lastName}`}</TableCell>
                <TableCell className="hidden md:table-cell">{order.customerDetails.email}</TableCell>
                <TableCell className="hidden md:table-cell">{order.customerDetails.phoneNumber}</TableCell>
                <TableCell className="hidden md:table-cell">{`${order.customerDetails.city}, ${order.customerDetails.houseNo}, ${order.customerDetails.postalCode}`}</TableCell>
                <TableCell>PKR {order.totalAmount.toFixed(2)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>{`${item.name} (x${item.quantity})`}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="hidden md:table-cell">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 md:hidden">
        <Accordion type="single" collapsible className="w-full">
          {currentOrders.map((order) => (
            <AccordionItem value={order.id} key={order.id}>
              <AccordionTrigger className="text-sm">
                Order: {order.id} - {new Date(order.createdAt).toLocaleDateString()}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p><strong>Customer:</strong> {`${order.customerDetails.firstName} ${order.customerDetails.lastName}`}</p>
                  <p><strong>Email:</strong> {order.customerDetails.email}</p>
                  <p><strong>Phone:</strong> {order.customerDetails.phoneNumber}</p>
                  <p><strong>Address:</strong> {`${order.customerDetails.city}, ${order.customerDetails.houseNo}, ${order.customerDetails.postalCode}`}</p>
                  <p><strong>Total:</strong> PKR {order.totalAmount.toFixed(2)}</p>
                  <div>
                    <strong>Items:</strong>
                    <ul className="list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={index}>{`${item.name} (x${item.quantity})`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-3 py-1 border rounded-full ${
              currentPage === i + 1 ? 'bg-lime-200 text-black' : 'bg-lime-100 text-black'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}