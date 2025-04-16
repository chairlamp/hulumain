"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { FoodItem } from "@/types/food"

export interface CartItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  specialInstructions?: string
}

interface Cart {
  id: string
  items: CartItem[]
  total: number
}

interface CartContextType {
  cart: Cart | null
  loading: boolean
  addToCart: (foodItem: FoodItem, quantity?: number, specialInstructions?: string) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getCartTotal: () => number
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch cart on initial render
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/cart")

        if (response.ok) {
          const data = await response.json()
          setCart(data)
        } else {
          // If unauthorized or cart not found, create empty cart
          setCart({ id: "", items: [], total: 0 })
        }
      } catch (error) {
        console.error("Error fetching cart:", error)
        setCart({ id: "", items: [], total: 0 })
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [])

  const addToCart = async (foodItem: FoodItem, quantity = 1, specialInstructions?: string) => {
    // Debug: Log the incoming food item and its ID
    console.log("🧪 addToCart called with:", foodItem)
    console.log("🧾 menuItemId:", foodItem.id)
  
    try {
      setLoading(true)
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
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to add item to cart")
      }
  
      const data = await response.json()
      setCart(data.cart)
    } catch (error) {
      console.error("❌ Error adding to cart:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }
  
  const removeFromCart = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItemId: id,
          quantity: 0,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to remove item from cart")
      }

      const data = await response.json()
      setCart(data.cart)
    } catch (error) {
      console.error("Error removing from cart:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      setLoading(true)
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItemId: id,
          quantity,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update cart")
      }

      const data = await response.json()
      setCart(data.cart)
    } catch (error) {
      console.error("Error updating cart:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/cart", {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to clear cart")
      }

      const data = await response.json()
      setCart(data.cart)
    } catch (error) {
      console.error("Error clearing cart:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getCartTotal = () => {
    return cart?.total || 0
  }

  const getItemCount = () => {
    return cart?.items.reduce((count, item) => count + item.quantity, 0) || 0
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
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
