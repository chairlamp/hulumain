"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, Phone, Clock, CheckCircle, Truck, Package, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MapView } from "@/components/map/map-view"
import { useGeolocation } from "@/hooks/use-geolocation"
import { formatDistanceToNow } from "date-fns"

interface OrderTrackingProps {
  orderId: string
}

export function OrderTracking({ orderId }: OrderTrackingProps) {
  const router = useRouter()
  const { location } = useGeolocation()
  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)

  // Fetch tracking data
  const fetchTrackingData = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}/track`)

      if (!response.ok) {
        throw new Error("Failed to fetch tracking data")
      }

      const data = await response.json()
      setTrackingData(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching tracking data:", error)
      setError("Failed to load tracking information. Please try again.")
      setLoading(false)
    }
  }

  // Set up polling for tracking updates
  useEffect(() => {
    fetchTrackingData()

    // Refresh tracking data every 30 seconds
    const interval = setInterval(fetchTrackingData, 30000)
    setRefreshInterval(interval)

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval)
      }
    }
  }, [orderId])

  // Format status for display
  const getStatusStep = () => {
    if (!trackingData) return 0

    const { status } = trackingData.order

    switch (status) {
      case "PENDING":
        return 1
      case "CONFIRMED":
        return 2
      case "PREPARING":
        return 3
      case "OUT_FOR_DELIVERY":
        return 4
      case "DELIVERED":
        return 5
      default:
        return 0
    }
  }

  // Get markers for map
  const getMapMarkers = () => {
    if (!trackingData) return []

    const markers = [
      // Restaurant marker
      {
        id: "restaurant",
        coordinates: [-74.006, 40.7128], // Mock coordinates, would come from API
        color: "#FF0000",
        title: trackingData.restaurant.name,
        description: trackingData.restaurant.address,
      },
      // Delivery address marker
      {
        id: "delivery",
        coordinates: [-73.986, 40.7328], // Mock coordinates, would come from API
        color: "#00FF00",
        title: "Delivery Address",
        description: trackingData.deliveryAddress.street,
      },
    ]

    // Add driver marker if available
    if (trackingData.driverLocation) {
      markers.push({
        id: "driver",
        coordinates: [trackingData.driverLocation.longitude, trackingData.driverLocation.latitude],
        color: "#0000FF",
        title: "Driver Location",
        description: `Last updated: ${formatDistanceToNow(new Date(trackingData.driverLocation.lastUpdate), {
          addSuffix: true,
        })}`,
      })
    }

    return markers
  }

  // Get route for map
  const getMapRoute = () => {
    if (!trackingData || !trackingData.driverLocation) return null

    // In a real app, you would get the actual route from a directions API
    return {
      id: "delivery-route",
      coordinates: [
        [-74.006, 40.7128], // Restaurant (mock)
        [trackingData.driverLocation.longitude, trackingData.driverLocation.latitude], // Driver
        [-73.986, 40.7328], // Delivery address (mock)
      ],
      color: "#3887be",
      width: 4,
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading tracking information...</div>
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p>{error}</p>
        <Button variant="outline" size="sm" onClick={fetchTrackingData} className="mt-2">
          Try Again
        </Button>
      </div>
    )
  }

  if (!trackingData) {
    return <div>No tracking information available</div>
  }

  const statusStep = getStatusStep()

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-bold">Order Tracking</h2>
        <p className="text-muted-foreground">Order #{orderId}</p>

        {/* Status Timeline */}
        <div className="mt-6">
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute left-0 top-4 h-0.5 w-full bg-gray-200">
              <div
                className="absolute h-0.5 bg-primary transition-all duration-500"
                style={{ width: `${(statusStep / 5) * 100}%` }}
              ></div>
            </div>

            {/* Status Steps */}
            <div className="relative flex justify-between">
              {/* Confirmed */}
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    statusStep >= 1 ? "border-primary bg-primary text-white" : "border-gray-300 bg-white"
                  }`}
                >
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="mt-2 text-xs font-medium">Confirmed</span>
              </div>

              {/* Preparing */}
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    statusStep >= 2 ? "border-primary bg-primary text-white" : "border-gray-300 bg-white"
                  }`}
                >
                  <Package className="h-4 w-4" />
                </div>
                <span className="mt-2 text-xs font-medium">Preparing</span>
              </div>

              {/* Ready */}
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    statusStep >= 3 ? "border-primary bg-primary text-white" : "border-gray-300 bg-white"
                  }`}
                >
                  <Package className="h-4 w-4" />
                </div>
                <span className="mt-2 text-xs font-medium">Ready</span>
              </div>

              {/* On the Way */}
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    statusStep >= 4 ? "border-primary bg-primary text-white" : "border-gray-300 bg-white"
                  }`}
                >
                  <Truck className="h-4 w-4" />
                </div>
                <span className="mt-2 text-xs font-medium">On the Way</span>
              </div>

              {/* Delivered */}
              <div className="flex flex-col items-center">
                <div
                  className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    statusStep >= 5 ? "border-primary bg-primary text-white" : "border-gray-300 bg-white"
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="mt-2 text-xs font-medium">Delivered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Time */}
        <div className="mt-8 flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          <div>
            <p className="font-medium">Estimated Delivery Time</p>
            <p className="text-sm text-muted-foreground">
              {new Date(trackingData.order.estimatedDeliveryTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Map View */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Delivery Map</h3>
        <MapView
          center={[-74.006, 40.7128]} // Default to restaurant location
          zoom={12}
          markers={getMapMarkers()}
          routes={getMapRoute() ? [getMapRoute()] : []}
          style={{ height: "400px" }}
          className="rounded-md border"
        />
      </div>

      {/* Driver Information */}
      {trackingData.driver && statusStep >= 3 && (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium">Driver Information</h3>
          <div className="flex items-center">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
              {trackingData.driver.image ? (
                <img
                  src={trackingData.driver.image || "/placeholder.svg"}
                  alt={trackingData.driver.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-full w-full p-2 text-gray-500" />
              )}
            </div>
            <div className="ml-4">
              <p className="font-medium">{trackingData.driver.name}</p>
              <div className="mt-2 flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Driver
                </Button>
                <Button variant="outline" size="sm">
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
