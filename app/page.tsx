import { PopularFoodPreview } from "@/components/food/PopularFoodPreview"
import Hero from "@/components/hero"
import { PopularRestaurantPreview } from "@/components/restaurant/PopularRestaurantPreview"
import Link from "next/link"

export default async function HomePage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Hero Section */}
      <div className="mb-8">
        <Hero />
      </div>

      {/* Popular Foods Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Popular Dishes</h2>
          <Link href="/food" className="text-primary underline text-sm">
            View All
          </Link>
        </div>
        <PopularFoodPreview />
      </div>

      {/* Popular Restaurants Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Popular Restaurants</h2>
          <Link href="/restaurants" className="text-primary underline text-sm">
            View All
          </Link>
        </div>
        <PopularRestaurantPreview />
      </div>
    </div>
  )
}
