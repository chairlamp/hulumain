// app\api\orders\[id]\track\route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get tracking information for an order
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderId = params.id

    // Get the order
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
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
        driver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if user is authorized to view this order
    if (order.userId !== session.user.id && order.driverId !== session.user.id && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get driver location if available
    let driverLocation = null
    if (order.driverId) {
      const driverStatus = await prisma.driverStatus.findUnique({
        where: {
          driverId: order.driverId,
        },
      })

      if (driverStatus && driverStatus.latitude && driverStatus.longitude) {
        driverLocation = {
          latitude: driverStatus.latitude,
          longitude: driverStatus.longitude,
          lastUpdate: driverStatus.lastLocationUpdate,
        }
      }
    }

    // Calculate estimated delivery time
    // In a real app, this would be based on distance, traffic, etc.
    const estimatedDeliveryTime = new Date()
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 30)

    // Return tracking information
    return NextResponse.json({
      order: {
        id: order.id,
        status: order.status,
        placedAt: order.placedAt,
        preparedAt: order.preparedAt,
        pickedUpAt: order.pickedUpAt,
        deliveredAt: order.deliveredAt,
        estimatedDeliveryTime,
      },
      restaurant: order.restaurant,
      deliveryAddress: order.address,
      driver: order.driver,
      driverLocation,
    })
  } catch (error) {
    console.error("Error fetching order tracking:", error)
    return NextResponse.json({ error: "Failed to fetch order tracking" }, { status: 500 })
  }
}
