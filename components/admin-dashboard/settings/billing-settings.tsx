"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, CheckCircle, AlertCircle } from "lucide-react"

export function BillingSettings() {
  // Mock billing data - in a real app, this would come from an API
  const billingInfo = {
    plan: "Professional",
    status: "active",
    nextBillingDate: "May 15, 2023",
    amount: "$49.99",
    paymentMethod: "Visa ending in 4242",
    usageStats: {
      orders: {
        used: 1243,
        limit: 5000,
        percentage: 25,
      },
      drivers: {
        used: 42,
        limit: 100,
        percentage: 42,
      },
      apiCalls: {
        used: 45678,
        limit: 100000,
        percentage: 46,
      },
    },
    invoices: [
      {
        id: "INV-001",
        date: "Apr 15, 2023",
        amount: "$49.99",
        status: "paid",
      },
      {
        id: "INV-002",
        date: "Mar 15, 2023",
        amount: "$49.99",
        status: "paid",
      },
      {
        id: "INV-003",
        date: "Feb 15, 2023",
        amount: "$49.99",
        status: "paid",
      },
      {
        id: "INV-004",
        date: "Jan 15, 2023",
        amount: "$39.99",
        status: "paid",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription and billing details</CardDescription>
            </div>
            <Badge className="bg-blue-500 hover:bg-blue-600">{billingInfo.plan}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md border p-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">{billingInfo.plan} Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Next billing date: {billingInfo.nextBillingDate} • {billingInfo.amount}/month
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="destructive">Cancel Plan</Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Method</h3>
            <div className="flex items-center justify-between rounded-md border p-4">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{billingInfo.paymentMethod}</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                </div>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Usage</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Orders</p>
                  <p className="text-sm text-muted-foreground">
                    {billingInfo.usageStats.orders.used} / {billingInfo.usageStats.orders.limit}
                  </p>
                </div>
                <Progress value={billingInfo.usageStats.orders.percentage} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Drivers</p>
                  <p className="text-sm text-muted-foreground">
                    {billingInfo.usageStats.drivers.used} / {billingInfo.usageStats.drivers.limit}
                  </p>
                </div>
                <Progress value={billingInfo.usageStats.drivers.percentage} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">API Calls</p>
                  <p className="text-sm text-muted-foreground">
                    {billingInfo.usageStats.apiCalls.used} / {billingInfo.usageStats.apiCalls.limit}
                  </p>
                </div>
                <Progress value={billingInfo.usageStats.apiCalls.percentage} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billingInfo.invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between rounded-md border p-4">
                <div className="space-y-1">
                  <p className="font-medium">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-medium">{invoice.amount}</p>
                  <div className="flex items-center">
                    {invoice.status === "paid" ? (
                      <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="mr-1 h-4 w-4 text-amber-500" />
                    )}
                    <span className={invoice.status === "paid" ? "text-green-500" : "text-amber-500"}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download invoice</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download All Invoices
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
          <CardDescription>Your billing address for invoices and tax purposes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-4">
            <div className="space-y-1">
              <p className="font-medium">Delivery Admin Inc.</p>
              <p className="text-sm">123 Main Street</p>
              <p className="text-sm">Suite 500</p>
              <p className="text-sm">New York, NY 10001</p>
              <p className="text-sm">United States</p>
              <p className="text-sm pt-2">Tax ID: US123456789</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Update Billing Address</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
