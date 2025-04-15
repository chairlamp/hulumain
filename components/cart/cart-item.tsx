"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import type { CartItem as CartItemType } from "@/contexts/cart-context"

interface CartItemProps {
  item: CartItemType
  showControls?: boolean
}

export function CartItemComponent({ item, showControls = false }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    } else {
      removeFromCart(item.id)
    }
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-muted-foreground">
          ${item.price.toFixed(2)} x {item.quantity}
        </p>
        {item.specialInstructions && <p className="text-xs text-muted-foreground italic">{item.specialInstructions}</p>}
      </div>
      {showControls && (
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-6 w-6" onClick={handleDecrement}>
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-6 text-center">{item.quantity}</span>
          <Button variant="outline" size="icon" className="h-6 w-6" onClick={handleIncrement}>
            <Plus className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={handleRemove}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  )
}
