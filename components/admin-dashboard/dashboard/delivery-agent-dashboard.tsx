"use client"

import { useState } from "react"
import { MapPin, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for current deliveries
const currentDeliveries = [
  {
    id: "del-001",
    orderNumber: "ORD-2023-001",
    restaurant: "Addis Ababa House",
    customerName: "John Doe",
    customerAddress: "123 Main St, Addis Ababa",
    status: "ASSIGNED",
    pickupTime: "2023-03-15T14:30:00Z",
    estimatedDeliveryTime: "2023-03-15T15:00:00Z",
    progress: 25,
  },
  {
    id: "del-002",
    orderNumber: "ORD-2023-002",
    restaurant: "Habesha Restaurant",
    customerName: "Jane Smith",
    customerAddress: "456 Oak Ave, Addis Ababa",
    status: "PICKED_UP",
    pickupTime: "2023-03-15T15:15:00Z",
    estimatedDeliveryTime: "2023-03-15T15:45:00Z",
    progress: 50,
  },
]

// Mock data for earnings
const earningsData = {
  today: 450,
  thisWeek: 2850,
  thisMonth: 12500,
  pendingPayouts: 3200,
  recentTransactions: [
    {
      id: "trx-001",
      date: "2023-03-14",
      amount: 350,
      description: "Delivery Earnings - 5 deliveries",
    },
    {
      id: "trx-002",
      date: "2023-03-13",
      amount: 420,
      description: "Delivery Earnings - 6 deliveries",
    },
    {
      id: "trx-003",
      date: "2023-03-12",
      amount: 280,
      description: "Delivery Earnings - 4 deliveries",
    },
  ],
}

// Mock data for completed deliveries
const completedDeliveries = [
  {
    id: "del-003",
    orderNumber: "ORD-2023-003",
    restaurant: "Lalibela Cuisine",
    customerName: "Alex Johnson",
    customerAddress: "789 Pine St, Addis Ababa",
    status: "DELIVERED",
    deliveryTime: "2023-03-14T13:45:00Z",
    earnings: 120,
  },
  {
    id: "del-004",
    orderNumber: "ORD-2023-004",
    restaurant: "Axum Traditional",
    customerName: "Maria Garcia",
    customerAddress: "101 Cedar Ave, Addis Ababa",
    status: "DELIVERED",
    deliveryTime: "2023-03-14T18:20:00Z",
    earnings: 135,
  },
  {
    id: "del-005",
    orderNumber: "ORD-2023-005",
    restaurant: "Addis Ababa House",
    customerName: "Sam Wilson",
    customerAddress: "202 Elm St, Addis Ababa",
    status: "DELIVERED",
    deliveryTime: "2023-03-13T12:15:00Z",
    earnings: 95,
  },
]

export function DeliveryAgentDashboard() {
  const [availableForDelivery, setAvailableForDelivery] = useState(true)

  return (
    <div className="grid gap-6">
      {/* Availability Toggle */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-medium">Delivery Status</h3>
              <p className="text-muted-foreground">Set your availability for new orders</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${availableForDelivery ? "bg-green-500" : "bg-red-500"}`}></div>
                <span>{availableForDelivery ? "Available" : "Unavailable"}</span>
              </div>
              <Button
                variant={availableForDelivery ? "destructive" : "default"}
                onClick={() => setAvailableForDelivery(!availableForDelivery)}
              >
                {availableForDelivery ? "Go Offline" : "Go Online"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Deliveries</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="history">Delivery History</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {currentDeliveries.length > 0 ? (
            <div className="space-y-6">
              {currentDeliveries.map((delivery) => (
                <Card key={delivery.id}>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <CardTitle>{delivery.restaurant}</CardTitle>
                        <CardDescription>Order #{delivery.orderNumber}</CardDescription>
                      </div>
                      <Badge className={delivery.status === "ASSIGNED" ? "bg-yellow-500" : "bg-blue-500"}>
                        {delivery.status === "ASSIGNED" ? "Ready for Pickup" : "Out for Delivery"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Pickup Location</p>
                            <p className="text-sm text-muted-foreground">{delivery.restaurant}</p>
                            <p className="text-sm">
                              {new Date(delivery.pickupTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Delivery Location</p>
                            <p className="text-sm text-muted-foreground">{delivery.customerName}</p>
                            <p className="text-sm">{delivery.customerAddress}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Delivery Progress</span>
                          <span>
                            ETA:{" "}
                            {new Date(delivery.estimatedDeliveryTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <Progress value={delivery.progress} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-col md:flex-row gap-2 w-full">
                      {delivery.status === "ASSIGNED" ? (
                        <>
                          <Button className="flex-1" variant="outline" size="sm">
                            <MapPin className="mr-2 h-4 w-4" />
                            Navigate to Restaurant
                          </Button>
                          <Button className="flex-1" size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirm Pickup
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className="flex-1" variant="outline" size="sm">
                            <MapPin className="mr-2 h-4 w-4" />
                            Navigate to Customer
                          </Button>
                          <Button className="flex-1" size="sm">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Complete Delivery
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Report Issue
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="rounded-full bg-primary/10 p-6 mb-4">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">No Active Deliveries</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  You don't have any active deliveries at the moment. New orders will appear here when they're assigned
                  to you.
                </p>
                <Button>Find New Deliveries</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="earnings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{earningsData.today.toFixed(2)} Birr</div>
                <p className="text-xs text-muted-foreground">From completed deliveries today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{earningsData.thisWeek.toFixed(2)} Birr</div>
                <p className="text-xs text-muted-foreground">Past 7 days earnings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{earningsData.thisMonth.toFixed(2)} Birr</div>
                <p className="text-xs text-muted-foreground">Total earnings for this month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Your earnings and pending payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-1">Pending Payout</h3>
                    <div className="text-3xl font-bold">{earningsData.pendingPayouts.toFixed(2)} Birr</div>
                    <p className="text-sm text-muted-foreground mt-2">Your next payout is scheduled for Friday</p>
                  </div>

                  <div className="flex-1 border rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Delivery Acceptance Rate</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <Progress value={92} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>On-Time Delivery Rate</span>
                          <span className="font-medium">95%</span>
                        </div>
                        <Progress value={95} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Customer Rating</span>
                          <span className="font-medium">4.8/5</span>
                        </div>
                        <Progress value={96} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
                  <div className="space-y-4">
                    {earningsData.recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center border-b pb-4">
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                        <div className="font-bold">{transaction.amount.toFixed(2)} Birr</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Full Earnings History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Deliveries</CardTitle>
              <CardDescription>History of your past deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {completedDeliveries.map((delivery) => (
                  <div key={delivery.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{delivery.restaurant}</h3>
                        <p className="text-sm text-muted-foreground">
                          Order #{delivery.orderNumber} • {new Date(delivery.deliveryTime).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                          Completed
                        </Badge>
                        <span className="font-medium">{delivery.earnings.toFixed(2)} Birr</span>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">{delivery.customerName}</p>
                          <p className="text-sm text-muted-foreground">{delivery.customerAddress}</p>
                          <p className="text-sm mt-1">
                            Delivered at:{" "}
                            {new Date(delivery.deliveryTime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
