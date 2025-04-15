"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, Clock, MapPin, Navigation, Phone, User } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function ActiveDeliveryCard() {
  const [deliveryStatus, setDeliveryStatus] = useState("pickup")
  const [progress, setProgress] = useState(33)

  const handleNextStep = () => {
    if (deliveryStatus === "pickup") {
      setDeliveryStatus("delivering")
      setProgress(66)
    } else if (deliveryStatus === "delivering") {
      setDeliveryStatus("delivered")
      setProgress(100)
    }
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Active Delivery</CardTitle>
          <Badge variant={deliveryStatus === "delivered" ? "default" : "outline"}>
            {deliveryStatus === "pickup" && "Pickup"}
            {deliveryStatus === "delivering" && "On the way"}
            {deliveryStatus === "delivered" && "Delivered"}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                {deliveryStatus === "pickup" ? "Pickup Location" : "Delivery Location"}
              </h3>
              <div className="mt-2 rounded-lg border p-3">
                <div className="font-medium">{deliveryStatus === "pickup" ? "McDonald's" : "Alice Johnson"}</div>
                <div className="text-sm text-muted-foreground">
                  {deliveryStatus === "pickup" ? "1234 Fast Food Lane, Suite 100" : "5678 Residential Ave, Apt 4B"}
                </div>
                <div className="mt-2 flex justify-between">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Navigation className="h-3.5 w-3.5" />
                    Navigate
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    Call
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                Order Details
              </h3>
              <div className="mt-2 rounded-lg border p-3">
                <div className="flex justify-between text-sm">
                  <span>Order #:</span>
                  <span className="font-medium">ORD-1234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Items:</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Payment:</span>
                  <span className="font-medium">Paid online</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Earnings:</span>
                  <span className="font-medium">$8.50</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                Delivery Timeline
              </h3>
              <div className="mt-2 space-y-3">
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Order Accepted</div>
                    <div className="text-xs text-muted-foreground">Today, 1:30 PM</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    {deliveryStatus !== "pickup" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-primary"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Arrived at Restaurant</div>
                    <div className="text-xs text-muted-foreground">
                      {deliveryStatus !== "pickup" ? "Today, 1:45 PM" : "Estimated: 1:45 PM"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    {deliveryStatus === "delivered" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Delivered to Customer</div>
                    <div className="text-xs text-muted-foreground">Estimated: 2:15 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                Customer Notes
              </h3>
              <div className="mt-2 rounded-lg border p-3 text-sm">
                Please leave at the door. The building code is #4321. Thank you!
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
        <Button variant="outline">Cancel Delivery</Button>
        {deliveryStatus !== "delivered" ? (
          <Button onClick={handleNextStep}>
            {deliveryStatus === "pickup" ? "Picked Up - Start Delivery" : "Complete Delivery"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" disabled>
            Delivery Completed
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
