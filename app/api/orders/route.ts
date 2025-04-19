// app\api\orders\route.ts

import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get all orders for the current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    // Build the query
    const where: any = { userId }
    if (status) {
      where.status = status
    }

    // Get orders from database
    const orders = await prisma.order.findMany({
      where,
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        items: {
          include: {
            menuItem: true,
          },
        },
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const totalOrders = await prisma.order.count({ where })

    return NextResponse.json({
      orders,
      pagination: {
        total: totalOrders,
        page,
        limit,
        pages: Math.ceil(totalOrders / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

// Create a new order
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const data = await request.json()
    const { restaurantId, addressId, items } = data

    if (!restaurantId || !addressId || !items || items.length === 0) {
      return NextResponse.json(
        {
          error: "Restaurant ID, address ID, and at least one item are required",
        },
        { status: 400 },
      )
    }

    // Verify restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    })

    if (!restaurant) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: 404 })
    }

    // Verify address exists and belongs to user
    const address = await prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
      },
    })

    if (!address) {
      return NextResponse.json({ error: "Address not found" }, { status: 404 })
    }

    // Verify menu items and calculate total
    const menuItemIds = items.map((item: any) => item.menuItemId)
    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: { in: menuItemIds },
        restaurantId,
      },
    })

    if (menuItems.length !== menuItemIds.length) {
      return NextResponse.json({ error: "One or more menu items not found" }, { status: 404 })
    }

    // Calculate total price
    let total = 0
    const orderItems = items.map((item: any) => {
      const menuItem = menuItems.find((mi) => mi.id === item.menuItemId)
      if (!menuItem) {
        throw new Error(`Menu item ${item.menuItemId} not found`)
      }

      const itemTotal = menuItem.price * item.quantity
      total += itemTotal

      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: menuItem.price,
      }
    })

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId,
        restaurantId,
        addressId,
        total,
        items: {
          create: orderItems,
        },
      },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
        address: true,
      },
    })

    return NextResponse.json({
      message: "Order created successfully",
      order,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
