import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CheckCircle,
  Truck,
  AlertCircle,
  Ban,
  MapPin,
  Phone,
  CreditCard,
  Clock,
  User,
  FileText,
  Package,
} from "lucide-react"

interface OrderDetailsProps {
  order: any
}

export function OrderDetails({ order }: OrderDetailsProps) {
  // Function to render status badge with appropriate color
  const renderStatus = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        )
      case "in-transit":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Truck className="mr-1 h-3 w-3" />
            In Transit
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <AlertCircle className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <Ban className="mr-1 h-3 w-3" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          <span>Order {order.id}</span>
          {renderStatus(order.status)}
        </DialogTitle>
        <DialogDescription>Placed on {formatDate(order.date)}</DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="details" className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="customer">Customer Info</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Info</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Order Items
            </h3>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">Item</th>
                    <th className="px-4 py-2 text-center font-medium">Quantity</th>
                    <th className="px-4 py-2 text-right font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item: any, index: number) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                      <td className="px-4 py-2 text-right">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t bg-muted/50">
                    <td className="px-4 py-2 font-medium" colSpan={2}>
                      Total
                    </td>
                    <td className="px-4 py-2 text-right font-medium">{order.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Order Notes
            </h3>
            <p className="text-sm text-muted-foreground rounded-md border p-3">{order.notes || "No notes provided"}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Payment Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm">{order.paymentMethod}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Payment Status</p>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-600"
                >
                  Paid
                </Badge>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customer" className="space-y-4 pt-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <User className="mr-2 h-4 w-4" />
              Customer Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm">{order.customer}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm flex items-center">
                  <Phone className="mr-1 h-3 w-3" />
                  {order.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Delivery Address
            </h3>
            <p className="text-sm rounded-md border p-3">{order.address}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Order History
            </h3>
            <div className="space-y-2 rounded-md border p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <AlertCircle className="mr-2 h-3 w-3 text-yellow-500" />
                  Order Placed
                </span>
                <span className="text-muted-foreground">{formatDate(order.date)}</span>
              </div>
              {order.status !== "pending" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <Truck className="mr-2 h-3 w-3 text-blue-500" />
                    Out for Delivery
                  </span>
                  <span className="text-muted-foreground">
                    {formatDate(new Date(new Date(order.date).getTime() + 30 * 60000).toString())}
                  </span>
                </div>
              )}
              {order.status === "delivered" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <CheckCircle className="mr-2 h-3 w-3 text-green-500" />
                    Delivered
                  </span>
                  <span className="text-muted-foreground">
                    {formatDate(new Date(new Date(order.date).getTime() + 60 * 60000).toString())}
                  </span>
                </div>
              )}
              {order.status === "cancelled" && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <Ban className="mr-2 h-3 w-3 text-red-500" />
                    Cancelled
                  </span>
                  <span className="text-muted-foreground">
                    {formatDate(new Date(new Date(order.date).getTime() + 15 * 60000).toString())}
                  </span>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-4 pt-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <Truck className="mr-2 h-4 w-4" />
              Delivery Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Driver</p>
                <p className="text-sm">{order.driver}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Estimated Delivery Time</p>
                <p className="text-sm">
                  {order.status === "delivered"
                    ? "Delivered"
                    : order.status === "cancelled"
                      ? "Cancelled"
                      : "30-45 minutes"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Delivery Location
            </h3>
            <div className="aspect-video rounded-md border bg-muted flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Map view would be displayed here</p>
            </div>
          </div>

          {order.status !== "delivered" && order.status !== "cancelled" && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Update Delivery Status</h3>
              <div className="flex items-center gap-2">
                <Select defaultValue={order.status}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Update</Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Separator className="my-4" />

      <DialogFooter>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 w-full">
          <Button variant="outline">Print Receipt</Button>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 mb-2 sm:mb-0">
            {order.status === "pending" && (
              <Button>
                <Truck className="mr-2 h-4 w-4" />
                Assign Driver
              </Button>
            )}
            {(order.status === "pending" || order.status === "in-transit") && (
              <Button variant="destructive">
                <Ban className="mr-2 h-4 w-4" />
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </DialogFooter>
    </>
  )
}
