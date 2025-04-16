"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronRight } from "lucide-react"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, loading, clearCart } = useCart()
  const items = cart?.items ?? []
  const subtotal = cart?.total ?? 0

  const [step, setStep] = useState<"delivery" | "payment" | "review">("delivery")
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    phone: "",
    address: "",
    instructions: "",
  })
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "paypal" | "cash">("credit_card")

  if (loading) {
    return <div className="p-8 text-center">Loading your cart...</div>
  }

  if (!loading && items.length === 0) {
    router.push("/restaurants")
    return null
  }

  const deliveryFee = 3.99
  const total = subtotal + deliveryFee

  const handleDeliverySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("review")
  }

  const handlePlaceOrder = () => {
    alert("Order placed successfully!")
    clearCart()
    router.push("/orders")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {/* Stepper */}
          <div className="flex items-center mb-6">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === "delivery" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {step === "delivery" ? "1" : <Check className="h-4 w-4" />}
            </div>
            <div className="h-px w-8 bg-border"></div>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === "payment" ? "bg-primary text-primary-foreground" : step === "review" ? "bg-muted text-muted-foreground" : "bg-muted text-muted-foreground"}`}>
              {step === "payment" ? "2" : step === "review" ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <div className="h-px w-8 bg-border"></div>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step === "review" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              3
            </div>
          </div>

          {/* Step Content */}
          {step === "delivery" && (
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <form onSubmit={handleDeliverySubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={deliveryInfo.name} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={deliveryInfo.phone} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Textarea id="address" value={deliveryInfo.address} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                      <Textarea id="instructions" value={deliveryInfo.instructions} onChange={(e) => setDeliveryInfo({ ...deliveryInfo, instructions: e.target.value })} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="ml-auto">
                    Continue to Payment
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {step === "payment" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <form onSubmit={handlePaymentSubmit}>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)} className="space-y-4">
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="credit_card" id="credit_card" />
                      <Label htmlFor="credit_card" className="flex-1 cursor-pointer">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep("delivery")}>Back</Button>
                  <Button type="submit">Review Order <ChevronRight className="ml-2 h-4 w-4" /></Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {step === "review" && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Delivery Information</h3>
                  <div className="text-sm space-y-1">
                    <p>{deliveryInfo.name}</p>
                    <p>{deliveryInfo.phone}</p>
                    <p className="whitespace-pre-line">{deliveryInfo.address}</p>
                    {deliveryInfo.instructions && <p className="text-muted-foreground">{deliveryInfo.instructions}</p>}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-sm capitalize">{paymentMethod.replace("_", " ")}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="space-y-2 text-sm">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.quantity} × {item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep("payment")}>Back</Button>
                <Button onClick={handlePlaceOrder}>Place Order</Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {/* Sidebar: Order Summary */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.quantity} × {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
