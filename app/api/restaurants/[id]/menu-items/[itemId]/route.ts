import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get a specific menu item
export async function GET(request: NextRequest, { params }: { params: { id: string; itemId: string } }) {
  try {
    const { id: restaurantId, itemId } = params

    // Get the menu item from database
    const menuItem = await prisma.menuItem.findFirst({
      where: {
        id: itemId,
        restaurantId,
      },
    })

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    return NextResponse.json(menuItem)
  } catch (error) {
    console.error("Error fetching menu item:", error)
    return NextResponse.json({ error: "Failed to fetch menu item" }, { status: 500 })
  }
}

// Admin: Update a menu item
export async function PUT(request: NextRequest, { params }: { params: { id: string; itemId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: restaurantId, itemId } = params
    const data = await request.json()
    const { name, price, image, category, isAvailable } = data

    // Check if menu item exists and belongs to the restaurant
    const menuItem = await prisma.menuItem.findFirst({
      where: {
        id: itemId,
        restaurantId,
      },
    })

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    // Update the menu item
    const updatedMenuItem = await prisma.menuItem.update({
      where: { id: itemId },
      data: {
        name,
        price,
        image,
        category,
        isAvailable,
      },
    })

    return NextResponse.json({
      message: "Menu item updated successfully",
      menuItem: updatedMenuItem,
    })
  } catch (error) {
    console.error("Error updating menu item:", error)
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
  }
}

// Admin: Delete a menu item
export async function DELETE(request: NextRequest, { params }: { params: { id: string; itemId: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id: restaurantId, itemId } = params

    // Check if menu item exists and belongs to the restaurant
    const menuItem = await prisma.menuItem.findFirst({
      where: {
        id: itemId,
        restaurantId,
      },
    })

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    // Delete the menu item
    await prisma.menuItem.delete({
      where: { id: itemId },
    })

    return NextResponse.json({
      message: "Menu item deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting menu item:", error)
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
  }
}
