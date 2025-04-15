"use client"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface RestaurantCategoriesProps {
  categories: string[]
  onSelectCategory: (category: string) => void
  selectedCategory?: string
}

export function RestaurantCategories({
  categories,
  onSelectCategory,
  selectedCategory = "All",
}: RestaurantCategoriesProps) {
  // Add "All" category if it doesn't exist
  const allCategories = ["All", ...categories.filter((c) => c !== "All")]

  return (
    <div className="relative">
      <ScrollArea className="w-full whitespace-nowrap pb-4">
        <div className="flex space-x-2 p-1">
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="rounded-full px-4"
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
