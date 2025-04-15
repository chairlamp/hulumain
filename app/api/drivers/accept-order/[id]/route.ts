import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Driver: Accept an order
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "DELIVERY_AGENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const driverId = session.user.id
    const orderId = params.id

    // Check if order exists and is available for pickup
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (order.status !== "READY") {
      return NextResponse.json(
        {
          error: "Order is not ready for pickup",
        },
        { status: 400 },
      )
    }

    if (order.driverId) {
      return NextResponse.json(
        {
          error: "Order is already assigned to a driver",
        },
        { status: 400 },
      )
    }

    // Assign the order to the driver and update status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        driverId,
        status: "PICKED_UP",
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
      },
    })

    return NextResponse.json({
      message: "Order accepted successfully",
      order: updatedOrder,
    })
  } catch (error) {
    console.error("Error accepting order:", error)
    return NextResponse.json({ error: "Failed to accept order" }, { status: 500 })
  }
}
