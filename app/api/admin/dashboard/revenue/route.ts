import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Admin: Get revenue data for charts
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "week" // day, week, month, year

    // Calculate date range and group by format based on period
    const now = new Date()
    const startDate = new Date()
    let groupByFormat: string

    switch (period) {
      case "day":
        startDate.setDate(now.getDate() - 1)
        groupByFormat = "hour"
        break
      case "week":
        startDate.setDate(now.getDate() - 7)
        groupByFormat = "day"
        break
      case "month":
        startDate.setMonth(now.getMonth() - 1)
        groupByFormat = "day"
        break
      case "year":
        startDate.setFullYear(now.getFullYear() - 1)
        groupByFormat = "month"
        break
      default:
        startDate.setDate(now.getDate() - 7)
        groupByFormat = "day"
    }

    // Get revenue data grouped by time period
    // Note: This is a simplified example. In a real app, you would use more sophisticated SQL queries
    // that are specific to your database (PostgreSQL, MySQL, etc.)
    const revenueData = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC(${groupByFormat}, "createdAt") as time_period,
        SUM(total) as revenue
      FROM "Order"
      WHERE "createdAt" >= ${startDate} AND "createdAt" <= ${now}
      GROUP BY time_period
      ORDER BY time_period ASC
    `

    return NextResponse.json({
      revenueData,
      period,
    })
  } catch (error) {
    console.error("Error fetching revenue data:", error)
    return NextResponse.json({ error: "Failed to fetch revenue data" }, { status: 500 })
  }
}
