import type { Key } from "readline"

// /types/food-item.ts
export interface FoodItem {
  id: Key | null | undefined
  name: string
  brand: string
  nutrition: string
  imageUrl: string
}
