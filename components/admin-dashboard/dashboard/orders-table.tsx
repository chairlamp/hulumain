"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search } from "lucide-react"

export default function OrdersTable() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in a real app, this would come from an API
  const orders = [
    {
      id: "ORD-1234",
      customer: "John Smith",
      address: "123 Main St, New York, NY",
      items: 3,
      total: "$45.99",
      status: "delivered",
      driver: "Michael Johnson",
      date: "2023-04-15T14:30:00",
    },
    {
      id: "ORD-1235",
      customer: "Sarah Williams",
      address: "456 Park Ave, Boston, MA",
      items: 2,
      total: "$29.50",
      status: "in-transit",
      driver: "David Lee",
      date: "2023-04-15T15:45:00",
    },
    {
      id: "ORD-1236",
      customer: "Emily Davis",
      address: "789 Oak St, Chicago, IL",
      items: 5,
      total: "$78.25",
      status: "pending",
      driver: "Unassigned",
      date: "2023-04-15T16:15:00",
    },
    {
      id: "ORD-1237",
      customer: "Robert Johnson",
      address: "321 Pine St, San Francisco, CA",
      items: 1,
      total: "$18.99",
      status: "delivered",
      driver: "Jessica Brown",
      date: "2023-04-15T12:10:00",
    },
    {
      id: "ORD-1238",
      customer: "Lisa Anderson",
      address: "654 Maple Ave, Seattle, WA",
      items: 4,
      total: "$56.75",
      status: "cancelled",
      driver: "N/A",
      date: "2023-04-15T10:30:00",
    },
    {
      id: "ORD-1239",
      customer: "Michael Wilson",
      address: "987 Cedar Rd, Miami, FL",
      items: 2,
      total: "$34.50",
      status: "in-transit",
      driver: "Thomas White",
      date: "2023-04-15T13:45:00",
    },
  ]

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Function to render status badge with appropriate color
  const renderStatus = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>
      case "in-transit":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Transit</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead className="hidden sm:table-cell">Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Driver</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.address}</TableCell>
                  <TableCell className="hidden sm:table-cell">{order.items}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{renderStatus(order.status)}</TableCell>
                  <TableCell className="hidden lg:table-cell">{order.driver}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Assign driver</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Update status</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Cancel order</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
