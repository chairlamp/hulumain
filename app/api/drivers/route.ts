import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// Admin: Get all drivers with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    // Build the query
    const where: any = { role: "DELIVERY_AGENT" }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    // Get drivers from database
    const drivers = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const totalDrivers = await prisma.user.count({ where })

    return NextResponse.json({
      drivers,
      pagination: {
        total: totalDrivers,
        page,
        limit,
        pages: Math.ceil(totalDrivers / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching drivers:", error)
    return NextResponse.json({ error: "Failed to fetch drivers" }, { status: 500 })
  }
}

// Admin: Create a new driver
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { name, email, password } = data

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "Name, email, and password are required",
        },
        { status: 400 },
      )
    }

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User with this email already exists",
        },
        { status: 400 },
      )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the driver
    const driver = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "DELIVERY_AGENT",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        // Don't include password
      },
    })

    return NextResponse.json({
      message: "Driver created successfully",
      driver,
    })
  } catch (error) {
    console.error("Error creating driver:", error)
    return NextResponse.json({ error: "Failed to create driver" }, { status: 500 })
  }
}
