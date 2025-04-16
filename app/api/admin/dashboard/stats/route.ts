import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Admin: Get dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "day" // day, week, month, year

    // Calculate date range based on period
    const now = new Date()
    const startDate = new Date()

    switch (period) {
      case "day":
        startDate.setDate(now.getDate() - 1)
        break
      case "week":
        startDate.setDate(now.getDate() - 7)
        break
      case "month":
        startDate.setMonth(now.getMonth() - 1)
        break
      case "year":
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 1)
    }

    // Get total orders
    const totalOrders = await prisma.order.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
    })

    // Get total revenue
    const revenueResult = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
      _sum: {
        total: true,
      },
    })
    const totalRevenue = revenueResult._sum.total || 0

    // Get total customers
    const totalCustomers = await prisma.user.count({
      where: {
        role: "CUSTOMER",
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
    })

    // Get total restaurants
    const totalRestaurants = await prisma.restaurant.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: now,
        },
      },
    })

    // Get orders by status
    const ordersByStatus = await prisma.$queryRaw`
      SELECT status, COUNT(*) as count
      FROM "Order"
      WHERE "createdAt" >= ${startDate} AND "createdAt" <= ${now}
      GROUP BY status
    `

    return NextResponse.json({
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalRestaurants,
      ordersByStatus,
      period,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
  }
}
