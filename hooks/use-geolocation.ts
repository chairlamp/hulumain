"use client"

import { useState, useCallback } from "react"

type Coordinates = {
  lat: number
  lng: number
}

type Location = {
  coordinates: Coordinates
  address?: string
}

export function useGeolocation() {
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        })
      })

      const { latitude, longitude } = position.coords

      // Reverse geocode the coordinates to get the address
      // In a real app, you would use a service like Google Maps Geocoding API
      // For now, we'll use a mock service
      try {
        const response = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`)
        const data = await response.json()

        setLocation({
          coordinates: { lat: latitude, lng: longitude },
          address: data.address,
        })
      } catch (geocodeError) {
        setLocation({
          coordinates: { lat: latitude, lng: longitude },
        })
      }
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("User denied the request for geolocation")
            break
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable")
            break
          case err.TIMEOUT:
            setError("The request to get user location timed out")
            break
          default:
            setError("An unknown error occurred")
            break
        }
      } else {
        setError("Failed to get location")
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return { location, error, loading, getLocation }
}
