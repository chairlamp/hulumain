"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart, type CartItem } from "@/contexts/cart-context"

interface CartItemProps {
  item: CartItem
  showControls?: boolean
}

export function CartItemComponent({ item, showControls = true }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()
  const { foodItem, quantity } = item

  const handleIncreaseQuantity = () => {
    updateQuantity(item.id, quantity + 1)
  }

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(item.id, quantity - 1)
    } else {
      removeFromCart(item.id)
    }
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
        <Image src={foodItem.image || "/placeholder.svg"} alt={foodItem.name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <Link
            href={`/restaurants/${foodItem.restaurantId}/food/${foodItem.id}`}
            className="font-medium hover:underline"
          >
            <h4 className="text-sm font-medium line-clamp-1">{foodItem.name}</h4>
          </Link>
          <span className="text-sm font-medium">${(foodItem.price * quantity).toFixed(2)}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{foodItem.restaurant}</p>
        {item.specialInstructions && (
          <p className="text-xs text-muted-foreground mt-1 italic line-clamp-1">Note: {item.specialInstructions}</p>
        )}
        {showControls && (
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={handleDecreaseQuantity}>
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={handleIncreaseQuantity}>
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove item</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
