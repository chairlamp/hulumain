"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveDeliveryCard } from "./active-delivery-card"
import { UpcomingOrderCard } from "./upcoming-order-card"
import { useEffect, useState } from "react"

export function CurrentOrdersList() {
  const [availableOrders, setAvailableOrders] = useState([])
  const [currentOrders, setCurrentOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [accepting, setAccepting] = useState(null)

  const fetchAvailableOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/drivers/available-orders")

      if (!response.ok) throw new Error("Failed to fetch available orders")

      const data = await response.json()
      setAvailableOrders(data.orders)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching available orders:", error)
      setError("Failed to load available orders. Please try again.")
      setLoading(false)
    }
  }

  const acceptOrder = async (orderId) => {
    try {
      setAccepting(orderId)
      const response = await fetch(`/api/drivers/accept-order/${orderId}`, {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to accept order")

      const data = await response.json()

      // Remove from available orders and add to current orders
      setAvailableOrders(availableOrders.filter((order) => order.id !== orderId))
      setCurrentOrders([...currentOrders, data.order])
      setAccepting(null)

      return data
    } catch (error) {
      console.error("Error accepting order:", error)
      setAccepting(null)
      throw error
    }
  }

  useEffect(() => {
    fetchAvailableOrders()

    // Set up polling to check for new orders
    const interval = setInterval(fetchAvailableOrders, 30000) // every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <ActiveDeliveryCard />
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6 space-y-4">
          <UpcomingOrderCard
            id="ORD-1234"
            restaurant="Burger King"
            customer="Alice Johnson"
            time="2:30 PM"
            address="123 Main St, Apt 4B"
            amount="$18.50"
            distance="2.3 mi"
          />
          <UpcomingOrderCard
            id="ORD-1235"
            restaurant="Pizza Hut"
            customer="Bob Smith"
            time="3:45 PM"
            address="456 Oak Ave"
            amount="$24.99"
            distance="3.1 mi"
          />
          <UpcomingOrderCard
            id="ORD-1236"
            restaurant="Taco Bell"
            customer="Charlie Brown"
            time="Tomorrow, 12:15 PM"
            address="789 Pine St"
            amount="$15.75"
            distance="1.8 mi"
          />
        </TabsContent>

        <TabsContent value="available" className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {availableOrders.map((order) => (
              <AvailableOrderCard
                key={order.id}
                restaurant={order.restaurant}
                pickupAddress={order.pickupAddress}
                deliveryAddress={order.deliveryAddress}
                distance={order.distance}
                estimatedTime={order.estimatedTime}
                amount={order.amount}
                onAccept={() => acceptOrder(order.id)}
                isAccepting={accepting === order.id}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface AvailableOrderCardProps {
  restaurant: string
  pickupAddress: string
  deliveryAddress: string
  distance: string
  estimatedTime: string
  amount: string
  onAccept: () => void
  isAccepting: boolean
}

function AvailableOrderCard({
  restaurant,
  pickupAddress,
  deliveryAddress,
  distance,
  estimatedTime,
  amount,
  onAccept,
  isAccepting,
}: AvailableOrderCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex justify-between">
        <h3 className="font-medium">{restaurant}</h3>
        <span className="text-sm font-bold">{amount}</span>
      </div>

      <div className="mt-2 space-y-2 text-sm">
        <div>
          <div className="text-muted-foreground">Pickup:</div>
          <div>{pickupAddress}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Delivery:</div>
          <div>{deliveryAddress}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex gap-3">
          <span>{distance}</span>
          <span>{estimatedTime}</span>
        </div>
        <button
          className="rounded-md bg-primary px-3 py-1 text-primary-foreground"
          onClick={onAccept}
          disabled={isAccepting}
        >
          {isAccepting ? "Accepting..." : "Accept"}
        </button>
      </div>
    </div>
  )
}
