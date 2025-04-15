"use client"

import { useState } from "react"
import { DollarSign, MapPin, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const pastOrders = [
  {
    id: "ORD-1230",
    date: "Today, 12:30 PM",
    restaurant: "McDonald's",
    customer: "David Wilson",
    address: "123 Pine St",
    amount: "$15.75",
    earnings: "$7.50",
    status: "completed",
    rating: 5,
  },
  {
    id: "ORD-1229",
    date: "Today, 11:15 AM",
    restaurant: "Starbucks",
    customer: "Emma Davis",
    address: "456 Elm St",
    amount: "$12.99",
    earnings: "$6.25",
    status: "completed",
    rating: 4,
  },
  {
    id: "ORD-1228",
    date: "Yesterday, 7:45 PM",
    restaurant: "Chipotle",
    customer: "Frank Miller",
    address: "789 Oak St",
    amount: "$22.50",
    earnings: "$9.75",
    status: "completed",
    rating: 5,
  },
  {
    id: "ORD-1227",
    date: "Yesterday, 6:20 PM",
    restaurant: "Subway",
    customer: "Grace Taylor",
    address: "101 Maple St",
    amount: "$18.25",
    earnings: "$8.00",
    status: "completed",
    rating: 5,
  },
  {
    id: "ORD-1226",
    date: "Yesterday, 2:10 PM",
    restaurant: "Pizza Hut",
    customer: "Henry Clark",
    address: "202 Cedar St",
    amount: "$24.99",
    earnings: "$10.50",
    status: "completed",
    rating: 4,
  },
  {
    id: "ORD-1225",
    date: "2 days ago",
    restaurant: "Taco Bell",
    customer: "Ivy Martin",
    address: "303 Birch St",
    amount: "$14.50",
    earnings: "$7.00",
    status: "cancelled",
    rating: null,
  },
]

export function OrderHistoryList() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <CardTitle>Order History</CardTitle>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="w-[200px] pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all-time">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastOrders.map((order) => (
              <div key={order.id} className="flex flex-col rounded-lg border p-4 sm:flex-row sm:items-center">
                <div className="grid flex-1 gap-1">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{order.restaurant}</div>
                    <Badge variant={order.status === "completed" ? "outline" : "destructive"} className="ml-2">
                      {order.status === "completed" ? "Completed" : "Cancelled"}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{order.date}</div>
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                    {order.address}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-4 sm:flex-col sm:items-end">
                  <div className="flex items-center">
                    <DollarSign className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                    <span className="font-medium">{order.earnings}</span>
                  </div>
                  {order.rating && (
                    <div className="flex items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${
                              star <= order.rating ? "fill-primary text-primary" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <Button variant="ghost" size="sm" className="mt-2">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
