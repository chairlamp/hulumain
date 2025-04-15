"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Heart, Minus, Plus, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { FoodItem } from "@/types/food"

interface FoodDetailsProps {
  food: FoodItem
  relatedFoods?: FoodItem[]
}

export function FoodDetails({ food, relatedFoods = [] }: FoodDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [specialInstructions, setSpecialInstructions] = useState("")

  const { addToCart } = useCart()
  const { toast } = useToast()

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const toggleFavorite = () => setIsFavorite((prev) => !prev)

  const handleAddToCart = () => {
    addToCart(food, quantity, specialInstructions)

    toast({
      title: "Added to cart",
      description: `${quantity} × ${food.name} added to your cart`,
    })
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Food Image */}
        <div className="relative aspect-square md:aspect-auto md:h-[500px] rounded-xl overflow-hidden">
          <Image src={food.image || "/placeholder.svg"} alt={food.name} fill className="object-cover" />
        </div>

        {/* Food Info */}
        <div className="flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{food.name}</h1>
              <Link href={`/restaurants/${food.restaurantId}`} className="text-muted-foreground hover:underline">
                {food.restaurant}
              </Link>
            </div>
            <Button variant="outline" size="icon" className="rounded-full" onClick={toggleFavorite}>
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-medium">{food.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              <span>{food.preparationTime} min</span>
            </div>
            <div className="flex gap-1">
              {food.isVegetarian && (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Vegetarian
                </Badge>
              )}
              {food.isVegan && (
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Vegan
                </Badge>
              )}
              {food.isGlutenFree && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Gluten Free
                </Badge>
              )}
            </div>
          </div>

          <p className="mt-6 text-muted-foreground">{food.description}</p>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">${food.price.toFixed(2)}</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-r-none h-10 w-10"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="w-12 text-center font-medium">{quantity}</div>
                <Button variant="ghost" size="icon" className="rounded-l-none h-10 w-10" onClick={increaseQuantity}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <Button className="px-8" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="special-instructions" className="block text-sm font-medium mb-2">
              Special Instructions
            </label>
            <Textarea
              id="special-instructions"
              placeholder="Any special requests or allergies?"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="resize-none"
            />
          </div>

          <Separator className="my-6" />

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-muted-foreground">Category</h4>
                    <p>{food.category}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-muted-foreground">Calories</h4>
                    <p>{food.calories || "Not specified"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-muted-foreground">Allergens</h4>
                    <p>{food.allergens?.join(", ") || "None specified"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-muted-foreground">Delivery</h4>
                    <div className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      <span>Free delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ingredients" className="mt-4">
              <ul className="list-disc pl-5 space-y-1">
                {food.ingredients?.map((ingredient, index) => <li key={index}>{ingredient}</li>) || (
                  <p>No ingredients information available</p>
                )}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <p className="text-muted-foreground">No reviews yet.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
