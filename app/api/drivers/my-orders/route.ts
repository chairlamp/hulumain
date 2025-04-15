import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get orders assigned to the current driver
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "DELIVERY_AGENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const driverId = session.user.id

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    // Build the query
    const where: any = { driverId }
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
    console.error("Error fetching driver orders:", error)
    return NextResponse.json({ error: "Failed to fetch driver orders" }, { status: 500 })
  }
}
