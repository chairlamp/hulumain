import { FoodList } from "@/components/food/food-list"
import { FoodCategories } from "@/components/food/food-categories"
import { FoodSearch } from "@/components/food/food-search"
import { FoodFilters, type FilterOptions } from "@/components/food/food-filters"
import type { FoodItem } from "@/types/food"

interface FoodSectionProps {
  title?: string
  foods: FoodItem[]
  categories: string[]
  onSearch: (query: string) => void
  onSelectCategory: (category: string) => void
  onApplyFilters: (filters: FilterOptions) => void
  selectedCategory?: string
}

export function FoodSection({
  title = "Our Menu",
  foods,
  categories,
  onSearch,
  onSelectCategory,
  onApplyFilters,
  selectedCategory = "All",
}: FoodSectionProps) {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
          <div className="flex-1">
            <FoodSearch onSearch={onSearch} />
          </div>
          <div className="flex gap-2">
            <FoodFilters onApplyFilters={onApplyFilters} />
          </div>
        </div>

        <div className="mb-8">
          <FoodCategories
            categories={categories}
            onSelectCategory={onSelectCategory}
            selectedCategory={selectedCategory}
          />
        </div>

        <FoodList foods={foods} showFilters={false} />
      </div>
    </section>
  )
}
