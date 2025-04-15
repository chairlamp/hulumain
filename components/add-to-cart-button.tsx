"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import type { MenuItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export default function AddToCartButton({ item }: { item: MenuItem }) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(item)

    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <Button size="sm" onClick={handleAddToCart} disabled={isAdding}>
      <Plus className="h-4 w-4 mr-1" />
      Add
    </Button>
  )
}
