import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get available orders for drivers
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "DELIVERY_AGENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    // Get orders that are ready for pickup and not assigned to any driver
    const orders = await prisma.order.findMany({
      where: {
        status: "READY",
        driverId: null,
      },
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
        address: true,
      },
      orderBy: {
        createdAt: "asc", // Oldest first
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const totalOrders = await prisma.order.count({
      where: {
        status: "READY",
        driverId: null,
      },
    })

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
    console.error("Error fetching available orders:", error)
    return NextResponse.json({ error: "Failed to fetch available orders" }, { status: 500 })
  }
}
