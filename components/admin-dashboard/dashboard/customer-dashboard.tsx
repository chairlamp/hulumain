"use client"
import Link from "next/link"
import { ShoppingBag, MapPin, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for recent orders
const recentOrders = [
  {
    id: "ord-001",
    restaurant: "Addis Ababa House",
    orderDate: "2023-03-12T14:30:00Z",
    status: "DELIVERED",
    total: 235.0,
    items: [
      { name: "Doro Wat", quantity: 1 },
      { name: "Injera", quantity: 2 },
      { name: "Ethiopian Coffee", quantity: 1 },
    ],
  },
  {
    id: "ord-002",
    restaurant: "Habesha Restaurant",
    orderDate: "2023-03-08T19:15:00Z",
    status: "DELIVERED",
    total: 350.0,
    items: [
      { name: "Tibs", quantity: 1 },
      { name: "Shiro", quantity: 1 },
      { name: "Tej", quantity: 2 },
    ],
  },
  {
    id: "ord-003",
    restaurant: "Lalibela Cuisine",
    orderDate: "2023-03-02T13:45:00Z",
    status: "DELIVERED",
    total: 420.0,
    items: [
      { name: "Kitfo", quantity: 1 },
      { name: "Injera", quantity: 3 },
      { name: "Beyainatu", quantity: 1 },
    ],
  },
]

// Mock favorite restaurants
const favoriteRestaurants = [
  {
    id: 1,
    name: "Addis Ababa House",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    deliveryTime: "25-35 min",
  },
  {
    id: 2,
    name: "Habesha Restaurant",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.6,
    deliveryTime: "30-45 min",
  },
  {
    id: 3,
    name: "Lalibela Cuisine",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    deliveryTime: "40-50 min",
  },
]

// Mock saved addresses
const savedAddresses = [
  {
    id: "addr-001",
    name: "Home",
    address: "123 Main Street, Addis Ababa",
    isDefault: true,
  },
  {
    id: "addr-002",
    name: "Work",
    address: "456 Office Plaza, Addis Ababa",
    isDefault: false,
  },
  {
    id: "addr-003",
    name: "Gym",
    address: "789 Fitness Center, Addis Ababa",
    isDefault: false,
  },
]

export function CustomerDashboard() {
  return (
    <div className="grid gap-6">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest food orders</CardDescription>
              </div>
              <Link href="/dashboard/orders">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.slice(0, 2).map((order) => (
                  <div key={order.id} className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <ShoppingBag className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                      <div>
                        <h4 className="font-medium">{order.restaurant}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.orderDate).toLocaleString()} • {order.items.length} items
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge className="mb-1" variant={order.status === "DELIVERED" ? "default" : "outline"}>
                        {order.status}
                      </Badge>
                      <p className="font-medium">{order.total.toFixed(2)} Birr</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Favorite Restaurants */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Favorite Restaurants</CardTitle>
                <CardDescription>Restaurants you order from most</CardDescription>
              </div>
              <Link href="/dashboard/favorites">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {favoriteRestaurants.map((restaurant) => (
                  <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                    <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                      <img
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="font-medium">{restaurant.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ★ {restaurant.rating} • {restaurant.deliveryTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Saved Addresses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Your delivery locations</CardDescription>
              </div>
              <Link href="/dashboard/addresses">
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedAddresses.map((address) => (
                  <div key={address.id} className="flex justify-between items-center">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{address.name}</h4>
                          {address.isDefault && (
                            <Badge variant="outline" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{address.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View all your past orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{order.restaurant}</h3>
                        <p className="text-sm text-muted-foreground">
                          Order #{order.id} • {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center gap-2">
                        <Badge>{order.status}</Badge>
                        <span className="font-medium">{order.total.toFixed(2)} Birr</span>
                      </div>
                    </div>

                    <div className="space-y-2 border-t pt-3">
                      <h4 className="text-sm font-medium">Order Items</h4>
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-sm flex justify-between">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Order Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Restaurants</CardTitle>
              <CardDescription>Restaurants you love to order from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteRestaurants.map((restaurant) => (
                  <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                    <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                      <img
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-lg">{restaurant.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>★ {restaurant.rating}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{restaurant.deliveryTime}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-2 h-7 px-2">
                          Order Now <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your delivery locations</CardDescription>
              </div>
              <Button size="sm">Add New Address</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedAddresses.map((address) => (
                  <div key={address.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-10 w-10 p-2 bg-primary/10 text-primary rounded-full" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{address.name}</h4>
                          {address.isDefault && (
                            <Badge variant="outline" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{address.address}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      {!address.isDefault && (
                        <Button variant="outline" size="sm">
                          Set as Default
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
