"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Heart, Info, MapPin, Phone, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FoodList } from "@/components/food/food-list"
import { FoodCategories } from "@/components/food/food-categories"
import type { Restaurant } from "@/types/restaurant"
import type { FoodItem } from "@/types/food"

interface RestaurantDetailsProps {
  restaurant: Restaurant
  menu: FoodItem[]
}

export function RestaurantDetails({ restaurant, menu }: RestaurantDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  const toggleFavorite = () => setIsFavorite((prev) => !prev)

  // Extract unique categories from menu
  const categories = Array.from(new Set(menu.map((item) => item.category)))

  // Filter menu by selected category
  const filteredMenu = selectedCategory === "All" ? menu : menu.filter((item) => item.category === selectedCategory)

  if (!restaurant) {
    return <div>Loading restaurant details...</div>
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-6">
        <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap gap-2 mb-2">
                {restaurant.cuisineType.map((cuisine) => (
                  <Badge key={cuisine} variant="secondary" className="text-xs">
                    {cuisine}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{restaurant.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{restaurant.deliveryTime} min</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{restaurant.distance.toFixed(1)} mi</span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full"
              onClick={toggleFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Restaurant Info & Menu */}
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-semibold mb-3">Restaurant Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{restaurant.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div>Mon-Fri: {restaurant.hours.weekday}</div>
                  <div>Sat-Sun: {restaurant.hours.weekend}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div>Delivery Fee: ${restaurant.deliveryFee.toFixed(2)}</div>
                  <div>Min. Order: ${restaurant.minOrder.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <h3 className="font-semibold mb-3">About</h3>
            <p className="text-sm text-muted-foreground">{restaurant.description}</p>
          </div>
        </div>

        {/* Menu */}
        <div>
          <Tabs defaultValue="menu">
            <TabsList className="mb-6">
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="space-y-6">
              <FoodCategories
                categories={categories}
                onSelectCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
              />

              <FoodList foods={filteredMenu} title={selectedCategory === "All" ? "Full Menu" : selectedCategory} />
            </TabsContent>

            <TabsContent value="reviews">
              <div className="text-center py-12 text-muted-foreground">
                <p>Reviews coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="photos">
              <div className="text-center py-12 text-muted-foreground">
                <p>Photos coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
