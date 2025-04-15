import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Driver: Complete an order
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "DELIVERY_AGENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const driverId = session.user.id
    const orderId = params.id

    // Check if order exists and is assigned to this driver
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        driverId,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found or not assigned to you" }, { status: 404 })
    }

    if (order.status !== "PICKED_UP") {
      return NextResponse.json(
        {
          error: "Order is not in picked up status",
        },
        { status: 400 },
      )
    }

    // Update order status to delivered
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "DELIVERED",
        deliveredAt: new Date(),
      },
    })

    return NextResponse.json({
      message: "Order completed successfully",
      order: updatedOrder,
    })
  } catch (error) {
    console.error("Error completing order:", error)
    return NextResponse.json({ error: "Failed to complete order" }, { status: 500 })
  }
}
