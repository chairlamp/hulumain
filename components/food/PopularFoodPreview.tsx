import { FoodCard } from "@/components/food/food-card"
import { mockFoodItems } from "@/components/food/mock-data"

export function PopularFoodPreview() {
  const popularFoods = mockFoodItems.sort((a, b) => b.rating - a.rating).slice(0, 6)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {popularFoods.map((food) => (
        <FoodCard key={food.id} {...food} />
      ))}
    </div>
  )
}
