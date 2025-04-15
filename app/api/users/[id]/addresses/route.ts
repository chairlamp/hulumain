import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get all addresses for a user
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = params.id

    // Only allow users to access their own addresses or admins to access any addresses
    if (userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Get addresses from database
    const addresses = await prisma.address.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(addresses)
  } catch (error) {
    console.error("Error fetching addresses:", error)
    return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 })
  }
}

// Add a new address for a user
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = params.id

    // Only allow users to add their own addresses or admins to add any addresses
    if (userId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const data = await request.json()
    const { street, city, state, postalCode, country } = data

    if (!street || !city || !country) {
      return NextResponse.json(
        {
          error: "Street, city, and country are required",
        },
        { status: 400 },
      )
    }

    // Create the address
    const address = await prisma.address.create({
      data: {
        userId,
        street,
        city,
        state,
        postalCode,
        country,
      },
    })

    return NextResponse.json({
      message: "Address added successfully",
      address,
    })
  } catch (error) {
    console.error("Error adding address:", error)
    return NextResponse.json({ error: "Failed to add address" }, { status: 500 })
  }
}
