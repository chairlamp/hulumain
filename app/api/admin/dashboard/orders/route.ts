import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Admin: Get recent orders for dashboard
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Get recent orders
    const recentOrders = await prisma.order.findMany({
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        restaurant: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return NextResponse.json(recentOrders)
  } catch (error) {
    console.error("Error fetching recent orders:", error)
    return NextResponse.json({ error: "Failed to fetch recent orders" }, { status: 500 })
  }
}
