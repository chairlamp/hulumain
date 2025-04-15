"use client"

import { useState } from "react"
import { ArrowRight, DollarSign, Package, Star, TrendingUp } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveDeliveryCard } from "@/components/driver-dashboard/orders/active-delivery-card"
import { UpcomingOrderCard } from "@/components/driver-dashboard/orders/upcoming-order-card"

export function DriverDashboardOverview() {
  const [activeTab, setActiveTab] = useState("today")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John! Here's an overview of your deliveries and earnings.</p>
      </div>

      {/* Active Delivery Section */}
      <ActiveDeliveryCard />

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42.50</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deliveries Completed</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Today's total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`h-3 w-3 ${star <= 4 ? "fill-primary text-primary" : ""}`} />
                ))}
              </div>
              <span className="ml-1">Last 30 days</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="h-2" />
            <p className="mt-2 text-xs text-muted-foreground">$238 of $350 weekly target</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Orders */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Upcoming Orders</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/driver-dashboard/current-orders">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Tabs defaultValue="today" className="mt-2" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="mt-4 space-y-4">
            <UpcomingOrderCard
              id="ORD-1234"
              restaurant="Burger King"
              customer="Alice Johnson"
              time="2:30 PM"
              address="123 Main St, Apt 4B"
              amount="$18.50"
              distance="2.3 mi"
            />
            <UpcomingOrderCard
              id="ORD-1235"
              restaurant="Pizza Hut"
              customer="Bob Smith"
              time="3:45 PM"
              address="456 Oak Ave"
              amount="$24.99"
              distance="3.1 mi"
            />
          </TabsContent>
          <TabsContent value="tomorrow" className="mt-4 space-y-4">
            <UpcomingOrderCard
              id="ORD-1236"
              restaurant="Taco Bell"
              customer="Charlie Brown"
              time="12:15 PM"
              address="789 Pine St"
              amount="$15.75"
              distance="1.8 mi"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Summary</CardTitle>
          <CardDescription>Your delivery performance this week</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium text-muted-foreground">Total Deliveries</span>
            <span className="text-2xl font-bold">32</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium text-muted-foreground">Total Earnings</span>
            <span className="text-2xl font-bold">$238.50</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium text-muted-foreground">Avg. Delivery Time</span>
            <span className="text-2xl font-bold">24 min</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <span className="text-sm font-medium text-muted-foreground">Total Distance</span>
            <span className="text-2xl font-bold">87 mi</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/driver-dashboard/earnings">
              View detailed earnings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
