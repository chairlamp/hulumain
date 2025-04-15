"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TruckIcon, Users, PackageIcon, DollarSign } from "lucide-react"

export default function DashboardMetrics() {
  // In a real app, this data would come from an API
  const metrics = [
    {
      title: "Total Revenue",
      value: "$12,543.00",
      description: "+20.1% from last month",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Active Orders",
      value: "23",
      description: "5 pending, 18 in transit",
      icon: PackageIcon,
      color: "text-blue-500",
    },
    {
      title: "Active Drivers",
      value: "15",
      description: "3 idle, 12 on delivery",
      icon: TruckIcon,
      color: "text-orange-500",
    },
    {
      title: "Customers",
      value: "2,543",
      description: "+12 new today",
      icon: Users,
      color: "text-purple-500",
    },
  ]

  return (
    <>
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
