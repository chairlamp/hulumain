import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get cart contents
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get cart from session storage or database
    // For now, we'll use a simple implementation that gets cart from cookies
    const cartCookie = request.cookies.get("cart")
    let cart = { items: [] }

    if (cartCookie) {
      try {
        cart = JSON.parse(cartCookie.value)
      } catch (error) {
        console.error("Failed to parse cart cookie:", error)
      }
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Debug: Log session to check if it's valid
    console.log("Session data:", session)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if the request body is empty before attempting to parse
    const rawBody = await request.text()
    if (!rawBody) {
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 })
    }

    // Attempt to parse the body, wrapped in a try-catch to handle invalid JSON
    let data
    try {
      data = JSON.parse(rawBody)
    } catch (error) {
      console.error("Error parsing JSON:", error)
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    const { menuItemId, quantity, specialInstructions } = data

    // Debug: Log the incoming data
    console.log("Received data:", data)

    if (!menuItemId || !quantity) {
      return NextResponse.json({ error: "Menu item ID and quantity are required" }, { status: 400 })
    }

    // Convert the menuItemId to string
    const menuItemIdAsString = String(menuItemId)

    // Debug: Log the menuItemId
    console.log("Searching for menu item with ID:", menuItemIdAsString)

    // Get the menu item details
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: menuItemIdAsString },  // Use string value here
    })

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    // Get current cart
    const cartCookie = request.cookies.get("cart")
    let cart = { items: [] } // Default empty cart

    if (cartCookie) {
      try {
        cart = JSON.parse(cartCookie.value)
      } catch (error) {
        console.error("Failed to parse cart cookie:", error)
      }
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex((item: any) => item.menuItemId === menuItemIdAsString)

    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // Add new item to cart
      cart.items.push({
        menuItemId: menuItemIdAsString,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
        specialInstructions: specialInstructions || "",
      })
    }

    // Debug: Log cart after updating
    console.log("Updated cart items:", cart.items)

    // Calculate cart total
    cart.total = cart.items.reduce((total: number, item: any) => {
      return total + item.price * item.quantity
    }, 0)

    // Debug: Log the cart total
    console.log("Updated cart total:", cart.total)

    // Set the updated cart in cookies
    const response = NextResponse.json({
      message: "Item added to cart",
      cart,
    })

    response.cookies.set({
      name: "cart",
      value: JSON.stringify(cart),
      httpOnly: true,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error adding item to cart:", error)
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
  }
}


// Update cart (update quantity or remove item)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { menuItemId, quantity } = data

    if (!menuItemId) {
      return NextResponse.json({ error: "Menu item ID is required" }, { status: 400 })
    }

    // Get current cart
    const cartCookie = request.cookies.get("cart")

    if (!cartCookie) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    const cart = JSON.parse(cartCookie.value)

    // Find the item in the cart
    const itemIndex = cart.items.findIndex((item: any) => item.menuItemId === menuItemId)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 })
    }

    if (quantity <= 0) {
      // Remove item from cart
      cart.items.splice(itemIndex, 1)
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity
    }

    // Recalculate cart total
    cart.total = cart.items.reduce((total: number, item: any) => {
      return total + item.price * item.quantity
    }, 0)

    // Set the updated cart in cookies
    const response = NextResponse.json({
      message: "Cart updated",
      cart,
    })

    response.cookies.set({
      name: "cart",
      value: JSON.stringify(cart),
      httpOnly: true,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

// Clear cart
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Clear the cart cookie
    const response = NextResponse.json({
      message: "Cart cleared",
    })

    response.cookies.set({
      name: "cart",
      value: JSON.stringify({ items: [], total: 0 }),
      httpOnly: true,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error clearing cart:", error)
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 })
  }
}
