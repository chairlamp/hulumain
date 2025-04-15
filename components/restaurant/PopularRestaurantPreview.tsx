import { mockRestaurants } from "@/components/restaurant/mock-data"
import { RestaurantCard } from "@/components/restaurant/restaurant-card"

export function PopularRestaurantPreview() {
  const popularRestaurants = mockRestaurants.sort((a, b) => b.rating - a.rating).slice(0, 6)

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {popularRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </div>
  )
}
