"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Clock, Truck, ThumbsUp } from "lucide-react"

export function AnalyticsOverview() {
  // In a real app, this data would come from an API
  const metrics = [
    {
      title: "Total Revenue",
      value: "$24,563.00",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Total Orders",
      value: "1,243",
      change: "+18.2%",
      trend: "up",
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "New Customers",
      value: "312",
      change: "+5.7%",
      trend: "up",
      icon: Users,
      color: "text-purple-500",
    },
    {
      title: "Avg. Delivery Time",
      value: "28 min",
      change: "-3.2%",
      trend: "down",
      icon: Clock,
      color: "text-amber-500",
    },
    {
      title: "Active Drivers",
      value: "42",
      change: "+8.1%",
      trend: "up",
      icon: Truck,
      color: "text-indigo-500",
    },
    {
      title: "Customer Satisfaction",
      value: "94.8%",
      change: "+2.3%",
      trend: "up",
      icon: ThumbsUp,
      color: "text-pink-500",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center text-xs">
              {metric.trend === "up" ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                {metric.change} from last month
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
