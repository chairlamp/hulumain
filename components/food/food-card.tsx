"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface FoodCardProps {
  id: string
  name: string
  description: string
  price: number
  image: string
  restaurant: string
  restaurantId: string
  category: string
  rating: number
  preparationTime: number
  isVegetarian?: boolean
  isVegan?: boolean
  isGlutenFree?: boolean
  className?: string
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

export function FoodCard({
  id,
  name,
  description,
  price,
  image,
  restaurant,
  restaurantId,
  category,
  rating,
  preparationTime,
  isVegetarian = false,
  isVegan = false,
  isGlutenFree = false,
  className,
  isFavorite = false,
  onToggleFavorite,
}: FoodCardProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    const foodItem = {
      id,
      name,
      description,
      price,
      image,
      restaurant,
      restaurantId,
      category,
      rating,
      preparationTime,
      isVegetarian,
      isVegan,
      isGlutenFree,
    }

    addToCart(foodItem, 1)

    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    })
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative">
        <Link href={`/restaurants/${restaurantId}/food/${id}`}>
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90"
          onClick={onToggleFavorite}
        >
          <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-500")} />
          <span className="sr-only">Add to favorites</span>
        </Button>
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {isVegetarian && (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Veg
            </Badge>
          )}
          {isVegan && (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              Vegan
            </Badge>
          )}
          {isGlutenFree && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
              GF
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/restaurants/${restaurantId}/food/${id}`} className="hover:underline">
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          </Link>
          <span className="font-bold">${price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <Link href={`/restaurants/${restaurantId}`} className="hover:underline">
            {restaurant}
          </Link>
          <div className="flex items-center gap-2">
            <span className="flex items-center">⭐ {rating.toFixed(1)}</span>
            <span>{preparationTime} min</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
