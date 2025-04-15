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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, MoreHorizontal, Truck, Ban, CheckCircle, AlertCircle } from "lucide-react"
import { OrderDetails } from "@/components/admin-dashboard/orders/order-details"

// Mock data - in a real app, this would come from an API
const orders = [
  {
    id: "ORD-1234",
    customer: "John Smith",
    address: "123 Main St, New York, NY",
    items: [
      { name: "Chicken Burger", quantity: 2, price: "$11.99" },
      { name: "French Fries", quantity: 1, price: "$4.99" },
      { name: "Soda", quantity: 2, price: "$2.99" },
    ],
    total: "$34.95",
    status: "delivered",
    driver: "Michael Johnson",
    date: "2023-04-15T14:30:00",
    phone: "+1 (555) 123-4567",
    paymentMethod: "Credit Card",
    notes: "Leave at door",
  },
  {
    id: "ORD-1235",
    customer: "Sarah Williams",
    address: "456 Park Ave, Boston, MA",
    items: [
      { name: "Veggie Pizza", quantity: 1, price: "$14.99" },
      { name: "Garlic Bread", quantity: 1, price: "$5.99" },
      { name: "Salad", quantity: 1, price: "$8.99" },
    ],
    total: "$29.97",
    status: "in-transit",
    driver: "David Lee",
    date: "2023-04-15T15:45:00",
    phone: "+1 (555) 987-6543",
    paymentMethod: "PayPal",
    notes: "",
  },
  {
    id: "ORD-1236",
    customer: "Emily Davis",
    address: "789 Oak St, Chicago, IL",
    items: [
      { name: "Sushi Combo", quantity: 2, price: "$24.99" },
      { name: "Miso Soup", quantity: 2, price: "$3.99" },
      { name: "Green Tea", quantity: 2, price: "$2.99" },
    ],
    total: "$63.94",
    status: "pending",
    driver: "Unassigned",
    date: "2023-04-15T16:15:00",
    phone: "+1 (555) 456-7890",
    paymentMethod: "Cash",
    notes: "Call upon arrival",
  },
  {
    id: "ORD-1237",
    customer: "Robert Johnson",
    address: "321 Pine St, San Francisco, CA",
    items: [
      { name: "Breakfast Burrito", quantity: 1, price: "$9.99" },
      { name: "Coffee", quantity: 1, price: "$3.99" },
      { name: "Hash Browns", quantity: 1, price: "$2.99" },
    ],
    total: "$16.97",
    status: "delivered",
    driver: "Jessica Brown",
    date: "2023-04-15T12:10:00",
    phone: "+1 (555) 234-5678",
    paymentMethod: "Credit Card",
    notes: "",
  },
  {
    id: "ORD-1238",
    customer: "Lisa Anderson",
    address: "654 Maple Ave, Seattle, WA",
    items: [
      { name: "Pad Thai", quantity: 2, price: "$13.99" },
      { name: "Spring Rolls", quantity: 1, price: "$6.99" },
      { name: "Thai Iced Tea", quantity: 2, price: "$3.99" },
    ],
    total: "$42.95",
    status: "cancelled",
    driver: "N/A",
    date: "2023-04-15T10:30:00",
    phone: "+1 (555) 876-5432",
    paymentMethod: "Venmo",
    notes: "No spice",
  },
  {
    id: "ORD-1239",
    customer: "Michael Wilson",
    address: "987 Cedar Rd, Miami, FL",
    items: [
      { name: "Steak Sandwich", quantity: 1, price: "$16.99" },
      { name: "Onion Rings", quantity: 1, price: "$5.99" },
      { name: "Lemonade", quantity: 1, price: "$3.99" },
    ],
    total: "$26.97",
    status: "in-transit",
    driver: "Thomas White",
    date: "2023-04-15T13:45:00",
    phone: "+1 (555) 345-6789",
    paymentMethod: "Credit Card",
    notes: "",
  },
  {
    id: "ORD-1240",
    customer: "Jennifer Martinez",
    address: "741 Birch Blvd, Austin, TX",
    items: [
      { name: "BBQ Ribs", quantity: 1, price: "$19.99" },
      { name: "Corn Bread", quantity: 2, price: "$3.99" },
      { name: "Coleslaw", quantity: 1, price: "$4.99" },
      { name: "Sweet Tea", quantity: 2, price: "$2.99" },
    ],
    total: "$38.94",
    status: "pending",
    driver: "Unassigned",
    date: "2023-04-15T17:30:00",
    phone: "+1 (555) 567-8901",
    paymentMethod: "Cash",
    notes: "Extra sauce on the side",
  },
  {
    id: "ORD-1241",
    customer: "Daniel Thompson",
    address: "852 Spruce St, Denver, CO",
    items: [
      { name: "Pepperoni Pizza", quantity: 1, price: "$14.99" },
      { name: "Buffalo Wings", quantity: 10, price: "$12.99" },
      { name: "Soda", quantity: 2, price: "$2.99" },
    ],
    total: "$33.96",
    status: "delivered",
    driver: "Amanda Garcia",
    date: "2023-04-15T18:15:00",
    phone: "+1 (555) 678-9012",
    paymentMethod: "Credit Card",
    notes: "",
  },
  {
    id: "ORD-1242",
    customer: "Olivia Brown",
    address: "963 Elm St, Portland, OR",
    items: [
      { name: "Veggie Burger", quantity: 2, price: "$10.99" },
      { name: "Sweet Potato Fries", quantity: 2, price: "$5.99" },
      { name: "Milkshake", quantity: 2, price: "$5.99" },
    ],
    total: "$45.94",
    status: "in-transit",
    driver: "Kevin Wilson",
    date: "2023-04-15T19:00:00",
    phone: "+1 (555) 789-0123",
    paymentMethod: "Apple Pay",
    notes: "No onions on burgers",
  },
]

export function OrdersTable() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Function to render status badge with appropriate color
  const renderStatus = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        )
      case "in-transit":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Truck className="mr-1 h-3 w-3" />
            In Transit
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <Ban className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Toggle row selection
  const toggleRowSelection = (orderId: string) => {
    setSelectedRows((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  // Check if all rows are selected
  const allSelected = selectedRows.length === orders.length

  // Toggle all rows selection
  const toggleAllRows = () => {
    if (allSelected) {
      setSelectedRows([])
    } else {
      setSelectedRows(orders.map((order) => order.id))
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle>Order List</CardTitle>
          <CardDescription>
            {selectedRows.length > 0 ? (
              <div className="flex items-center gap-2">
                <span>{selectedRows.length} orders selected</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedRows([])}>
                  Clear
                </Button>
                <Button variant="destructive" size="sm">
                  <Ban className="mr-2 h-4 w-4" />
                  Cancel Selected
                </Button>
              </div>
            ) : (
              <span>Total {orders.length} orders</span>
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox checked={allSelected} onCheckedChange={toggleAllRows} aria-label="Select all orders" />
                </TableHead>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Address</TableHead>
                <TableHead className="hidden sm:table-cell">Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Driver</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className={selectedRows.includes(order.id) ? "bg-muted/50" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(order.id)}
                      onCheckedChange={() => toggleRowSelection(order.id)}
                      aria-label={`Select order ${order.id}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.address}</TableCell>
                  <TableCell className="hidden sm:table-cell">{order.items.length}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{renderStatus(order.status)}</TableCell>
                  <TableCell className="hidden lg:table-cell">{order.driver}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedOrder(order)
                          setIsDetailsOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedOrder(order)
                              setIsDetailsOpen(true)
                            }}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Assign driver</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Update status</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1-{orders.length}</strong> of <strong>{orders.length}</strong> orders
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">{selectedOrder && <OrderDetails order={selectedOrder} />}</DialogContent>
      </Dialog>
    </Card>
  )
}
