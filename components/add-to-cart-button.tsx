"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"
import type { FoodItem } from "@/types/food"

interface AddToCartButtonProps {
  foodItem: FoodItem
  quantity?: number
  specialInstructions?: string
  className?: string
}

export function AddToCartButton({ foodItem, quantity = 1, specialInstructions, className }: AddToCartButtonProps) {
  const { addToCart, loading } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddToCart = async () => {
    try {
      setIsAdding(true)
      setError(null)
      await addToCart(foodItem, quantity, specialInstructions)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to cart")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="flex flex-col">
      <Button onClick={handleAddToCart} disabled={isAdding || loading} className={className}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isAdding ? "Adding..." : "Add to Cart"}
      </Button>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}
