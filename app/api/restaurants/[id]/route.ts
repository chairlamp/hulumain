import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get a specific restaurant with its menu items
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const restaurantId = params.id

    // Get the restaurant from database with menu items
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
      include: {
        menuItems: {
          where: { isAvailable: true },
          orderBy: { category: "asc" },
        },
      },
    })

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
    }

    return NextResponse.json(restaurant)
  } catch (error) {
    console.error("Error fetching restaurant:", error)
    return NextResponse.json({ error: "Failed to fetch restaurant" }, { status: 500 })
  }
}

// Admin: Update a restaurant
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const restaurantId = params.id
    const data = await request.json()
    const { name, description, address, category } = data

    // Get the restaurant
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    })

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
    }

    // Update the restaurant
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        name,
        description,
        address,
        category,
      },
    })

    return NextResponse.json({
      message: "Restaurant updated successfully",
      restaurant: updatedRestaurant,
    })
  } catch (error) {
    console.error("Error updating restaurant:", error)
    return NextResponse.json({ error: "Failed to update restaurant" }, { status: 500 })
  }
}

// Admin: Delete a restaurant
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const restaurantId = params.id

    // Check if restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    })

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
    }

    // Delete the restaurant (this will cascade delete menu items)
    await prisma.restaurant.delete({
      where: { id: restaurantId },
    })

    return NextResponse.json({
      message: "Restaurant deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting restaurant:", error)
    return NextResponse.json({ error: "Failed to delete restaurant" }, { status: 500 })
  }
}
