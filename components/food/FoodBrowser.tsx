"use client"

import { useState, useEffect } from "react"
import { FoodSection } from "@/components/food/food-section"
import { mockFoodItems, foodCategories } from "@/components/food/mock-data"
import type { FilterOptions } from "@/components/food/food-filters"
import type { FoodItem } from "@/types/food"

export function FoodBrowser() {
  const [foods, setFoods] = useState<FoodItem[]>(mockFoodItems)
  const [filteredFoods, setFilteredFoods] = useState<FoodItem[]>(mockFoodItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null)

  useEffect(() => {
    let result = [...foods]

    if (searchQuery) {
      result = result.filter(
        (food) =>
          food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          food.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory !== "All") {
      result = result.filter((food) => food.category === selectedCategory)
    }

    if (activeFilters) {
      result = result.filter(
        (food) => food.price >= activeFilters.priceRange[0] && food.price <= activeFilters.priceRange[1],
      )

      if (activeFilters.dietaryPreferences.vegetarian) {
        result = result.filter((food) => food.isVegetarian)
      }
      if (activeFilters.dietaryPreferences.vegan) {
        result = result.filter((food) => food.isVegan)
      }
      if (activeFilters.dietaryPreferences.glutenFree) {
        result = result.filter((food) => food.isGlutenFree)
      }

      if (activeFilters.minRating > 0) {
        result = result.filter((food) => food.rating >= activeFilters.minRating)
      }

      if (activeFilters.maxDeliveryTime < 60) {
        result = result.filter((food) => food.preparationTime <= activeFilters.maxDeliveryTime)
      }
    }

    setFilteredFoods(result)
  }, [foods, searchQuery, selectedCategory, activeFilters])

  const handleSearch = (query: string) => setSearchQuery(query)
  const handleSelectCategory = (category: string) => setSelectedCategory(category)
  const handleApplyFilters = (filters: FilterOptions) => setActiveFilters(filters)

  return (
    <FoodSection
      foods={filteredFoods}
      categories={foodCategories}
      onSearch={handleSearch}
      onSelectCategory={handleSelectCategory}
      onApplyFilters={handleApplyFilters}
      selectedCategory={selectedCategory}
    />
  )
}
