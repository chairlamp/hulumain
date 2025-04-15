"use client"

import { useState, useEffect } from "react"
import { RestaurantSection } from "@/components/restaurant/restaurant-section"
import { mockRestaurants, restaurantCategories, cuisineTypes } from "@/components/restaurant/mock-data"
import type { FilterOptions } from "@/components/restaurant/restaurant-filters"
import type { Restaurant } from "@/types/restaurant"

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants)
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(mockRestaurants)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null)

  // Apply filters whenever search, category, or filters change
  useEffect(() => {
    let result = [...restaurants]

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisineType.some((cuisine) => cuisine.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply category filter
    if (selectedCategory === "Featured") {
      result = result.filter((restaurant) => restaurant.rating >= 4.5)
    } else if (selectedCategory === "Nearest") {
      result = result.sort((a, b) => a.distance - b.distance)
    } else if (selectedCategory === "Top Rated") {
      result = result.sort((a, b) => b.rating - a.rating)
    } else if (selectedCategory === "Special Offers") {
      result = result.filter((restaurant) => restaurant.features?.hasOffers)
    }

    // Apply advanced filters
    if (activeFilters) {
      // Price range (min order as proxy for price)
      result = result.filter(
        (restaurant) =>
          restaurant.minOrder >= activeFilters.priceRange[0] && restaurant.minOrder <= activeFilters.priceRange[1],
      )

      // Delivery time
      if (activeFilters.maxDeliveryTime < 60) {
        result = result.filter((restaurant) => restaurant.deliveryTime <= activeFilters.maxDeliveryTime)
      }

      // Delivery fee
      if (activeFilters.maxDeliveryFee < 10) {
        result = result.filter((restaurant) => restaurant.deliveryFee <= activeFilters.maxDeliveryFee)
      }

      // Rating
      if (activeFilters.minRating > 0) {
        result = result.filter((restaurant) => restaurant.rating >= activeFilters.minRating)
      }

      // Distance
      if (activeFilters.maxDistance < 10) {
        result = result.filter((restaurant) => restaurant.distance <= activeFilters.maxDistance)
      }

      // Cuisines
      if (activeFilters.cuisines.length > 0) {
        result = result.filter((restaurant) =>
          restaurant.cuisineType.some((cuisine) => activeFilters.cuisines.includes(cuisine)),
        )
      }

      // Features
      if (activeFilters.features.openNow) {
        result = result.filter((restaurant) => restaurant.isOpen)
      }
      if (activeFilters.features.freeDelivery) {
        result = result.filter((restaurant) => restaurant.features?.freeDelivery)
      }
      if (activeFilters.features.offers) {
        result = result.filter((restaurant) => restaurant.features?.hasOffers)
      }
    }

    setFilteredRestaurants(result)
  }, [restaurants, searchQuery, selectedCategory, activeFilters])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category)
  }

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Restaurants</h1>

        <RestaurantSection
          restaurants={filteredRestaurants}
          categories={restaurantCategories}
          cuisineTypes={cuisineTypes}
          onSearch={handleSearch}
          onSelectCategory={handleSelectCategory}
          onApplyFilters={handleApplyFilters}
          selectedCategory={selectedCategory}
        />
      </div>
    </main>
  )
}
