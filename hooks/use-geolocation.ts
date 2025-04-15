"use client"

import { useState, useEffect, useCallback } from "react"

export type Coordinates = {
  lat: number
  lng: number
}

export type LocationData = {
  coordinates: Coordinates
  address?: string
  formattedAddress?: string
}

export function useGeolocation() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [watching, setWatching] = useState(false)
  const [watchId, setWatchId] = useState<number | null>(null)

  // Get current location once
  const getCurrentLocation = useCallback(async () => {
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
          timeout: 10000,
          maximumAge: 0,
        })
      })

      const { latitude, longitude } = position.coords

      // Reverse geocode the coordinates to get the address
      try {
        const response = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`)
        const data = await response.json()

        setLocation({
          coordinates: { lat: latitude, lng: longitude },
          address: data.address,
          formattedAddress: data.formattedAddress,
        })
      } catch (geocodeError) {
        console.error("Error geocoding:", geocodeError)
        setLocation({
          coordinates: { lat: latitude, lng: longitude },
        })
      }
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location access denied. Please enable location services in your browser settings.")
            break
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable. Please try again.")
            break
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.")
            break
          default:
            setError("An unknown error occurred while getting your location.")
            break
        }
      } else {
        setError("Failed to get your location. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Watch location continuously
  const startWatchingLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    setLoading(true)
    setError(null)
    setWatching(true)

    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        // Only reverse geocode occasionally to avoid API rate limits
        const shouldGeocode =
          !location ||
          Math.abs(latitude - location.coordinates.lat) > 0.001 ||
          Math.abs(longitude - location.coordinates.lng) > 0.001

        if (shouldGeocode) {
          try {
            const response = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`)
            const data = await response.json()

            setLocation({
              coordinates: { lat: latitude, lng: longitude },
              address: data.address,
              formattedAddress: data.formattedAddress,
            })
          } catch (geocodeError) {
            console.error("Error geocoding:", geocodeError)
            setLocation({
              coordinates: { lat: latitude, lng: longitude },
            })
          }
        } else {
          setLocation((prev) => ({
            ...prev!,
            coordinates: { lat: latitude, lng: longitude },
          }))
        }

        setLoading(false)
      },
      (err) => {
        if (err instanceof GeolocationPositionError) {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError("Location access denied. Please enable location services in your browser settings.")
              break
            case err.POSITION_UNAVAILABLE:
              setError("Location information is unavailable. Please try again.")
              break
            case err.TIMEOUT:
              setError("Location request timed out. Please try again.")
              break
            default:
              setError("An unknown error occurred while watching your location.")
              break
          }
        } else {
          setError("Failed to watch your location. Please try again.")
        }
        setLoading(false)
        setWatching(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )

    setWatchId(id)
  }, [location])

  // Stop watching location
  const stopWatchingLocation = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
      setWatching(false)
    }
  }, [watchId])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [watchId])

  return {
    location,
    error,
    loading,
    watching,
    getCurrentLocation,
    startWatchingLocation,
    stopWatchingLocation,
  }
}
