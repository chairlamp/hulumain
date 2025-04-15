"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export function AnalyticsCharts() {
  const [salesPeriod, setSalesPeriod] = useState("weekly")

  // Mock data for charts - in a real app, this would come from an API
  const salesData = {
    weekly: [
      { name: "Mon", revenue: 4000, orders: 24 },
      { name: "Tue", revenue: 3000, orders: 18 },
      { name: "Wed", revenue: 5000, orders: 32 },
      { name: "Thu", revenue: 2780, orders: 22 },
      { name: "Fri", revenue: 6890, orders: 43 },
      { name: "Sat", revenue: 8390, orders: 56 },
      { name: "Sun", revenue: 4490, orders: 28 },
    ],
    monthly: [
      { name: "Jan", revenue: 24000, orders: 145 },
      { name: "Feb", revenue: 21000, orders: 132 },
      { name: "Mar", revenue: 31000, orders: 187 },
      { name: "Apr", revenue: 28000, orders: 165 },
      { name: "May", revenue: 35000, orders: 208 },
      { name: "Jun", revenue: 42000, orders: 251 },
      { name: "Jul", revenue: 38000, orders: 224 },
      { name: "Aug", revenue: 41000, orders: 243 },
      { name: "Sep", revenue: 39000, orders: 232 },
      { name: "Oct", revenue: 45000, orders: 267 },
      { name: "Nov", revenue: 48000, orders: 285 },
      { name: "Dec", revenue: 51000, orders: 302 },
    ],
  }

  const customerData = [
    { name: "New", value: 312 },
    { name: "Returning", value: 931 },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

  const ordersByCategory = [
    { name: "Fast Food", value: 35 },
    { name: "Groceries", value: 25 },
    { name: "Beverages", value: 20 },
    { name: "Other", value: 20 },
  ]

  const deliveryPerformance = [
    { name: "On Time", value: 85 },
    { name: "Delayed", value: 12 },
    { name: "Very Late", value: 3 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 mt-6">
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Revenue and order volume over time</CardDescription>
            </div>
            <Tabs value={salesPeriod} onValueChange={setSalesPeriod} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesPeriod === "weekly" ? salesData.weekly : salesData.monthly}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                activeDot={{ r: 8 }}
                name="Revenue ($)"
              />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10b981" name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Breakdown</CardTitle>
          <CardDescription>New vs returning customers</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={customerData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Orders by Category</CardTitle>
          <CardDescription>Distribution of order types</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ordersByCategory}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Percentage (%)" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Performance</CardTitle>
          <CardDescription>On-time delivery metrics</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deliveryPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {deliveryPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Monthly Revenue Trend</CardTitle>
          <CardDescription>Revenue performance over the past year</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData.monthly}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" name="Revenue ($)" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
