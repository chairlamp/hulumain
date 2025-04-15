"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type MenuItem = {
  id: number
  name: string
  price: number
  quantity: number
  options?: {
    id: number
    name: string
    price: number
  }[]
}

type CartStore = {
  items: MenuItem[]
  restaurantId: number | null
  restaurantName: string | null
  addItem: (item: MenuItem, restaurantId: number, restaurantName: string) => void
  removeItem: (itemId: number) => void
  updateQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  cartTotal: number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      restaurantName: null,
      cartTotal: 0,

      addItem: (item, restaurantId, restaurantName) => {
        const { items, restaurantId: currentRestaurantId } = get()

        // If adding from a different restaurant, clear the cart first
        if (currentRestaurantId !== null && currentRestaurantId !== restaurantId) {
          if (
            !confirm(
              `Your cart contains items from ${get().restaurantName}. Do you want to clear your cart and add items from ${restaurantName}?`,
            )
          ) {
            return
          }
          set({ items: [], restaurantId: null, restaurantName: null })
        }

        // Check if item already exists
        const existingItemIndex = items.findIndex((i) => i.id === item.id)

        if (existingItemIndex !== -1) {
          // Update existing item
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += item.quantity

          // Update cart total
          const total = updatedItems.reduce((acc, item) => {
            const optionsTotal = item.options ? item.options.reduce((sum, option) => sum + option.price, 0) : 0
            return acc + (item.price + optionsTotal) * item.quantity
          }, 0)

          set({
            items: updatedItems,
            restaurantId,
            restaurantName,
            cartTotal: total,
          })
        } else {
          // Add new item
          const updatedItems = [...items, item]

          // Update cart total
          const total = updatedItems.reduce((acc, item) => {
            const optionsTotal = item.options ? item.options.reduce((sum, option) => sum + option.price, 0) : 0
            return acc + (item.price + optionsTotal) * item.quantity
          }, 0)

          set({
            items: updatedItems,
            restaurantId,
            restaurantName,
            cartTotal: total,
          })
        }
      },

      removeItem: (itemId) => {
        const { items } = get()
        const updatedItems = items.filter((item) => item.id !== itemId)

        // Update cart total
        const total = updatedItems.reduce((acc, item) => {
          const optionsTotal = item.options ? item.options.reduce((sum, option) => sum + option.price, 0) : 0
          return acc + (item.price + optionsTotal) * item.quantity
        }, 0)

        set({
          items: updatedItems,
          cartTotal: total,
          // If cart is empty, reset restaurant info
          ...(updatedItems.length === 0 ? { restaurantId: null, restaurantName: null } : {}),
        })
      },

      updateQuantity: (itemId, quantity) => {
        const { items } = get()

        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          return get().removeItem(itemId)
        }

        const updatedItems = items.map((item) => (item.id === itemId ? { ...item, quantity } : item))

        // Update cart total
        const total = updatedItems.reduce((acc, item) => {
          const optionsTotal = item.options ? item.options.reduce((sum, option) => sum + option.price, 0) : 0
          return acc + (item.price + optionsTotal) * item.quantity
        }, 0)

        set({ items: updatedItems, cartTotal: total })
      },

      clearCart: () => {
        set({ items: [], restaurantId: null, restaurantName: null, cartTotal: 0 })
      },
    }),
    {
      name: "food-delivery-cart",
    },
  ),
)
