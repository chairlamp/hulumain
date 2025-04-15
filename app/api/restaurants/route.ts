import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

// Get all restaurants with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    // Build the query
    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (category) {
      // Assuming restaurants have categories
      where.category = category
    }

    // Get restaurants from database
    const restaurants = await prisma.restaurant.findMany({
      where,
      orderBy: {
        name: "asc",
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const totalRestaurants = await prisma.restaurant.count({ where })

    return NextResponse.json({
      restaurants,
      pagination: {
        total: totalRestaurants,
        page,
        limit,
        pages: Math.ceil(totalRestaurants / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching restaurants:", error)
    return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 })
  }
}

// Admin: Create a new restaurant
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { name, description, address, category } = data

    if (!name || !address) {
      return NextResponse.json({ error: "Name and address are required" }, { status: 400 })
    }

    // Create the restaurant
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        description,
        address,
        category,
      },
    })

    return NextResponse.json({
      message: "Restaurant created successfully",
      restaurant,
    })
  } catch (error) {
    console.error("Error creating restaurant:", error)
    return NextResponse.json({ error: "Failed to create restaurant" }, { status: 500 })
  }
}
