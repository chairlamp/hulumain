"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { RestaurantDetails } from "@/components/restaurant/restaurant-details"
import { mockRestaurants } from "@/components/restaurant/mock-data"
import { mockFoodItems } from "@/components/food/mock-data"
import type { Restaurant } from "@/types/restaurant"
import type { FoodItem } from "@/types/food"

interface RestaurantDetailPageProps {
  params: {
    id: string
  }
}

export default function RestaurantDetailPage({ params }: RestaurantDetailPageProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [menu, setMenu] = useState<FoodItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the restaurant by ID
    const foundRestaurant = mockRestaurants.find((item) => item.id === params.id)

    if (foundRestaurant) {
      setRestaurant(foundRestaurant)

      // Get restaurant menu - filter food items that match this restaurant ID
      const restaurantMenu = mockFoodItems.filter((item) => item.restaurantId === params.id)
      setMenu(restaurantMenu)
    }

    setLoading(false)
  }, [params.id])

  // Show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-[400px] bg-gray-200 rounded-xl mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            <div className="h-[200px] bg-gray-200 rounded"></div>
            <div className="h-[400px] bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Show 404 if restaurant not found
  if (!restaurant && !loading) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <RestaurantDetails restaurant={restaurant!} menu={menu} />
      </div>
    </main>
  )
}
