import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Update driver status (online/offline)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "DELIVERY_AGENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const driverId = session.user.id
    const data = await request.json()
    const { isOnline, latitude, longitude } = data

    if (typeof isOnline !== "boolean") {
      return NextResponse.json(
        {
          error: "isOnline is required and must be a boolean",
        },
        { status: 400 },
      )
    }

    // Update or create driver status
    const driverStatus = await prisma.driverStatus.upsert({
      where: {
        driverId,
      },
      update: {
        isOnline,
        latitude: latitude ? Number.parseFloat(latitude) : null,
        longitude: longitude ? Number.parseFloat(longitude) : null,
        lastLocationUpdate: new Date(),
      },
      create: {
        driverId,
        isOnline,
        latitude: latitude ? Number.parseFloat(latitude) : null,
        longitude: longitude ? Number.parseFloat(longitude) : null,
        lastLocationUpdate: new Date(),
      },
    })

    return NextResponse.json({
      message: `Driver status updated to ${isOnline ? "online" : "offline"}`,
      driverStatus,
    })
  } catch (error) {
    console.error("Error updating driver status:", error)
    return NextResponse.json({ error: "Failed to update driver status" }, { status: 500 })
  }
}

// Get driver status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const driverId = searchParams.get("driverId") || session.user.id

    // Check if user is authorized to view this driver's status
    if (driverId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const driverStatus = await prisma.driverStatus.findUnique({
      where: {
        driverId,
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    })

    if (!driverStatus) {
      return NextResponse.json({ error: "Driver status not found" }, { status: 404 })
    }

    return NextResponse.json(driverStatus)
  } catch (error) {
    console.error("Error fetching driver status:", error)
    return NextResponse.json({ error: "Failed to fetch driver status" }, { status: 500 })
  }
}
