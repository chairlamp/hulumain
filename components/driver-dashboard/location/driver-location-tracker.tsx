"use client"

import { useState, useEffect } from "react"
import { MapPin, Loader2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useSession } from "next-auth/react"

export function DriverLocationTracker() {
  const { data: session } = useSession()
  const { location, error, loading, watching, getCurrentLocation, startWatchingLocation, stopWatchingLocation } =
    useGeolocation()
  const [isTracking, setIsTracking] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)

  // Start/stop location tracking
  const toggleTracking = async () => {
    if (isTracking) {
      stopWatchingLocation()
      setIsTracking(false)
      await updateDriverStatus(false)
    } else {
      await getCurrentLocation()
      startWatchingLocation()
      setIsTracking(true)
      await updateDriverStatus(true)
    }
  }

  // Update driver status in the database
  const updateDriverStatus = async (isOnline: boolean) => {
    if (!session?.user?.id || !location?.coordinates) return

    try {
      const response = await fetch("/api/drivers/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isOnline,
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update driver status")
      }
    } catch (error) {
      console.error("Error updating driver status:", error)
      setUpdateError("Failed to update your status. Please try again.")
    }
  }

  // Update location in the database when it changes
  useEffect(() => {
    if (isTracking && location?.coordinates) {
      const updateLocation = async () => {
        try {
          await fetch("/api/drivers/location", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: location.coordinates.lat,
              longitude: location.coordinates.lng,
            }),
          })
        } catch (error) {
          console.error("Error updating driver location:", error)
        }
      }

      updateLocation()
    }
  }, [isTracking, location])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isTracking) {
        stopWatchingLocation()
      }
    }
  }, [isTracking, stopWatchingLocation])

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Location Tracking</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="tracking-mode" checked={isTracking} onCheckedChange={toggleTracking} disabled={loading} />
          <Label htmlFor="tracking-mode">{isTracking ? "Online" : "Offline"}</Label>
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Getting your location...</span>
          </div>
        ) : error ? (
          <div className="flex items-center space-x-2 text-sm text-red-500">
            <AlertTriangle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        ) : location ? (
          <div className="space-y-2 text-sm">
            <p className="font-medium">Current Location:</p>
            <p className="text-gray-600">{location.address || "Unknown address"}</p>
            <p className="text-gray-500">
              Lat: {location.coordinates.lat.toFixed(6)}, Lng: {location.coordinates.lng.toFixed(6)}
            </p>
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            <p>Location tracking is currently disabled.</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={getCurrentLocation}>
              <MapPin className="mr-2 h-4 w-4" />
              Get Current Location
            </Button>
          </div>
        )}

        {updateError && (
          <div className="mt-2 flex items-center space-x-2 text-sm text-red-500">
            <AlertTriangle className="h-4 w-4" />
            <span>{updateError}</span>
          </div>
        )}
      </div>
    </div>
  )
}
