"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Heart, MapPin, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RestaurantCardProps {
  id: string
  name: string
  description: string
  image: string
  cuisineType: string[]
  rating: number
  deliveryTime: number
  deliveryFee: number
  minOrder: number
  address: string
  distance: number
  isOpen: boolean
  isFavorite?: boolean
  className?: string
  onToggleFavorite?: () => void
}

export function RestaurantCard({
  id,
  name,
  description,
  image,
  cuisineType,
  rating,
  deliveryTime,
  deliveryFee,
  minOrder,
  address,
  distance,
  isOpen,
  isFavorite = false,
  className,
  onToggleFavorite,
}: RestaurantCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative">
        <Link href={`/restaurants/${id}`}>
          <div className="aspect-[16/9] relative overflow-hidden">
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
        <div className="absolute bottom-2 left-2">
          <Badge variant={isOpen ? "default" : "secondary"} className="text-xs">
            {isOpen ? "Open" : "Closed"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/restaurants/${id}`} className="hover:underline">
            <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          </Link>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="font-medium">{rating?.toFixed(1) ?? "N/A"}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {Array.isArray(cuisineType) &&
            cuisineType.map((cuisine) => (
              <Badge key={cuisine} variant="outline" className="text-xs">
                {cuisine}
              </Badge>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{deliveryTime ?? "N/A"} min</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{typeof distance === "number" ? distance.toFixed(1) : "N/A"} mi</span>
          </div>
          <div>Delivery: ${typeof deliveryFee === "number" ? deliveryFee.toFixed(2) : "N/A"}</div>
          <div>Min order: ${typeof minOrder === "number" ? minOrder.toFixed(2) : "N/A"}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/restaurants/${id}`}>View Menu</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
