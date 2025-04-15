"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Play } from "lucide-react"

interface HelpVideosProps {
  searchQuery: string
}

export function HelpVideos({ searchQuery }: HelpVideosProps) {
  // Define video tutorials
  const videoTutorials = [
    {
      id: "video-1",
      title: "Getting Started with the Dashboard",
      description: "Learn the basics of navigating and using the delivery admin dashboard.",
      duration: "5:32",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Basics",
    },
    {
      id: "video-2",
      title: "Managing Orders",
      description: "A complete guide to creating, tracking, and managing delivery orders.",
      duration: "8:15",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Orders",
    },
    {
      id: "video-3",
      title: "Driver Management",
      description: "Learn how to add drivers, assign orders, and track performance.",
      duration: "7:45",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Drivers",
    },
    {
      id: "video-4",
      title: "Customer Database",
      description: "How to manage your customer information and order history.",
      duration: "6:20",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Customers",
    },
    {
      id: "video-5",
      title: "Analytics and Reporting",
      description: "Using analytics to gain insights into your delivery operations.",
      duration: "9:10",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Analytics",
    },
    {
      id: "video-6",
      title: "Configuring Settings",
      description: "How to customize the dashboard to fit your business needs.",
      duration: "4:55",
      thumbnail: "/placeholder.svg?height=180&width=320",
      category: "Settings",
    },
  ]

  // Filter videos based on search query
  const filteredVideos = searchQuery
    ? videoTutorials.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : videoTutorials

  return (
    <div className="space-y-6">
      {filteredVideos.length === 0 ? (
        <div className="text-center py-10">
          <Search className="mx-auto h-8 w-8 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No results found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find any video tutorials matching your search. Try using different keywords or browse all
            videos.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-[180px] object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full">
                    <Play className="h-6 w-6" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-base">{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <Badge variant="outline">{video.category}</Badge>
                <Button variant="ghost" size="sm">
                  Watch Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
