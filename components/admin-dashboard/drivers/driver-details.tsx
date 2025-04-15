import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Mail,
  Phone,
  MapPin,
  Truck,
  Star,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Package,
  DollarSign,
  MessageSquare,
} from "lucide-react"

interface DriverDetailsProps {
  driver: any
}

export function DriverDetails({ driver }: DriverDetailsProps) {
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  // Format join date
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })
  }

  // Calculate driver tenure
  const calculateDriverTenure = (joinDateString: string) => {
    const joinDate = new Date(joinDateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - joinDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 30) {
      return `${diffDays} days`
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} months`
    } else {
      return `${Math.floor(diffDays / 365)} years, ${Math.floor((diffDays % 365) / 30)} months`
    }
  }

  // Render status badge
  const renderStatus = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "on-delivery":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Truck className="mr-1 h-3 w-3" />
            On Delivery
          </Badge>
        )
      case "offline":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">
            <Clock className="mr-1 h-3 w-3" />
            Offline
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <XCircle className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Render delivery status badge
  const renderDeliveryStatus = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>
      case "in-transit":
        return <Badge className="bg-blue-500 hover:bg-blue-600">In Transit</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <>
      <DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={driver.avatar || "/placeholder.svg"} alt={driver.name} />
              <AvatarFallback>
                {driver.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <DialogTitle>{driver.name}</DialogTitle>
          </div>
          {renderStatus(driver.status)}
        </div>
        <DialogDescription>Driver since {formatJoinDate(driver.joinDate)}</DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="profile" className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Contact Information
                </h3>
                <div className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{driver.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{driver.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{driver.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Truck className="mr-2 h-4 w-4" />
                  Vehicle Information
                </h3>
                <div className="space-y-2 rounded-md border p-3">
                  <div className="flex items-center">
                    <Truck className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{driver.vehicle}</span>
                  </div>
                  {driver.licensePlate !== "N/A" && (
                    <div className="flex items-center">
                      <span className="mr-2 text-xs font-medium bg-muted px-2 py-0.5 rounded">LP</span>
                      <span className="text-sm">{driver.licensePlate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  Driver Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4 rounded-md border p-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <div className="flex items-center">
                      <Star className="mr-1 h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <p className="text-lg font-medium">{driver.rating}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Completed Deliveries</p>
                    <p className="text-lg font-medium">{driver.completedDeliveries}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">On-Time Rate</p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-medium">{driver.onTimeRate}%</p>
                      <Progress value={driver.onTimeRate} className="h-2 w-12" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Driver Since</p>
                    <p className="text-sm">{formatJoinDate(driver.joinDate)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Earnings
                </h3>
                <div className="grid grid-cols-3 gap-4 rounded-md border p-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Today</p>
                    <p className="text-lg font-medium">{driver.earnings.today}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">This Week</p>
                    <p className="text-lg font-medium">{driver.earnings.week}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">This Month</p>
                    <p className="text-lg font-medium">{driver.earnings.month}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {driver.currentOrder && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Current Delivery
              </h3>
              <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="flex items-center">
                      <Package className="mr-2 h-4 w-4 text-blue-500" />
                      <span className="font-medium">{driver.currentOrder.id}</span>
                    </div>
                    <p className="text-sm mt-1">
                      Delivering to {driver.currentOrder.customer} at {driver.currentOrder.address}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Est. delivery by {new Date(driver.currentOrder.estimatedDelivery).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="performance" className="space-y-4 pt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Performance Metrics</h3>
                <div className="space-y-4 rounded-md border p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">On-Time Delivery Rate</p>
                      <p className="text-sm font-medium">{driver.onTimeRate}%</p>
                    </div>
                    <Progress value={driver.onTimeRate} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Customer Satisfaction</p>
                      <div className="flex items-center">
                        <Star className="mr-1 h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        <p className="text-sm font-medium">{driver.rating}/5.0</p>
                      </div>
                    </div>
                    <Progress value={(driver.rating / 5) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Order Acceptance Rate</p>
                      <p className="text-sm font-medium">96%</p>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Average Delivery Time</p>
                      <p className="text-sm font-medium">24 min</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Weekly Activity</h3>
                <div className="aspect-[4/3] rounded-md border bg-muted flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Activity chart would be displayed here</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Recent Customer Feedback</h3>
              <div className="space-y-3 rounded-md border p-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">John Smith</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">April 15, 2023</p>
                  <p className="text-sm">Very professional and delivered on time. Great service!</p>
                </div>
                <Separator />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Sarah Williams</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < 5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">April 14, 2023</p>
                  <p className="text-sm">Excellent service and very friendly. Would recommend!</p>
                </div>
                <Separator />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Emily Davis</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">April 13, 2023</p>
                  <p className="text-sm">Good delivery, but arrived a bit later than expected.</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-4 pt-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Recent Deliveries
            </h3>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">Order ID</th>
                    <th className="px-4 py-2 text-left font-medium">Customer</th>
                    <th className="px-4 py-2 text-left font-medium hidden md:table-cell">Address</th>
                    <th className="px-4 py-2 text-left font-medium">Time</th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {driver.recentDeliveries.map((delivery: any) => (
                    <tr key={delivery.id} className="border-b last:border-0">
                      <td className="px-4 py-2 font-medium">{delivery.id}</td>
                      <td className="px-4 py-2">{delivery.customer}</td>
                      <td className="px-4 py-2 hidden md:table-cell">{delivery.address}</td>
                      <td className="px-4 py-2">{formatDate(delivery.time)}</td>
                      <td className="px-4 py-2">{renderDeliveryStatus(delivery.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline">View All Deliveries</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Delivery Map
            </h3>
            <div className="aspect-[16/9] rounded-md border bg-muted flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Delivery map would be displayed here</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-4" />

      <DialogFooter>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 w-full">
          <Button variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Call Driver
          </Button>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 mb-2 sm:mb-0">
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Driver
            </Button>
            {driver.status === "active" && !driver.currentOrder && (
              <Button variant="default">
                <Package className="mr-2 h-4 w-4" />
                Assign Order
              </Button>
            )}
          </div>
        </div>
      </DialogFooter>
    </>
  )
}
