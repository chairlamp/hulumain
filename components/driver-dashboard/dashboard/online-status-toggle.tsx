"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function OnlineStatusToggle() {
  const [isOnline, setIsOnline] = useState(false)

  return (
    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="space-y-0.5">
        <Label htmlFor="online-status">Status</Label>
        <p className="text-sm text-muted-foreground">
          {isOnline ? "You are online and receiving orders" : "You are offline"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className={`h-2.5 w-2.5 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"}`}></div>
        <Switch id="online-status" checked={isOnline} onCheckedChange={setIsOnline} />
      </div>
    </div>
  )
}
