"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CartItemComponent } from "@/components/cart/cart-item"
import { useCart } from "@/contexts/cart-context"

export function CartDropdown() {
  const { items, getCartTotal, getItemCount, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const itemCount = getItemCount()
  const cartTotal = getCartTotal()

  const handleCheckout = () => {
    setIsOpen(false)
    // You would typically navigate to checkout page here
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({itemCount} items)</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">Your cart is empty</h3>
              <p className="text-muted-foreground mt-1">Add items to get started</p>
              <Button className="mt-4" onClick={() => setIsOpen(false)} asChild>
                <Link href="/restaurants">Browse Restaurants</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {items.map((item) => (
                <CartItemComponent key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>$3.99</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(cartTotal + 3.99).toFixed(2)}</span>
              </div>
            </div>

            <SheetFooter className="flex-col gap-2 sm:flex-col mt-4">
              <Button onClick={handleCheckout} className="w-full">
                Checkout
              </Button>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/cart" onClick={() => setIsOpen(false)}>
                    View Cart
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
