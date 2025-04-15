// /types/restaurant.ts
export interface Restaurant {
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
  phone: string
  hours: {
    weekday: string
    weekend: string
  }
  features?: {
    hasOffers: boolean
    freeDelivery: boolean
  }
}
