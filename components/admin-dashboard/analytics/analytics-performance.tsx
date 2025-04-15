"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown } from "lucide-react"

export function AnalyticsPerformance() {
  // Mock data for top performing drivers
  const topDrivers = [
    {
      name: "Michael Johnson",
      avatar: "MJ",
      deliveries: 124,
      rating: 4.9,
      onTime: 98,
      trend: "up",
    },
    {
      name: "Sarah Williams",
      avatar: "SW",
      deliveries: 118,
      rating: 4.8,
      onTime: 96,
      trend: "up",
    },
    {
      name: "David Lee",
      avatar: "DL",
      deliveries: 105,
      rating: 4.7,
      onTime: 94,
      trend: "down",
    },
    {
      name: "Jessica Brown",
      avatar: "JB",
      deliveries: 98,
      rating: 4.9,
      onTime: 97,
      trend: "up",
    },
    {
      name: "Thomas White",
      avatar: "TW",
      deliveries: 92,
      rating: 4.6,
      onTime: 92,
      trend: "down",
    },
  ]

  // Mock data for top selling items
  const topItems = [
    {
      name: "Chicken Burger",
      category: "Fast Food",
      orders: 342,
      revenue: "$4,104.00",
      trend: "up",
    },
    {
      name: "Veggie Pizza",
      category: "Fast Food",
      orders: 298,
      revenue: "$3,576.00",
      trend: "up",
    },
    {
      name: "Grocery Bundle",
      category: "Groceries",
      orders: 276,
      revenue: "$5,520.00",
      trend: "up",
    },
    {
      name: "Sushi Combo",
      category: "Restaurant",
      orders: 254,
      revenue: "$5,080.00",
      trend: "down",
    },
    {
      name: "Fresh Produce Box",
      category: "Groceries",
      orders: 232,
      revenue: "$3,480.00",
      trend: "up",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Drivers</CardTitle>
          <CardDescription>Based on deliveries and ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead className="text-right">Deliveries</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">On-Time %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDrivers.map((driver) => (
                <TableRow key={driver.name}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={driver.name} />
                        <AvatarFallback>{driver.avatar}</AvatarFallback>
                      </Avatar>
                      <span>{driver.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{driver.deliveries}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {driver.rating}
                      {driver.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span>{driver.onTime}%</span>
                      <Progress value={driver.onTime} className="w-12 h-2" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Selling Items</CardTitle>
          <CardDescription>Most popular items by order volume</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topItems.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>
                    <div className="font-medium">{item.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {item.orders}
                      {item.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{item.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
