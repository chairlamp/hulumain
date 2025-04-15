import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  ShoppingBag,
  FileText,
  Star,
  StarOff,
  User,
  Package,
} from "lucide-react"

interface CustomerDetailsProps {
  customer: any
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
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

  // Calculate customer lifetime
  const calculateCustomerLifetime = (joinDateString: string) => {
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
  const renderOrderStatus = (status: string) => {
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
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={customer.name} />
              <AvatarFallback>
                {customer.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <DialogTitle>{customer.name}</DialogTitle>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            {customer.favorite ? (
              <>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>Favorite</span>
              </>
            ) : (
              <>
                <StarOff className="h-4 w-4" />
                <span>Add to Favorites</span>
              </>
            )}
          </Button>
        </div>
        <DialogDescription>Customer since {formatJoinDate(customer.joinDate)}</DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="profile" className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
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
                    <span className="text-sm">{customer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{customer.address}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </h3>
                <div className="space-y-2 rounded-md border p-3">
                  {customer.paymentMethods.map((method: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Customer Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4 rounded-md border p-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Orders</p>
                    <p className="text-lg font-medium">{customer.totalOrders}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Total Spent</p>
                    <p className="text-lg font-medium">{customer.totalSpent}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Customer Since</p>
                    <p className="text-sm">{formatJoinDate(customer.joinDate)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Customer Lifetime</p>
                    <p className="text-sm">{calculateCustomerLifetime(customer.joinDate)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Recent Activity
                </h3>
                <div className="space-y-2 rounded-md border p-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Last Order</p>
                    <p className="text-sm">{formatDate(customer.lastOrder)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4 pt-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Order History
            </h3>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">Order ID</th>
                    <th className="px-4 py-2 text-left font-medium">Date</th>
                    <th className="px-4 py-2 text-left font-medium">Total</th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                    <th className="px-4 py-2 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.orderHistory.map((order: any) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="px-4 py-2 font-medium">{order.id}</td>
                      <td className="px-4 py-2">{formatDate(order.date)}</td>
                      <td className="px-4 py-2">{order.total}</td>
                      <td className="px-4 py-2">{renderOrderStatus(order.status)}</td>
                      <td className="px-4 py-2 text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              <Button variant="outline">View All Orders</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Order Analytics
            </h3>
            <div className="aspect-[2/1] rounded-md border bg-muted flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Order analytics chart would be displayed here</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4 pt-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Customer Notes
            </h3>
            <div className="rounded-md border p-3 min-h-[150px]">
              <p className="text-sm">{customer.notes || "No notes available for this customer."}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Add Note</h3>
            <textarea
              className="w-full min-h-[100px] rounded-md border p-2 text-sm"
              placeholder="Add a note about this customer..."
            />
            <div className="flex justify-end">
              <Button>Save Note</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-4" />

      <DialogFooter>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 w-full">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 mb-2 sm:mb-0">
            <Button>
              <User className="mr-2 h-4 w-4" />
              Edit Customer
            </Button>
          </div>
        </div>
      </DialogFooter>
    </>
  )
}
