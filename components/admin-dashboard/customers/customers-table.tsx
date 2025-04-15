"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, MoreHorizontal, Mail, Phone, MapPin, Star, StarOff } from "lucide-react"
import { CustomerDetails } from "@/components/admin-dashboard/customers/customer-details"

// Mock data - in a real app, this would come from an API
const customers = [
  {
    id: "CUST-1001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY",
    joinDate: "2022-01-15T10:30:00",
    totalOrders: 24,
    totalSpent: "$543.87",
    lastOrder: "2023-04-10T14:30:00",
    status: "active",
    notes: "Prefers delivery in the evening",
    favorite: true,
    paymentMethods: ["Credit Card", "PayPal"],
    orderHistory: [
      { id: "ORD-1234", date: "2023-04-10T14:30:00", total: "$45.99", status: "delivered" },
      { id: "ORD-1156", date: "2023-03-22T12:15:00", total: "$32.50", status: "delivered" },
      { id: "ORD-1098", date: "2023-02-15T18:45:00", total: "$28.75", status: "delivered" },
    ],
  },
  {
    id: "CUST-1002",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Park Ave, Boston, MA",
    joinDate: "2022-02-20T14:45:00",
    totalOrders: 18,
    totalSpent: "$412.25",
    lastOrder: "2023-04-08T15:45:00",
    status: "active",
    notes: "Allergic to nuts",
    favorite: false,
    paymentMethods: ["Credit Card"],
    orderHistory: [
      { id: "ORD-1235", date: "2023-04-08T15:45:00", total: "$29.50", status: "delivered" },
      { id: "ORD-1187", date: "2023-03-17T11:30:00", total: "$36.75", status: "delivered" },
      { id: "ORD-1122", date: "2023-02-28T19:15:00", total: "$42.99", status: "delivered" },
    ],
  },
  {
    id: "CUST-1003",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Oak St, Chicago, IL",
    joinDate: "2022-03-05T09:15:00",
    totalOrders: 12,
    totalSpent: "$287.50",
    lastOrder: "2023-04-12T16:15:00",
    status: "active",
    notes: "Prefers contactless delivery",
    favorite: true,
    paymentMethods: ["PayPal", "Apple Pay"],
    orderHistory: [
      { id: "ORD-1236", date: "2023-04-12T16:15:00", total: "$63.94", status: "delivered" },
      { id: "ORD-1201", date: "2023-03-25T13:45:00", total: "$27.50", status: "delivered" },
      { id: "ORD-1154", date: "2023-03-02T17:30:00", total: "$45.25", status: "delivered" },
    ],
  },
  {
    id: "CUST-1004",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 234-5678",
    address: "321 Pine St, San Francisco, CA",
    joinDate: "2022-04-10T11:30:00",
    totalOrders: 8,
    totalSpent: "$176.45",
    lastOrder: "2023-04-05T12:10:00",
    status: "inactive",
    notes: "",
    favorite: false,
    paymentMethods: ["Credit Card"],
    orderHistory: [
      { id: "ORD-1237", date: "2023-04-05T12:10:00", total: "$18.99", status: "delivered" },
      { id: "ORD-1215", date: "2023-03-15T14:20:00", total: "$24.50", status: "delivered" },
      { id: "ORD-1176", date: "2023-02-22T10:45:00", total: "$32.99", status: "delivered" },
    ],
  },
  {
    id: "CUST-1005",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    phone: "+1 (555) 876-5432",
    address: "654 Maple Ave, Seattle, WA",
    joinDate: "2022-05-15T13:45:00",
    totalOrders: 15,
    totalSpent: "$345.75",
    lastOrder: "2023-04-11T10:30:00",
    status: "active",
    notes: "Prefers morning deliveries",
    favorite: true,
    paymentMethods: ["Venmo", "Credit Card"],
    orderHistory: [
      { id: "ORD-1238", date: "2023-04-11T10:30:00", total: "$42.95", status: "delivered" },
      { id: "ORD-1225", date: "2023-03-28T09:15:00", total: "$36.50", status: "delivered" },
      { id: "ORD-1198", date: "2023-03-10T11:45:00", total: "$29.75", status: "delivered" },
    ],
  },
  {
    id: "CUST-1006",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+1 (555) 345-6789",
    address: "987 Cedar Rd, Miami, FL",
    joinDate: "2022-06-20T15:30:00",
    totalOrders: 10,
    totalSpent: "$223.50",
    lastOrder: "2023-04-09T13:45:00",
    status: "active",
    notes: "",
    favorite: false,
    paymentMethods: ["Credit Card"],
    orderHistory: [
      { id: "ORD-1239", date: "2023-04-09T13:45:00", total: "$26.97", status: "delivered" },
      { id: "ORD-1210", date: "2023-03-20T16:30:00", total: "$34.50", status: "delivered" },
      { id: "ORD-1165", date: "2023-02-15T12:15:00", total: "$29.99", status: "delivered" },
    ],
  },
  {
    id: "CUST-1007",
    name: "Jennifer Martinez",
    email: "jennifer.martinez@example.com",
    phone: "+1 (555) 567-8901",
    address: "741 Birch Blvd, Austin, TX",
    joinDate: "2022-07-05T10:15:00",
    totalOrders: 20,
    totalSpent: "$478.25",
    lastOrder: "2023-04-13T17:30:00",
    status: "active",
    notes: "Prefers spicy food",
    favorite: true,
    paymentMethods: ["Cash", "Credit Card"],
    orderHistory: [
      { id: "ORD-1240", date: "2023-04-13T17:30:00", total: "$38.94", status: "delivered" },
      { id: "ORD-1228", date: "2023-04-01T14:45:00", total: "$42.75", status: "delivered" },
      { id: "ORD-1205", date: "2023-03-18T18:30:00", total: "$36.50", status: "delivered" },
    ],
  },
  {
    id: "CUST-1008",
    name: "Daniel Thompson",
    email: "daniel.thompson@example.com",
    phone: "+1 (555) 678-9012",
    address: "852 Spruce St, Denver, CO",
    joinDate: "2022-08-12T12:45:00",
    totalOrders: 6,
    totalSpent: "$145.75",
    lastOrder: "2023-04-07T18:15:00",
    status: "inactive",
    notes: "",
    favorite: false,
    paymentMethods: ["Credit Card"],
    orderHistory: [
      { id: "ORD-1241", date: "2023-04-07T18:15:00", total: "$33.96", status: "delivered" },
      { id: "ORD-1220", date: "2023-03-25T15:30:00", total: "$27.50", status: "delivered" },
      { id: "ORD-1190", date: "2023-03-05T12:45:00", total: "$24.99", status: "delivered" },
    ],
  },
  {
    id: "CUST-1009",
    name: "Olivia Brown",
    email: "olivia.brown@example.com",
    phone: "+1 (555) 789-0123",
    address: "963 Elm St, Portland, OR",
    joinDate: "2022-09-18T14:30:00",
    totalOrders: 14,
    totalSpent: "$312.50",
    lastOrder: "2023-04-14T19:00:00",
    status: "active",
    notes: "Vegetarian",
    favorite: true,
    paymentMethods: ["Apple Pay", "PayPal"],
    orderHistory: [
      { id: "ORD-1242", date: "2023-04-14T19:00:00", total: "$45.94", status: "delivered" },
      { id: "ORD-1232", date: "2023-04-05T17:15:00", total: "$32.75", status: "delivered" },
      { id: "ORD-1212", date: "2023-03-22T13:30:00", total: "$28.50", status: "delivered" },
    ],
  },
  {
    id: "CUST-1010",
    name: "William Garcia",
    email: "william.garcia@example.com",
    phone: "+1 (555) 890-1234",
    address: "159 Walnut Ave, Nashville, TN",
    joinDate: "2022-10-25T09:45:00",
    totalOrders: 9,
    totalSpent: "$198.25",
    lastOrder: "2023-04-06T11:30:00",
    status: "active",
    notes: "",
    favorite: false,
    paymentMethods: ["Credit Card"],
    orderHistory: [
      { id: "ORD-1243", date: "2023-04-06T11:30:00", total: "$29.99", status: "delivered" },
      { id: "ORD-1222", date: "2023-03-27T14:15:00", total: "$34.50", status: "delivered" },
      { id: "ORD-1195", date: "2023-03-08T10:30:00", total: "$26.75", status: "delivered" },
    ],
  },
]

export function CustomersTable() {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Toggle row selection
  const toggleRowSelection = (customerId: string) => {
    setSelectedRows((prev) =>
      prev.includes(customerId) ? prev.filter((id) => id !== customerId) : [...prev, customerId],
    )
  }

  // Check if all rows are selected
  const allSelected = selectedRows.length === customers.length

  // Toggle all rows selection
  const toggleAllRows = () => {
    if (allSelected) {
      setSelectedRows([])
    } else {
      setSelectedRows(customers.map((customer) => customer.id))
    }
  }

  // Toggle favorite status
  const toggleFavorite = (customerId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    // In a real app, this would update the customer in the database
    console.log(`Toggle favorite for customer ${customerId}`)
  }

  return (
    <Card className="mt-6">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle>Customer List</CardTitle>
          <CardDescription>
            {selectedRows.length > 0 ? (
              <div className="flex items-center gap-2">
                <span>{selectedRows.length} customers selected</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedRows([])}>
                  Clear
                </Button>
                <Button variant="default" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Selected
                </Button>
              </div>
            ) : (
              <span>Total {customers.length} customers</span>
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
                  <Checkbox checked={allSelected} onCheckedChange={toggleAllRows} aria-label="Select all customers" />
                </TableHead>
                <TableHead className="w-[250px]">Customer</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Location</TableHead>
                <TableHead className="hidden sm:table-cell">Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="hidden md:table-cell">Last Order</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className={selectedRows.includes(customer.id) ? "bg-muted/50" : ""}
                  onClick={() => {
                    setSelectedCustomer(customer)
                    setIsDetailsOpen(true)
                  }}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedRows.includes(customer.id)}
                      onCheckedChange={() => toggleRowSelection(customer.id)}
                      aria-label={`Select customer ${customer.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={customer.name} />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{customer.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={(e) => toggleFavorite(customer.id, e)}
                          >
                            {customer.favorite ? (
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                            <span className="sr-only">
                              {customer.favorite ? "Remove from favorites" : "Add to favorites"}
                            </span>
                          </Button>
                        </div>
                        <span className="text-xs text-muted-foreground">{customer.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Phone className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Mail className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{customer.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{customer.totalOrders}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(customer.lastOrder)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedCustomer(customer)
                              setIsDetailsOpen(true)
                            }}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit customer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Send email</DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>View orders</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-red-600">
                            Delete customer
                          </DropdownMenuItem>
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
          Showing <strong>1-{customers.length}</strong> of <strong>{customers.length}</strong> customers
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

      {/* Customer Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
