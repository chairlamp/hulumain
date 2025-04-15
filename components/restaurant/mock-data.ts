import type { Restaurant } from "@/types/restaurant"
import type { FoodItem } from "@/types/food"
import { mockFoodItems } from "@/components/food/mock-data"

export const mockRestaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Burger Haven",
    description: "Gourmet burgers made with premium ingredients and served with our signature sauces.",
    image: "/placeholder.svg?height=300&width=500",
    cuisineType: ["American", "Burgers"],
    rating: 4.7,
    deliveryTime: 25,
    deliveryFee: 2.99,
    minOrder: 15,
    address: "123 Main St, Anytown, USA",
    distance: 1.2,
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
    id: "r2",
    name: "Pizza Palace",
    description: "Authentic Italian pizzas baked in a wood-fired oven with fresh, locally-sourced toppings.",
    image: "/placeholder.svg?height=300&width=500",
    cuisineType: ["Italian", "Pizza"],
    rating: 4.5,
    deliveryTime: 30,
    deliveryFee: 1.99,
    minOrder: 20,
    address: "456 Oak Ave, Anytown, USA",
    distance: 2.5,
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
  {
    id: "r8",
    name: "Mediterranean Grill",
    description: "Authentic Mediterranean cuisine featuring kebabs, falafel, hummus, and fresh pita bread.",
    image: "/placeholder.svg?height=300&width=500",
    cuisineType: ["Mediterranean", "Middle Eastern"],
    rating: 4.5,
    deliveryTime: 35,
    deliveryFee: 2.99,
    minOrder: 18,
    address: "505 Cedar Ave, Anytown, USA",
    distance: 2.8,
    isOpen: true,
    phone: "(555) 890-1234",
    hours: {
      weekday: "11:00 AM - 9:00 PM",
      weekend: "11:00 AM - 10:00 PM",
    },
    features: {
      hasOffers: false,
      freeDelivery: true,
    },
  },
  {
    id: "r9",
    name: "Taco Fiesta",
    description: "Authentic Mexican street tacos, burritos, and quesadillas with homemade salsas and guacamole.",
    image: "/placeholder.svg?height=300&width=500",
    cuisineType: ["Mexican", "Latin American"],
    rating: 4.3,
    deliveryTime: 25,
    deliveryFee: 2.49,
    minOrder: 15,
    address: "606 Walnut St, Anytown, USA",
    distance: 1.5,
    isOpen: false,
    phone: "(555) 901-2345",
    hours: {
      weekday: "11:00 AM - 9:30 PM",
      weekend: "11:00 AM - 10:30 PM",
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

// Map restaurant IDs to their menu items
export const getRestaurantMenu = (restaurantId: string): FoodItem[] => {
  // This function is no longer used directly, but kept for compatibility
  return mockFoodItems.filter((item) => item.restaurantId === restaurantId)
}

// Ensure some food items are associated with each restaurant
// This is a temporary fix to ensure each restaurant has menu items
export const ensureRestaurantMenus = () => {
  // Make sure r1 (Burger Haven) has some food items
  const r1Items = mockFoodItems.filter((item) => item.restaurantId === "r1")
  if (r1Items.length === 0) {
    // Assign some food items to r1
    mockFoodItems[0].restaurantId = "r1"
    mockFoodItems[7].restaurantId = "r1"
  }

  // Make sure r2 (Pizza Palace) has some food items
  const r2Items = mockFoodItems.filter((item) => item.restaurantId === "r2")
  if (r2Items.length === 0) {
    // Assign some food items to r2
    mockFoodItems[1].restaurantId = "r2"
  }
}

// Run the function to ensure restaurant menus
ensureRestaurantMenus()
