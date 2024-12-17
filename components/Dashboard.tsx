'use client'

import { useState } from "react"
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { useUser } from '@clerk/nextjs';
import { Input } from "./ui/input"
import { searchOrder } from '@/lib/action'

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

export default function DashboardClient({ orders }: { orders: Order[] }) {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Order | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const ordersPerPage = 10
  const { user, isLoaded } = useUser()
  const router = useRouter()

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

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = searchResult ? [searchResult] : orders.slice(indexOfFirstOrder, indexOfLastOrder)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleConfirmOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: selectedOrders,
          status: 'confirmed',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to confirm orders')
      }

      router.refresh()
      setSelectedOrders([])
    } catch (error) {
      console.error('Error Confirming orders:', error)
    }
  }

  const handleSearch = async () => {
    if (searchInput.trim()) {
      setIsSearching(true)
      setSearchError(null)
      try {
        const result = await searchOrder(searchInput.trim())
        if (result) {
          setSearchResult(result as Order)
        } else {
          setSearchError(`No order found with ID: ${searchInput}`)
          setSearchResult(null)
        }
      } catch (error) {
        console.error('Error searching for order:', error)
        setSearchError(`An error occurred while searching for the order: ${error instanceof Error ? error.message : 'Unknown error'}`)
        setSearchResult(null)
      } finally {
        setIsSearching(false)
      }
    } else {
      setSearchResult(null)
      setSearchError(null)
    }
  }

  const clearSearch = () => {
    setSearchInput('')
    setSearchResult(null)
    setSearchError(null)
  }

  if (!Array.isArray(orders) && !searchResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <h2 className="text-xl font-semibold text-red-600">Error Loading Orders</h2>
        <p className="text-gray-500 mt-2">There was an error loading the orders. Please try again later.</p>
      </div>
    );
  }

  if (orders.length === 0 && !searchResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600">No Pending Orders Found</h2>
        <p className="text-gray-500 mt-2">Pending Orders will appear here.</p>
      </div>
    )
  }

  return (
    <div className="w-full py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search by Order ID"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>
        {searchResult && (
          <Button onClick={clearSearch}>Clear Search</Button>
        )}
      </div>
      {searchError && (
        <div className="text-red-500 mb-4">{searchError}</div>
      )}
      {!searchResult && (
        <Button 
          onClick={handleConfirmOrders} 
          disabled={selectedOrders.length === 0}
          className="mb-4 rounded-full bg-emerald-700 text-white hover:bg-emerald-700"
        >
          Confirm
        </Button>
      )}
      <div className="w-full overflow-x-auto">
        <Table className="w-full border-collapse border border-emerald-400">
          <TableHeader>
            <TableRow className="border border-emerald-400">
              {!searchResult && (
                <TableHead className="w-16 p-2 text-center">Select</TableHead>
              )}
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
                {!searchResult && (
                  <TableCell className="p-2 text-center">
                    <Checkbox
                      className="rounded-full"
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => handleOrderSelect(order.id)}
                    />
                  </TableCell>
                )}
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

      {!searchResult && (
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
      )}
    </div>
  )
}