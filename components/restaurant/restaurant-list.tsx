"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

import { RestaurantCard } from "@/components/restaurant/restaurant-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Restaurant } from "@/types/restaurant"

interface RestaurantListProps {
  restaurants: Restaurant[]
  title?: string
  showFilters?: boolean
}

export function RestaurantList({ restaurants, title = "Restaurants", showFilters = true }: RestaurantListProps) {
  const [sortBy, setSortBy] = useState<string>("recommended")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<{ search?: string; category?: string }>({})
  const [restaurantList, setRestaurants] = useState<Restaurant[]>([])
  const [pagination, setPagination] = useState<{ totalPages: number; currentPage: number }>({
    totalPages: 1,
    currentPage: 1,
  })

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  // Sort restaurants based on selected option
  const sortedRestaurants = [...restaurantList].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "delivery-time":
        return a.deliveryTime - b.deliveryTime
      case "delivery-fee":
        return a.deliveryFee - b.deliveryFee
      case "min-order":
        return a.minOrder - b.minOrder
      case "distance":
        return a.distance - b.distance
      default:
        return 0
    }
  })

  const fetchRestaurants = async (page = 1, filters = {}) => {
    try {
      setLoading(true)

      const params = new URLSearchParams()
      params.append("page", page.toString())
      params.append("limit", "10")

      if (filters.search) params.append("search", filters.search)
      if (filters.category) params.append("category", filters.category)

      const response = await fetch(`/api/restaurants?${params.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch restaurants")

      const data = await response.json()

      // ✅ Sanitize ratings to avoid .toFixed crash
      const sanitizedRestaurants = data.restaurants.map((r: any) => {
        const parsedRating = typeof r.rating === "number" ? r.rating : parseFloat(r.rating)
        if (!Number.isFinite(parsedRating)) {
          console.warn(`Invalid rating for "${r.name}":`, r.rating)
        }

        return {
          ...r,
          rating: Number.isFinite(parsedRating) ? parsedRating : 0,
        }
      })

      setRestaurants(sanitizedRestaurants)
      setPagination(data.pagination)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching restaurants:", error)
      setError("Failed to load restaurants. Please try again.")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRestaurants(currentPage, filters)
  }, [currentPage, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {showFilters && (
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="delivery-time">Fastest Delivery</SelectItem>
                <SelectItem value="delivery-fee">Lowest Delivery Fee</SelectItem>
                <SelectItem value="min-order">Lowest Minimum Order</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            {...restaurant}
            isFavorite={favorites.has(restaurant.id)}
            onToggleFavorite={() => toggleFavorite(restaurant.id)}
          />
        ))}
      </div>

      {restaurantList.length > 9 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="flex items-center gap-2">
            Load More <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
