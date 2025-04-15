"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CartItemComponent } from "./cart-item"
import { useCart } from "@/contexts/cart-context"

export function CartDropdown() {
  const { cart, loading, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const handleClearCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    await clearCart()
  }

  const itemCount = cart?.items.reduce((count, item) => count + item.quantity, 0) || 0
  const total = cart?.total || 0

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4">
          <h3 className="font-medium text-lg">Your Cart</h3>
          {loading ? (
            <p className="text-center py-4">Loading cart...</p>
          ) : itemCount === 0 ? (
            <p className="text-center py-4">Your cart is empty</p>
          ) : (
            <>
              <div className="max-h-80 overflow-y-auto py-2">
                {cart?.items.map((item) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={handleClearCart}>
                  Clear Cart
                </Button>
                <Button size="sm" className="flex-1" onClick={() => setIsOpen(false)} asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
