"use client"

import { useState } from "react"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EarningsChart } from "./earnings-chart"
import { PaymentHistoryTable } from "./payment-history-table"

export function EarningsOverview() {
  const [period, setPeriod] = useState("week")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="earnings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Earnings Overview</CardTitle>
                  <Select defaultValue="week" onValueChange={(value) => setPeriod(value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>
                  {period === "day" && "Your earnings for today"}
                  {period === "week" && "Your earnings for the current week"}
                  {period === "month" && "Your earnings for the current month"}
                  {period === "year" && "Your earnings for the current year"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <EarningsChart period={period} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {period === "day" && "Today's Earnings"}
                  {period === "week" && "This Week's Earnings"}
                  {period === "month" && "This Month's Earnings"}
                  {period === "year" && "This Year's Earnings"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {period === "day" && "$42.50"}
                  {period === "week" && "$238.50"}
                  {period === "month" && "$975.25"}
                  {period === "year" && "$12,450.75"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {period === "day" && "+$12.50 from yesterday"}
                  {period === "week" && "+$45.75 from last week"}
                  {period === "month" && "+$125.50 from last month"}
                  {period === "year" && "+$2,450.25 from last year"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Deliveries Completed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {period === "day" && "5"}
                  {period === "week" && "32"}
                  {period === "month" && "128"}
                  {period === "year" && "1,542"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {period === "day" && "Average $8.50 per delivery"}
                  {period === "week" && "Average $7.45 per delivery"}
                  {period === "month" && "Average $7.62 per delivery"}
                  {period === "year" && "Average $8.07 per delivery"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tips Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {period === "day" && "$15.25"}
                  {period === "week" && "$87.50"}
                  {period === "month" && "$345.75"}
                  {period === "year" && "$4,250.25"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {period === "day" && "36% of total earnings"}
                  {period === "week" && "37% of total earnings"}
                  {period === "month" && "35% of total earnings"}
                  {period === "year" && "34% of total earnings"}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Earnings Breakdown</CardTitle>
              <CardDescription>Detailed breakdown of your earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 rounded-lg border p-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Base Pay</div>
                    <div className="text-xl font-bold">
                      {period === "day" && "$22.50"}
                      {period === "week" && "$125.75"}
                      {period === "month" && "$525.50"}
                      {period === "year" && "$6,750.25"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Tips</div>
                    <div className="text-xl font-bold">
                      {period === "day" && "$15.25"}
                      {period === "week" && "$87.50"}
                      {period === "month" && "$345.75"}
                      {period === "year" && "$4,250.25"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Bonuses</div>
                    <div className="text-xl font-bold">
                      {period === "day" && "$4.75"}
                      {period === "week" && "$25.25"}
                      {period === "month" && "$104.00"}
                      {period === "year" && "$1,450.25"}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-4 text-sm font-medium">Earnings by Day</div>
                  <div className="space-y-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex items-center justify-between">
                        <span>{day}</span>
                        <span className="font-medium">${(Math.random() * 50 + 20).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Download Earnings Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View your payment history and transaction details</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentHistoryTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
