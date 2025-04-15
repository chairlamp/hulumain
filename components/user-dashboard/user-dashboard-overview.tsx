"use client"
import Link from "next/link"
import { Clock, Package, Heart, MapPin, ArrowRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserRecentOrders } from "@/components/user-dashboard/user-recent-orders"

export function UserDashboardOverview() {
  // This would come from your auth context in a real app
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  }

  return (
    <div className="flex flex-col w-full">
      <header className="border-b w-full">
        <div className="flex h-16 items-center px-4 sm:px-6 w-full">
          <div className="flex flex-1 items-center justify-between w-full">
            <h1 className="text-lg font-semibold">My Dashboard</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline-block">Welcome back, {user.name}</span>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">
        <div className="grid gap-6 py-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">2</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/user-dashboard/orders">
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Past Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">12</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/user-dashboard/orders">
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Saved Addresses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">3</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/user-dashboard/addresses">
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Favorite Restaurants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-muted-foreground" />
                  <span className="text-2xl font-bold">7</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/user-dashboard/favorites">
                    View <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="py-6 px-4 sm:px-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <UserRecentOrders />
        </div>
      </main>
    </div>
  )
}
