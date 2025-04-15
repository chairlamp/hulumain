import { type NextRequest, NextResponse } from "next/server"

// Search for locations by query
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    // In a real app, you would use a geocoding service like Google Maps Geocoding API or Mapbox
    // For this example, we'll return mock results
    const mockResults = [
      {
        place_id: "mock-place-1",
        formatted_address: `${query} Street, New York, NY, USA`,
        geometry: {
          location: {
            lat: 40.7128,
            lng: -74.006,
          },
        },
      },
      {
        place_id: "mock-place-2",
        formatted_address: `${query} Avenue, Los Angeles, CA, USA`,
        geometry: {
          location: {
            lat: 34.0522,
            lng: -118.2437,
          },
        },
      },
      {
        place_id: "mock-place-3",
        formatted_address: `${query} Road, Chicago, IL, USA`,
        geometry: {
          location: {
            lat: 41.8781,
            lng: -87.6298,
          },
        },
      },
    ]

    return NextResponse.json({ results: mockResults })
  } catch (error) {
    console.error("Error searching locations:", error)
    return NextResponse.json({ error: "Failed to search locations" }, { status: 500 })
  }
}
