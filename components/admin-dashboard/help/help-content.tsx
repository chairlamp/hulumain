"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpGuides } from "@/components/admin-dashboard/help/help-guides"
import { HelpFAQ } from "@/components/admin-dashboard/help/help-faq"
import { HelpVideos } from "@/components/admin-dashboard/help/help-videos"
import { Search } from "lucide-react"

export function HelpContent() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>How can we help you today?</CardTitle>
          <CardDescription>
            Search for help topics or browse our guides to learn how to use the delivery admin dashboard
          </CardDescription>
          <div className="relative mt-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search help topics..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="guides" className="mt-2">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
            </TabsList>
            <TabsContent value="guides" className="mt-6">
              <HelpGuides
                searchQuery={searchQuery}
                setSearchQuery={(query: string): void => {
                  throw new Error("Function not implemented.")
                }}
              />
            </TabsContent>
            <TabsContent value="faq" className="mt-6">
              <HelpFAQ searchQuery={searchQuery} />
            </TabsContent>
            <TabsContent value="videos" className="mt-6">
              <HelpVideos searchQuery={searchQuery} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
