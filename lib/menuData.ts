// lib/menuData.ts

export const menuCategories = [
  {
    id: 1,
    name: "Main Dishes",
    items: [
      {
        id: 101,
        name: "Doro Wat",
        description: "Spicy chicken stew served with injera bread",
        price: 180,
        image: "/placeholder.svg?height=100&width=100",
        options: [
          {
            id: 1,
            name: "Spice Level",
            required: true,
            items: [
              { id: 101, name: "Mild", price: 0 },
              { id: 102, name: "Medium", price: 0 },
              { id: 103, name: "Spicy", price: 0 },
            ],
          },
          {
            id: 2,
            name: "Add-ons",
            required: false,
            items: [
              { id: 201, name: "Extra Injera", price: 15 },
              { id: 202, name: "Boiled Egg", price: 20 },
              { id: 203, name: "Ayib (Ethiopian Cheese)", price: 25 },
            ],
          },
        ],
      },
      {
        id: 102,
        name: "Tibs",
        description: "Sautéed beef or lamb with vegetables and Ethiopian spices",
        price: 160,
        image: "/placeholder.svg?height=100&width=100",
        options: [
          {
            id: 3,
            name: "Meat Type",
            required: true,
            items: [
              { id: 301, name: "Beef", price: 0 },
              { id: 302, name: "Lamb", price: 20 },
            ],
          },
        ],
      },
      {
        id: 103,
        name: "Kitfo",
        description: "Minced raw beef seasoned with mitmita and niter kibbeh",
        price: 190,
        image: "/placeholder.svg?height=100&width=100",
        options: [
          {
            id: 4,
            name: "Preparation",
            required: true,
            items: [
              { id: 401, name: "Raw (Traditional)", price: 0 },
              { id: 402, name: "Leb Leb (Slightly Cooked)", price: 0 },
              { id: 403, name: "Well Done", price: 0 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Vegetarian Dishes",
    items: [
      {
        id: 201,
        name: "Shiro",
        description: "Spiced chickpea stew served with injera",
        price: 120,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 202,
        name: "Misir Wat",
        description: "Spicy red lentil stew served with injera",
        price: 110,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 203,
        name: "Beyainatu",
        description: "Vegetarian combination platter with various dishes",
        price: 150,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 3,
    name: "Beverages",
    items: [
      {
        id: 301,
        name: "Ethiopian Coffee",
        description: "Traditional Ethiopian coffee ceremony experience",
        price: 50,
        image: "/placeholder.svg?height=100&width=100",
        options: [
          {
            id: 5,
            name: "Size",
            required: true,
            items: [
              { id: 501, name: "Small", price: 0 },
              { id: 502, name: "Medium", price: 15 },
              { id: 503, name: "Large", price: 30 },
            ],
          },
        ],
      },
      {
        id: 302,
        name: "Tej",
        description: "Traditional Ethiopian honey wine",
        price: 70,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 303,
        name: "Mango Juice",
        description: "Fresh mango juice",
        price: 45,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 4,
    name: "Sides",
    items: [
      {
        id: 401,
        name: "Extra Injera",
        description: "Traditional Ethiopian sourdough flatbread",
        price: 30,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 402,
        name: "Ayib",
        description: "Ethiopian cottage cheese",
        price: 40,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
]

export const mockRestaurants = [
  {
    id: 1,
    name: "Addis Ababa House",
  },
  {
    id: 2,
    name: "Habesha Restaurant",
  },
  {
    id: 3,
    name: "Lalibela Cuisine",
  },
  {
    id: 4,
    name: "Axum Traditional",
  },
]
