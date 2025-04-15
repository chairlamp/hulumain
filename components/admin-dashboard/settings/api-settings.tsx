"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, Eye, EyeOff } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ApiSettings() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState("sk_live_51NZQgTLkdIwI2jxYxRkT5uZ7M8zWXD")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // In a real app, you would show a toast notification here
  }

  const regenerateApiKey = () => {
    // In a real app, this would call an API to regenerate the key
    setApiKey("sk_live_" + Math.random().toString(36).substring(2, 30))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API keys for external integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="api-key">Live API Key</Label>
              <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                Active
              </Badge>
            </div>
            <div className="flex">
              <div className="relative flex-1">
                <Input id="api-key" value={apiKey} type={showApiKey ? "text" : "password"} readOnly className="pr-10" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-8 top-0"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showApiKey ? "Hide" : "Show"} API key</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => copyToClipboard(apiKey)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy API key</span>
                </Button>
              </div>
              <Button variant="outline" className="ml-2" onClick={regenerateApiKey}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              This key is used for live transactions. Keep it secure and never share it publicly.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="test-api-key">Test API Key</Label>
              <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                Test Only
              </Badge>
            </div>
            <div className="flex">
              <div className="relative flex-1">
                <Input
                  id="test-api-key"
                  value="sk_test_51NZQgTLkdIwI2jxYxRkT5uZ7M8zWXD"
                  type={showApiKey ? "text" : "password"}
                  readOnly
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-8 top-0"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showApiKey ? "Hide" : "Show"} API key</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={() => copyToClipboard("sk_test_51NZQgTLkdIwI2jxYxRkT5uZ7M8zWXD")}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy API key</span>
                </Button>
              </div>
              <Button variant="outline" className="ml-2">
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              This key is for testing purposes only. No real transactions will be processed.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>Configure webhook endpoints for real-time event notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" placeholder="https://your-server.com/webhook" />
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-medium">Webhook Events</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Order Created</div>
                  <div className="text-sm text-muted-foreground">Triggered when a new order is created</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Order Status Updated</div>
                  <div className="text-sm text-muted-foreground">Triggered when an order's status changes</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Driver Assignment</div>
                  <div className="text-sm text-muted-foreground">Triggered when a driver is assigned to an order</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Delivery Completed</div>
                  <div className="text-sm text-muted-foreground">Triggered when a delivery is marked as completed</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Test Webhook</Button>
          <Button>Save Webhook Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Rate Limits</CardTitle>
          <CardDescription>Configure rate limiting for your API requests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rate-limit">Requests per minute</Label>
            <Select defaultValue="100">
              <SelectTrigger id="rate-limit">
                <SelectValue placeholder="Select rate limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">60 requests/minute</SelectItem>
                <SelectItem value="100">100 requests/minute</SelectItem>
                <SelectItem value="500">500 requests/minute</SelectItem>
                <SelectItem value="1000">1000 requests/minute</SelectItem>
                <SelectItem value="unlimited">Unlimited</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="burst-limit">Burst limit</Label>
            <Select defaultValue="200">
              <SelectTrigger id="burst-limit">
                <SelectValue placeholder="Select burst limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100 requests</SelectItem>
                <SelectItem value="200">200 requests</SelectItem>
                <SelectItem value="500">500 requests</SelectItem>
                <SelectItem value="1000">1000 requests</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">Maximum number of requests allowed in a short burst</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save Rate Limits</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
