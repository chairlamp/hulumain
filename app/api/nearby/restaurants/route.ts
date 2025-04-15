import { type NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Get nearby restaurants based on coordinates
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const radius = Number.parseFloat(searchParams.get("radius") || "5") // Default 5km

    if (!lat || !lng) {
      return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 })
    }

    // In a real app with a spatial database, you would use a query like:
    // SELECT * FROM restaurants
    // WHERE ST_DWithin(
    //   geography(ST_MakePoint(longitude, latitude)),
    //   geography(ST_MakePoint($lng, $lat)),
    //   $radius * 1000
    // )

    // For this example, we'll return all restaurants
    // In a real app, you would filter by distance
    const restaurants = await prisma.restaurant.findMany({
      orderBy: {
        name: "asc",
      },
    })

    // Mock distance calculation
    const restaurantsWithDistance = restaurants.map((restaurant) => {
      // In a real app, you would calculate actual distance
      const distance = Math.random() * radius

      return {
        ...restaurant,
        distance: Number.parseFloat(distance.toFixed(1)),
      }
    })

    // Sort by distance
    restaurantsWithDistance.sort((a, b) => a.distance - b.distance)

    return NextResponse.json(restaurantsWithDistance)
  } catch (error) {
    console.error("Error fetching nearby restaurants:", error)
    return NextResponse.json({ error: "Failed to fetch nearby restaurants" }, { status: 500 })
  }
}
