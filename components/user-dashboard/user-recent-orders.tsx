"use client"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function UserRecentOrders() {
  // This would come from your API in a real app
  const orders = [
    {
      id: "ORD-1234",
      date: "2023-04-23",
      restaurant: "Burger King",
      total: "$24.99",
      status: "Delivered",
    },
    {
      id: "ORD-1235",
      date: "2023-04-22",
      restaurant: "Pizza Hut",
      total: "$32.50",
      status: "Delivered",
    },
    {
      id: "ORD-1236",
      date: "2023-04-21",
      restaurant: "Taco Bell",
      total: "$18.75",
      status: "Delivered",
    },
    {
      id: "ORD-1237",
      date: "2023-04-20",
      restaurant: "McDonald's",
      total: "$15.25",
      status: "Delivered",
    },
    {
      id: "ORD-1238",
      date: "2023-04-19",
      restaurant: "Subway",
      total: "$12.99",
      status: "Delivered",
    },
  ]

  return (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Restaurant</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.restaurant}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge variant="outline">{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/user-dashboard/orders/${order.id}`}>View details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Reorder</DropdownMenuItem>
                      <DropdownMenuItem>Download receipt</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
