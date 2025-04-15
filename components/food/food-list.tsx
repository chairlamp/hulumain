"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { FoodCard } from "@/components/food/food-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FoodItem } from "@/types/food"

interface FoodListProps {
  foods: FoodItem[]
  title?: string
  showFilters?: boolean
}

export function FoodList({ foods, title = "Menu", showFilters = true }: FoodListProps) {
  const [sortBy, setSortBy] = useState<string>("recommended")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

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

  const handleAddToCart = (id: string) => {
    console.log(`Added ${id} to cart`)
    // Implement your cart logic here
  }

  // Sort foods based on selected option
  const sortedFoods = [...foods].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "time":
        return a.preparationTime - b.preparationTime
      default:
        return 0 // recommended - no sorting
    }
  })

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
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="time">Fastest Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedFoods.map((food) => (
          <FoodCard
            key={food.id}
            {...food}
            isFavorite={favorites.has(food.id)}
            onToggleFavorite={() => toggleFavorite(food.id)}
            onAddToCart={() => handleAddToCart(food.id)}
          />
        ))}
      </div>

      {foods.length > 8 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline" className="flex items-center gap-2">
            Load More <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
