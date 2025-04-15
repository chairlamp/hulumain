"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { FoodItem } from "@/types/food"

export interface CartItem {
  id: string
  foodItem: FoodItem
  quantity: number
  specialInstructions?: string
}

interface CartContextType {
  items: CartItem[]
  addToCart: (foodItem: FoodItem, quantity?: number, specialInstructions?: string) => Promise<any>
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => Promise<any>
  clearCart: () => Promise<boolean>
  getCartTotal: () => number
  getItemCount: () => number
  getItemById: (id: string) => CartItem | undefined
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addToCart = async (foodItem: FoodItem, quantity = 1, specialInstructions?: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuItemId: foodItem.id,
          quantity,
          specialInstructions,
        }),
      })

      if (!response.ok) throw new Error("Failed to add item to cart")

      const data = await response.json()
      setItems(data.cart)
      return data
    } catch (error) {
      console.error("Error adding to cart:", error)
      throw error
    }
  }

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuItemId: id,
          quantity,
        }),
      })

      if (!response.ok) throw new Error("Failed to update cart")

      const data = await response.json()
      setItems(data.cart)
      return data
    } catch (error) {
      console.error("Error updating cart:", error)
      throw error
    }
  }

  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to clear cart")

      setItems([])
      localStorage.removeItem("cart")
      return true
    } catch (error) {
      console.error("Error clearing cart:", error)
      throw error
    }
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.foodItem.price * item.quantity, 0)
  }

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  const getItemById = (id: string) => {
    return items.find((item) => item.id === id)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
        getItemById,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
