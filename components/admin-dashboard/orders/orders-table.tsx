"use client"

import { useEffect, useState } from "react"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, MoreHorizontal, Truck, Ban, CheckCircle, AlertCircle } from "lucide-react"
import { OrderDetails } from "@/components/admin-dashboard/orders/order-details"

export function OrdersTable() {
  const [orders, setOrders] = useState<any[]>([])
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders")
        const data = await res.json()

        const parsed = Array.isArray(data)
          ? data
          : data.orders ?? []

        if (parsed.length === 0) {
          console.warn("No orders from API — using mock data.")
          setOrders([
            {
              id: "MOCK-001",
              customer: "Jane Doe",
              address: "42 Test Lane",
              items: [{ name: "Mock Pizza", quantity: 1 }],
              total: "$12.99",
              status: "preparing",
              driver: "N/A",
              date: new Date().toISOString(),
              phone: "+1 (555) 000-0000",
              paymentMethod: "Cash",
              notes: "This is a mock order.",
            },
          ])
        } else {
          setOrders(parsed)
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong fetching orders.")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

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
      case "preparing":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <AlertCircle className="mr-1 h-3 w-3" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const toggleRowSelection = (orderId: string) => {
    setSelectedRows((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    )
  }

  const allSelected = selectedRows.length === orders.length
  const toggleAllRows = () => {
    setSelectedRows(allSelected ? [] : orders.map((order) => order.id))
  }

  if (loading) {
    return <div className="p-4">Loading orders...</div>
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>
  }

  return (
    <Card className="mt-6">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle>Order List</CardTitle>
          <CardDescription>
            {selectedRows.length > 0 ? (
              <div className="flex items-center gap-2">
                <span>{selectedRows.length} selected</span>
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
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleAllRows}
                    aria-label="Select all orders"
                  />
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
                  <TableCell className="hidden sm:table-cell">{order.items?.length ?? 0}</TableCell>
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
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedOrder(order)
                            setIsDetailsOpen(true)
                          }}>
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
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedOrder && <OrderDetails order={selectedOrder} />}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
