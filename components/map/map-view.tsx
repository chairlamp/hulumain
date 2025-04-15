"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Loader2 } from "lucide-react"

// Initialize Mapbox with your token
// In production, use environment variables
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.your_mapbox_token_here"

export type MapMarker = {
  id: string
  coordinates: [number, number] // [longitude, latitude]
  color?: string
  title?: string
  description?: string
  icon?: string
}

export type MapRoute = {
  id: string
  coordinates: [number, number][] // Array of [longitude, latitude] points
  color?: string
  width?: number
}

interface MapViewProps {
  center?: [number, number] // [longitude, latitude]
  zoom?: number
  markers?: MapMarker[]
  routes?: MapRoute[]
  interactive?: boolean
  style?: React.CSSProperties
  className?: string
  onMapClick?: (e: mapboxgl.MapMouseEvent) => void
  onMarkerClick?: (marker: MapMarker) => void
}

export function MapView({
  center = [-74.5, 40], // Default to NYC area
  zoom = 9,
  markers = [],
  routes = [],
  interactive = true,
  style,
  className,
  onMapClick,
  onMarkerClick,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markerRefs = useRef<{ [id: string]: mapboxgl.Marker }>({})
  const routeRefs = useRef<{ [id: string]: string }>({})
  const [loading, setLoading] = useState(true)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center,
      zoom,
      interactive,
    })

    map.current.on("load", () => {
      setLoading(false)
    })

    if (onMapClick && map.current) {
      map.current.on("click", onMapClick)
    }

    return () => {
      if (map.current) {
        if (onMapClick) map.current.off("click", onMapClick)
        map.current.remove()
      }
    }
  }, [])

  // Update center and zoom when props change
  useEffect(() => {
    if (map.current) {
      map.current.setCenter(center)
      map.current.setZoom(zoom)
    }
  }, [center, zoom])

  // Add/update/remove markers
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return

    // Track existing marker IDs
    const existingMarkerIds = new Set(Object.keys(markerRefs.current))
    const newMarkerIds = new Set(markers.map((m) => m.id))

    // Remove markers that no longer exist
    existingMarkerIds.forEach((id) => {
      if (!newMarkerIds.has(id)) {
        markerRefs.current[id].remove()
        delete markerRefs.current[id]
      }
    })

    // Add or update markers
    markers.forEach((marker) => {
      const { id, coordinates, color = "#FF0000", title, description } = marker

      if (markerRefs.current[id]) {
        // Update existing marker
        markerRefs.current[id].setLngLat(coordinates)
      } else {
        // Create new marker
        const el = document.createElement("div")
        el.className = "marker"
        el.style.backgroundColor = color
        el.style.width = "20px"
        el.style.height = "20px"
        el.style.borderRadius = "50%"
        el.style.border = "2px solid white"
        el.style.cursor = "pointer"

        const newMarker = new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map.current!)

        if (title || description) {
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
              ${title ? `<h3 class="font-bold">${title}</h3>` : ""}
              ${description ? `<p>${description}</p>` : ""}
            `)
          newMarker.setPopup(popup)
        }

        if (onMarkerClick) {
          el.addEventListener("click", () => {
            onMarkerClick(marker)
          })
        }

        markerRefs.current[id] = newMarker
      }
    })
  }, [markers, onMarkerClick])

  // Add/update/remove routes
  useEffect(() => {
    if (!map.current || !map.current.loaded()) return

    // Track existing route IDs
    const existingRouteIds = new Set(Object.keys(routeRefs.current))
    const newRouteIds = new Set(routes.map((r) => r.id))

    // Remove routes that no longer exist
    existingRouteIds.forEach((id) => {
      if (!newRouteIds.has(id) && map.current!.getSource(id)) {
        map.current!.removeLayer(id)
        map.current!.removeSource(id)
        delete routeRefs.current[id]
      }
    })

    // Add or update routes
    routes.forEach((route) => {
      const { id, coordinates, color = "#3887be", width = 5 } = route

      // Format for GeoJSON
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates,
        },
      }

      if (map.current!.getSource(id)) {
        // Update existing route
        ;(map.current!.getSource(id) as mapboxgl.GeoJSONSource).setData(geojson as any)
      } else {
        // Create new route
        map.current!.addSource(id, {
          type: "geojson",
          data: geojson as any,
        })

        map.current!.addLayer({
          id,
          type: "line",
          source: id,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": color,
            "line-width": width,
          },
        })

        routeRefs.current[id] = id
      }
    })
  }, [routes])

  return (
    <div className={`relative ${className || ""}`} style={{ height: "400px", ...style }}>
      <div ref={mapContainer} className="absolute inset-0 rounded-md overflow-hidden" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  )
}
