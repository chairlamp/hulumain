"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { FoodDetails } from "@/components/food/food-details"
import { FoodList } from "@/components/food/food-list"
import { mockFoodItems } from "@/components/food/mock-data"
import type { FoodItem } from "@/types/food"

interface FoodDetailPageProps {
  params: {
    id: string
  }
}

export default function FoodDetailPage({ params }: FoodDetailPageProps) {
  const [food, setFood] = useState<FoodItem | null>(null)
  const [relatedFoods, setRelatedFoods] = useState<FoodItem[]>([])

  useEffect(() => {
    // Find the food item by ID
    const foundFood = mockFoodItems.find((item) => item.id === params.id)

    if (foundFood) {
      setFood(foundFood)

      // Get related foods (same category, excluding current food)
      const related = mockFoodItems
        .filter((item) => item.category === foundFood.category && item.id !== foundFood.id)
        .slice(0, 4)

      setRelatedFoods(related)
    }
  }, [params.id])

  if (!food) {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <FoodDetails food={food} />

        {relatedFoods.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <FoodList foods={relatedFoods} showFilters={false} />
          </div>
        )}
      </div>
    </main>
  )
}
