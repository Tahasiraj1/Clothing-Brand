'use client'

import { useState } from "react"
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

interface CustomerDetails {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
  houseNo: string;
  postalCode: string;
  country: string;
}

interface Order {
  id: string;
  totalAmount: number;
  createdAt: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
}

export default function DispatchedOrdersClient({ orders }: { orders: Order[] }) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const ordersPerPage = 10

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-xl font-semibold text-gray-600">No Dispatched Orders Found</h2>
        <p className="text-gray-500 mt-2">Dispatched orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Table className="border border-emerald-800 bg-lime-100">
        <TableHeader>
          <TableRow className="border border-emerald-800">
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
            <TableRow className="border-emerald-800 hover:bg-lime-200" key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{`${order.customerDetails.firstName} ${order.customerDetails.lastName}`}</TableCell>
              <TableCell>{order.customerDetails.email}</TableCell>
              <TableCell>{order.customerDetails.phoneNumber}</TableCell>
              <TableCell className="flex flex-col">{`${order.customerDetails.city}, ${order.customerDetails.houseNo}, ${order.customerDetails.postalCode}`}</TableCell>
              <TableCell>PKR {order.totalAmount.toFixed(2)}</TableCell>
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