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
    const cart = cartCookie ? JSON.parse(cartCookie.value) : { items: [] }

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

// Add item to cart
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { menuItemId, quantity, specialInstructions } = data

    if (!menuItemId || !quantity) {
      return NextResponse.json({ error: "Menu item ID and quantity are required" }, { status: 400 })
    }

    // Get the menu item details
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
    })

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    // In a real implementation, you would store the cart in a database
    // For now, we'll use cookies as a simple implementation
    const cartCookie = request.cookies.get("cart")
    const cart = cartCookie ? JSON.parse(cartCookie.value) : { items: [] }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex((item: any) => item.menuItemId === menuItemId)

    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // Add new item to cart
      cart.items.push({
        menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
        specialInstructions: specialInstructions || "",
      })
    }

    // Calculate cart total
    cart.total = cart.items.reduce((total: number, item: any) => {
      return total + item.price * item.quantity
    }, 0)

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
