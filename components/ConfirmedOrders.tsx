'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useUser } from "@clerk/nextjs"


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
  status: string;
}

export default function ConfirmedOrdersClient({ orders }: { orders: Order[] }) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isDispatching, setIsDispatching] = useState<boolean>(false);
  const ordersPerPage = 10
  const router = useRouter()
  const { user, isLoaded } = useUser();

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
      </div>
    )
  }

  const role = user?.publicMetadata?.role

  if (role !== 'admin') {
    router.push('/')
    return null
  }

  const handleDispatchOrders = async () => {
    try {
      setIsDispatching(true);
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: selectedOrders,
          status: 'dispatched',
        }),
      })
      setIsDispatching(false);

      if (!response.ok) {
        throw new Error('Failed to dispatch orders')
      }

      router.refresh()
      setSelectedOrders([])
    } catch (error) {
      console.error('Error dispatching orders:', error)
    }
  }

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-xl font-semibold text-gray-600">No Confirmed Orders Found</h2>
        <p className="text-gray-500 mt-2">Confirmed orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4">
      <Button 
        onClick={handleDispatchOrders} 
        disabled={selectedOrders.length === 0}
        className="mb-4 rounded-full bg-emerald-800 text-white hover:bg-emerald-700"
      >
        {isDispatching ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-400"></div>
        ) : (
          'Dispatch'
        )}
      </Button>
      <div className="w-full overflow-x-auto">
        <Table className="w-full border-collapse border border-emerald-400">
          <TableHeader>
            <TableRow className="border border-emerald-400">
              <TableHead className="w-16 p-2 text-center">Select</TableHead>
              <TableHead className="p-2 hidden md:table-cell">Order ID</TableHead>
              <TableHead className="p-2">Customer</TableHead>
              <TableHead className="p-2 hidden lg:table-cell">Email</TableHead>
              <TableHead className="p-2 hidden lg:table-cell">Phone</TableHead>
              <TableHead className="p-2 hidden lg:table-cell">Address</TableHead>
              <TableHead className="p-2">Total</TableHead>
              <TableHead className="p-2 hidden lg:table-cell">Items</TableHead>
              <TableHead className="p-2">Date</TableHead>
              <TableHead className="p-2 hidden lg:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order) => (
              <TableRow key={order.id} className="border-b border-emerald-200 hover:bg-lime-50">
                <TableCell className="p-2 text-center">
                  <Checkbox
                    className="rounded-full"
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={() => handleOrderSelect(order.id)}
                  />
                </TableCell>
                <TableCell className="p-2 hidden md:table-cell">{order.id}</TableCell>
                <TableCell className="p-2">{`${order.customerDetails.firstName} ${order.customerDetails.lastName}`}</TableCell>
                <TableCell className="p-2 hidden lg:table-cell">{order.customerDetails.email}</TableCell>
                <TableCell className="p-2 hidden lg:table-cell">{order.customerDetails.phoneNumber}</TableCell>
                <TableCell className="p-2 hidden lg:table-cell">{`${order.customerDetails.city}, ${order.customerDetails.houseNo}, ${order.customerDetails.postalCode}`}</TableCell>
                <TableCell className="p-2">PKR {order.totalAmount.toFixed(2)}</TableCell>
                <TableCell className="p-2 hidden lg:table-cell">
                  <ul className="list-disc list-inside">
                    {order.items.map((item, index) => (
                      <li key={index}>{`${item.name} (x${item.quantity})`}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="p-2">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="p-2">
                  <span className={`px-2 py-1 hidden lg:table-cell rounded-full text-xs font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    order.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                    order.status === 'dispatched' ? 'bg-blue-200 text-blue-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 lg:hidden">
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
                  <p>
                    <strong>Status:</strong>{' '}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                      order.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                      order.status === 'dispatched' ? 'bg-blue-200 text-blue-800' :
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </p>
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
              currentPage === i + 1 ? 'bg-emerald-200 text-black' : 'bg-emerald-100 text-black'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}