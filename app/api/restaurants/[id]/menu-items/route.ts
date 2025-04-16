import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get all menu items for a restaurant
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const restaurantId = params.id

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const available = searchParams.get("available") === "true"

    // Build the query
    const where: any = { restaurantId }

    if (category) {
      where.category = category
    }

    if (available) {
      where.isAvailable = true
    }

    // Get menu items from database
    const menuItems = await prisma.menuItem.findMany({
      where,
      orderBy: {
        category: "asc",
      },
    })

    return NextResponse.json(menuItems)
  } catch (error) {
    console.error("Error fetching menu items:", error)
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
  }
}

// Admin: Add a new menu item to a restaurant
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const restaurantId = params.id
    const data = await request.json()
    const { name, price, image, category, isAvailable } = data

    if (!name || !price || !category) {
      return NextResponse.json(
        {
          error: "Name, price, and category are required",
        },
        { status: 400 },
      )
    }

    // Check if restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    })

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
    }

    // Create the menu item
    const menuItem = await prisma.menuItem.create({
      data: {
        restaurantId,
        name,
        price,
        image,
        category,
        isAvailable: isAvailable ?? true,
      },
    })

    return NextResponse.json({
      message: "Menu item created successfully",
      menuItem,
    })
  } catch (error) {
    console.error("Error creating menu item:", error)
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 })
  }
}
