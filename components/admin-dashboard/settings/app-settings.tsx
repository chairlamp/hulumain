"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export function AppSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure general application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" defaultValue="Delivery Admin" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" type="email" defaultValue="support@deliveryapp.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Contact Phone</Label>
            <Input id="contact-phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business-hours">Business Hours</Label>
            <Input id="business-hours" defaultValue="Mon-Fri, 9:00 AM - 5:00 PM EST" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Customize the appearance of your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Enable dark mode for the dashboard</p>
            </div>
            <Switch id="dark-mode" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compact-mode">Compact Mode</Label>
              <p className="text-sm text-muted-foreground">Reduce spacing for a more compact view</p>
            </div>
            <Switch id="compact-mode" />
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="font-size">Font Size</Label>
                <span className="text-sm text-muted-foreground">Medium</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date-format">Date Format</Label>
            <Select defaultValue="MM/DD/YYYY">
              <SelectTrigger id="date-format">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-format">Time Format</Label>
            <Select defaultValue="12h">
              <SelectTrigger id="time-format">
                <SelectValue placeholder="Select time format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                <SelectItem value="24h">24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Settings</CardTitle>
          <CardDescription>Configure delivery-specific settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="default-radius">Default Delivery Radius (miles)</Label>
            <Input id="default-radius" type="number" defaultValue="10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivery-fee">Standard Delivery Fee ($)</Label>
            <Input id="delivery-fee" type="number" defaultValue="5.99" step="0.01" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-assign">Auto-assign Drivers</Label>
              <p className="text-sm text-muted-foreground">Automatically assign drivers to new orders</p>
            </div>
            <Switch id="auto-assign" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="live-tracking">Enable Live Tracking</Label>
              <p className="text-sm text-muted-foreground">Allow customers to track their deliveries in real-time</p>
            </div>
            <Switch id="live-tracking" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
