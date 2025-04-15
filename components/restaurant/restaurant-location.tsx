"use client"

import { useState } from "react"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MapView } from "@/components/map/map-view"
import type { Restaurant } from "@/types/restaurant"

interface RestaurantLocationProps {
  restaurant: Restaurant
  userLocation?: { lat: number; lng: number }
}

export function RestaurantLocation({ restaurant, userLocation }: RestaurantLocationProps) {
  const [showDirections, setShowDirections] = useState(false)
  const [route, setRoute] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // Mock restaurant coordinates (in a real app, these would come from the database)
  const restaurantCoordinates = {
    lat: 40.7128,
    lng: -74.006,
  }

  // Get directions from user location to restaurant
  const getDirections = async () => {
    if (!userLocation) return

    setLoading(true)
    try {
      // In a real app, you would use a directions API like Mapbox Directions API
      // For this example, we'll create a mock route
      const mockRoute = {
        id: "route",
        coordinates: [
          [userLocation.lng, userLocation.lat],
          [userLocation.lng - 0.01, userLocation.lat + 0.01],
          [userLocation.lng - 0.02, userLocation.lat],
          [restaurantCoordinates.lng, restaurantCoordinates.lat],
        ],
        color: "#3887be",
        width: 5,
      }

      setRoute(mockRoute)
      setShowDirections(true)
    } catch (error) {
      console.error("Error getting directions:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Restaurant Location</h3>
        </div>
        {userLocation && (
          <Button variant="outline" size="sm" onClick={getDirections} disabled={loading}>
            <Navigation className="mr-2 h-4 w-4" />
            {showDirections ? "Hide Directions" : "Get Directions"}
          </Button>
        )}
      </div>

      <MapView
        center={[restaurantCoordinates.lng, restaurantCoordinates.lat]}
        zoom={14}
        markers={[
                  {
                    id: "restaurant",
                    coordinates: [restaurantCoordinates.lng, restaurantCoordinates.lat] as [number, number],
                    color: "#FF0000",
                    title: restaurant.name,
                    description: restaurant.address,
                  },
                  ...(userLocation
                    ? [
                        {
                          id: "user",
                          coordinates: [userLocation.lng, userLocation.lat] as [number, number],
                          color: "#0000FF",
                          title: "Your Location",
                        },
                      ]
                    : []),
                ]}
        routes={route ? [route] : []}
        style={{ height: "300px" }}
        className="rounded-md border"
      />

      <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
        <p className="font-medium">{restaurant.name}</p>
        <p className="text-sm text-gray-600">{restaurant.address}</p>
        {restaurant.distance && <p className="mt-1 text-sm text-gray-500">{restaurant.distance} miles away</p>}
      </div>
    </div>
  )
}
