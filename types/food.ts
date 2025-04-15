export interface FoodItem {
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
  calories?: number
  ingredients?: string[]
  allergens?: string[]
}
