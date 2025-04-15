import { RestaurantList } from "@/components/restaurant/restaurant-list"
import { RestaurantCategories } from "@/components/restaurant/restaurant-categories"
import { RestaurantSearch } from "@/components/restaurant/restaurant-search"
import { RestaurantFilters, type FilterOptions } from "@/components/restaurant/restaurant-filters"
import type { Restaurant } from "@/types/restaurant"

interface RestaurantSectionProps {
  title?: string
  restaurants: Restaurant[]
  categories: string[]
  cuisineTypes: string[]
  onSearch: (query: string) => void
  onSelectCategory: (category: string) => void
  onApplyFilters: (filters: FilterOptions) => void
  selectedCategory?: string
}

export function RestaurantSection({
  title = "Restaurants Near You",
  restaurants,
  categories,
  cuisineTypes,
  onSearch,
  onSelectCategory,
  onApplyFilters,
  selectedCategory = "All",
}: RestaurantSectionProps) {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
          <div className="flex-1">
            <RestaurantSearch onSearch={onSearch} />
          </div>
          <div className="flex gap-2">
            <RestaurantFilters onApplyFilters={onApplyFilters} cuisineTypes={cuisineTypes} />
          </div>
        </div>

        <div className="mb-8">
          <RestaurantCategories
            categories={categories}
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
          />
        </div>

        <RestaurantList restaurants={restaurants} showFilters={false} />
      </div>
    </section>
  )
}
