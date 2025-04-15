import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Update driver location
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "DELIVERY_AGENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const driverId = session.user.id
    const data = await request.json()
    const { latitude, longitude } = data

    if (!latitude || !longitude) {
      return NextResponse.json(
        {
          error: "Latitude and longitude are required",
        },
        { status: 400 },
      )
    }

    // Update driver status with new location
    const driverStatus = await prisma.driverStatus.update({
      where: {
        driverId,
      },
      data: {
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
        lastLocationUpdate: new Date(),
      },
    })

    // If driver is assigned to an active order, update the order's tracking info
    const activeOrder = await prisma.order.findFirst({
      where: {
        driverId,
        status: {
          in: ["CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY"],
        },
      },
    })

    if (activeOrder) {
      // In a real app, you might store this in a separate tracking table
      // or use a real-time database like Firebase
      console.log(`Updated location for order ${activeOrder.id}`)
    }

    return NextResponse.json({
      message: "Driver location updated",
      location: {
        latitude: driverStatus.latitude,
        longitude: driverStatus.longitude,
        lastUpdate: driverStatus.lastLocationUpdate,
      },
    })
  } catch (error) {
    console.error("Error updating driver location:", error)
    return NextResponse.json({ error: "Failed to update driver location" }, { status: 500 })
  }
}
