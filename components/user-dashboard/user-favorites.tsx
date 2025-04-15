"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function UserFavorites() {
  // This would come from your API in a real app
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Burger King",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Fast Food",
      rating: 4.2,
      deliveryTime: "15-25 min",
      minOrder: "$10",
    },
    {
      id: 2,
      name: "Pizza Hut",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Pizza",
      rating: 4.5,
      deliveryTime: "20-30 min",
      minOrder: "$15",
    },
    {
      id: 3,
      name: "Taco Bell",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Mexican",
      rating: 4.0,
      deliveryTime: "15-25 min",
      minOrder: "$12",
    },
    {
      id: 4,
      name: "Subway",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Sandwiches",
      rating: 4.3,
      deliveryTime: "10-20 min",
      minOrder: "$8",
    },
    {
      id: 5,
      name: "KFC",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Chicken",
      rating: 4.1,
      deliveryTime: "20-30 min",
      minOrder: "$12",
    },
    {
      id: 6,
      name: "Chipotle",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Mexican",
      rating: 4.6,
      deliveryTime: "15-25 min",
      minOrder: "$10",
    },
    {
      id: 7,
      name: "Panera Bread",
      image: "/placeholder.svg?height=200&width=300",
      cuisine: "Bakery",
      rating: 4.4,
      deliveryTime: "15-25 min",
      minOrder: "$10",
    },
  ])

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== id))
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {favorites.map((restaurant) => (
        <Card key={restaurant.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 text-rose-500"
              onClick={() => removeFavorite(restaurant.id)}
            >
              <Heart className="h-5 w-5 fill-current" />
              <span className="sr-only">Remove from favorites</span>
            </Button>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
              </div>
              <div className="flex items-center bg-primary/10 px-2 py-1 rounded text-sm">
                <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                <span>{restaurant.rating}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                {restaurant.deliveryTime}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Min {restaurant.minOrder}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/restaurants/${restaurant.id}`}>View Menu</Link>
            </Button>
            <Button size="sm">Order Now</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
