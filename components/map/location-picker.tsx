"use client"

import { useState, useEffect } from "react"
import { MapPin, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapView } from "@/components/map/map-view"
import { useGeolocation, type Coordinates } from "@/hooks/use-geolocation"

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; coordinates: Coordinates }) => void
  initialLocation?: { address: string; coordinates: Coordinates }
}

export function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
  const { location, error, loading, getCurrentLocation } = useGeolocation()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string
    coordinates: Coordinates
  } | null>(initialLocation || null)
  const [isSearching, setIsSearching] = useState(false)
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    initialLocation ? [initialLocation.coordinates.lng, initialLocation.coordinates.lat] : [-74.5, 40],
  )
  const [mapZoom, setMapZoom] = useState(initialLocation ? 15 : 9)

  // Handle location from geolocation
  useEffect(() => {
    if (location && location.coordinates && location.address) {
      setSelectedLocation({
        address: location.address,
        coordinates: location.coordinates,
      })
      setMapCenter([location.coordinates.lng, location.coordinates.lat])
      setMapZoom(15)
    }
  }, [location])

  // Search for locations
  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      const response = await fetch(`/api/geocode/search?query=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setSearchResults(data.results || [])
    } catch (error) {
      console.error("Error searching locations:", error)
    } finally {
      setIsSearching(false)
    }
  }

  // Select a location from search results
  const handleSelectSearchResult = (result: any) => {
    const newLocation = {
      address: result.formatted_address || result.place_name,
      coordinates: {
        lat: result.geometry.location?.lat || result.center[1],
        lng: result.geometry.location?.lng || result.center[0],
      },
    }
    setSelectedLocation(newLocation)
    setMapCenter([newLocation.coordinates.lng, newLocation.coordinates.lat])
    setMapZoom(15)
    setSearchResults([])
    onLocationSelect(newLocation)
  }

  // Handle map click to select location
  const handleMapClick = async (e: any) => {
    const { lng, lat } = e.lngLat

    try {
      const response = await fetch(`/api/geocode?lat=${lat}&lng=${lng}`)
      const data = await response.json()

      const newLocation = {
        address: data.address || "Unknown location",
        coordinates: { lat, lng },
      }

      setSelectedLocation(newLocation)
      onLocationSelect(newLocation)
    } catch (error) {
      console.error("Error reverse geocoding:", error)
    }
  }

  // Confirm selected location
  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Input
            placeholder="Search for a location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
          <Button variant="outline" onClick={getCurrentLocation} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
          </Button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {searchResults.length > 0 && (
          <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-sm">
            {searchResults.map((result, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                onClick={() => handleSelectSearchResult(result)}
              >
                {result.formatted_address || result.place_name}
              </button>
            ))}
          </div>
        )}
      </div>

      <MapView
        center={mapCenter}
        zoom={mapZoom}
        markers={
          selectedLocation
            ? [
                {
                  id: "selected-location",
                  coordinates: [selectedLocation.coordinates.lng, selectedLocation.coordinates.lat],
                  color: "#FF0000",
                  title: "Selected Location",
                  description: selectedLocation.address,
                },
              ]
            : []
        }
        onMapClick={handleMapClick}
        style={{ height: "300px" }}
        className="rounded-md border"
      />

      {selectedLocation && (
        <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
          <div className="flex items-start">
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Selected Location</p>
              <p className="text-sm text-gray-600">{selectedLocation.address}</p>
            </div>
          </div>
        </div>
      )}

      <Button onClick={handleConfirmLocation} disabled={!selectedLocation} className="w-full">
        <Check className="mr-2 h-4 w-4" /> Confirm Location
      </Button>
    </div>
  )
}
