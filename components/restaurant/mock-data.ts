import type { Restaurant } from "@/types/restaurant"
import type { FoodItem } from "@/types/food"
import { mockFoodItems } from "@/components/food/mock-data"

export const mockRestaurants: Restaurant[] = [
  {
    id: "clz1",  // Updated restaurant ID
    name: "Burger Palace",  // Updated restaurant name
    description: "Best burgers in town",  // Updated description
    image: "/placeholder.svg?height=200&width=200",  // Updated image
    cuisineType: ["Fast Food", "Burgers"],  // Updated cuisine type
    rating: 4.5,  // Updated rating
    deliveryTime: 30,  // Updated delivery time
    deliveryFee: 2.99,
    minOrder: 30,  // Updated minimum order
    address: "456 Burger Ave, New York, NY 10002",  // Updated address
    distance: 1.5,  // Adjusted for the new address
    isOpen: true,
    phone: "(555) 123-4567",
    hours: {
      weekday: "11:00 AM - 10:00 PM",
      weekend: "11:00 AM - 11:00 PM",
    },
    features: {
      hasOffers: true,
      freeDelivery: false,
    },
  },
  {
    id: "clz2",  // Updated restaurant ID
    name: "Pizza Heaven",  // Updated restaurant name
    description: "Authentic Italian pizzas",  // Updated description
    image: "/placeholder.svg?height=200&width=200",  // Updated image
    cuisineType: ["Italian"],  // Updated cuisine type
    rating: 4.7,  // Updated rating
    deliveryTime: 45,  // Updated delivery time
    deliveryFee: 3.99,
    minOrder: 25,  // Adjusted minimum order
    address: "789 Pizza St, New York, NY 10003",  // Updated address
    distance: 2.0,  // Adjusted for the new address
    isOpen: true,
    phone: "(555) 234-5678",
    hours: {
      weekday: "12:00 PM - 10:00 PM",
      weekend: "12:00 PM - 12:00 AM",
    },
    features: {
      hasOffers: false,
      freeDelivery: true,
    },
  },
  {
    id: "r3",
    name: "Thai Delight",
    description: "Traditional Thai cuisine with authentic flavors and spices, prepared by experienced chefs.",
    image: "/placeholder.svg?height=300&width=500",
    cuisineType: ["Thai", "Asian"],
    rating: 4.3,
    deliveryTime: 35,
    deliveryFee: 3.99,
    minOrder: 25,
    address: "789 Pine St, Anytown, USA",
    distance: 3.1,
    isOpen: true,
    phone: "(555) 345-6789",
    hours: {
      weekday: "11:30 AM - 9:30 PM",
      weekend: "12:00 PM - 10:00 PM",
    },
    features: {
      hasOffers: true,
      freeDelivery: false,
    },
  },
  {
    id: "r4",
    name: "Fresh Greens",
    description: "Healthy salads, wraps, and bowls made with organic ingredients for the health-conscious eater.",
    image: "/placeholder.svg?height=300&width=500",
    cuisineType: ["Healthy", "Salads"],
    rating: 4.2,
    deliveryTime: 20,
    deliveryFee: 2.49,
    minOrder: 15,
    address: "101 Maple Dr, Anytown, USA",
    distance: 1.8,
    isOpen: true,
    phone: "(555) 456-7890",
    hours: {
      weekday: "10:00 AM - 8:00 PM",
      weekend: "10:00 AM - 6:00 PM",
    },
    features: {
      hasOffers: false,
      freeDelivery: true,
    },
  },
  {
    id: "r5",
    name: "Sweet Treats",
    description: "Delicious desserts, pastries, and ice cream for those with a sweet tooth.",
    image: "/placeholder.svg?height=300&width=500",
    cuisineType: ["Desserts", "Bakery"],
    rating: 4.8,
    deliveryTime: 25,
    deliveryFee: 3.49,
    minOrder: 12,
    address: "202 Cherry Ln, Anytown, USA",
    distance: 2.2,
    isOpen: true,
    phone: "(555) 567-8901",
    hours: {
      weekday: "11:00 AM - 9:00 PM",
      weekend: "11:00 AM - 10:00 PM",
    },
    features: {
      hasOffers: true,
      freeDelivery: false,
    },
  },
  {
    id: "r6",
    name: "Sushi Spot",
    description: "Fresh and creative sushi rolls, sashimi, and Japanese specialties prepared by skilled chefs.",
    image: "/placeholder.svg?height=300&width=500",
    cuisineType: ["Japanese", "Sushi"],
    rating: 4.6,
    deliveryTime: 40,
    deliveryFee: 4.99,
    minOrder: 30,
    address: "303 Birch Blvd, Anytown, USA",
    distance: 3.5,
    isOpen: false,
    phone: "(555) 678-9012",
    hours: {
      weekday: "12:00 PM - 9:30 PM",
      weekend: "12:00 PM - 10:30 PM",
    },
    features: {
      hasOffers: false,
      freeDelivery: true,
    },
  },
  {
    id: "r7",
    name: "Smokey's BBQ",
    description: "Slow-smoked meats and classic Southern sides with homemade BBQ sauces.",
    image: "/placeholder.svg?height=300&width=500",
    cuisineType: ["BBQ", "American"],
    rating: 4.4,
    deliveryTime: 45,
    deliveryFee: 3.99,
    minOrder: 20,
    address: "404 Elm St, Anytown, USA",
    distance: 4.2,
    isOpen: true,
    phone: "(555) 789-0123",
    hours: {
      weekday: "11:30 AM - 9:00 PM",
      weekend: "11:30 AM - 10:00 PM",
    },
    features: {
      hasOffers: true,
      freeDelivery: false,
    },
  },
]

export const restaurantCategories = ["All", "Featured", "Nearest", "Top Rated", "New", "Special Offers"]

export const cuisineTypes = [
  "American",
  "Asian",
  "BBQ",
  "Bakery",
  "Burgers",
  "Desserts",
  "Healthy",
  "Italian",
  "Japanese",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Pizza",
  "Salads",
  "Sushi",
  "Thai",
]

