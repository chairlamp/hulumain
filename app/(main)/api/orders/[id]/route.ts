import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get a specific order
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const orderId = params.id

    // Get the order from database
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
        address: true,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if the user is authorized to view this order
    if (order.userId !== userId && session.user.role !== "ADMIN" && session.user.role !== "DELIVERY_AGENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

// Update order status
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderId = params.id
    const data = await request.json()
    const { status } = data

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    // Get the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check authorization based on the status change
    const userRole = session.user.role
    const userId = session.user.id

    // Only admin or the assigned delivery agent can update certain statuses
    if ((status === "PREPARING" || status === "READY" || status === "CANCELLED") && userRole !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized to update this status" }, { status: 403 })
    }

    if ((status === "PICKED_UP" || status === "DELIVERED") && userRole !== "DELIVERY_AGENT" && userRole !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized to update this status" }, { status: 403 })
    }

    // Update the order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: {
        restaurant: true,
        items: {
          include: {
            menuItem: true,
          },
        },
        address: true,
      },
    })

    return NextResponse.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

// Cancel an order
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const orderId = params.id

    // Get the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if the user is authorized to cancel this order
    if (order.userId !== userId && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Check if the order can be cancelled (e.g., not already delivered)
    if (order.status === "DELIVERED" || order.status === "PICKED_UP") {
      return NextResponse.json(
        {
          error: "Cannot cancel an order that has been picked up or delivered",
        },
        { status: 400 },
      )
    }

    // Update the order status to cancelled
    const cancelledOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    })

    return NextResponse.json({
      message: "Order cancelled successfully",
      order: cancelledOrder,
    })
  } catch (error) {
    console.error("Error cancelling order:", error)
    return NextResponse.json({ error: "Failed to cancel order" }, { status: 500 })
  }
}
