"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export function UserSettings() {
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
    deliveryReminders: true,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareOrderHistory: false,
    locationTracking: true,
    personalization: true,
  })

  const handleNotificationChange = (key: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key as keyof typeof notificationSettings],
    })
  }

  const handlePrivacyChange = (key: string) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key as keyof typeof privacySettings],
    })
  }

  return (
    <Tabs defaultValue="notifications" className="space-y-4">
      <TabsList>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
        <TabsTrigger value="payment">Payment Methods</TabsTrigger>
      </TabsList>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Choose what notifications you receive and how you receive them.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">What to notify</h3>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderUpdates">Order Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about your order status</p>
                </div>
                <Switch
                  id="orderUpdates"
                  checked={notificationSettings.orderUpdates}
                  onCheckedChange={() => handleNotificationChange("orderUpdates")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="promotions">Promotions and Deals</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about special offers and discounts
                  </p>
                </div>
                <Switch
                  id="promotions"
                  checked={notificationSettings.promotions}
                  onCheckedChange={() => handleNotificationChange("promotions")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="deliveryReminders">Delivery Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders when your delivery is about to arrive
                  </p>
                </div>
                <Switch
                  id="deliveryReminders"
                  checked={notificationSettings.deliveryReminders}
                  onCheckedChange={() => handleNotificationChange("deliveryReminders")}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Notification Channels</h3>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() => handleNotificationChange("emailNotifications")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushNotifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={() => handleNotificationChange("pushNotifications")}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications">SMS</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={() => handleNotificationChange("smsNotifications")}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="privacy" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Manage how your information is used and shared.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shareOrderHistory">Share Order History</Label>
                <p className="text-sm text-muted-foreground">Allow restaurants to see your previous orders</p>
              </div>
              <Switch
                id="shareOrderHistory"
                checked={privacySettings.shareOrderHistory}
                onCheckedChange={() => handlePrivacyChange("shareOrderHistory")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="locationTracking">Location Tracking</Label>
                <p className="text-sm text-muted-foreground">Allow the app to track your location for delivery</p>
              </div>
              <Switch
                id="locationTracking"
                checked={privacySettings.locationTracking}
                onCheckedChange={() => handlePrivacyChange("locationTracking")}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="personalization">Personalization</Label>
                <p className="text-sm text-muted-foreground">
                  Allow the app to personalize your experience based on your activity
                </p>
              </div>
              <Switch
                id="personalization"
                checked={privacySettings.personalization}
                onCheckedChange={() => handlePrivacyChange("personalization")}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="payment" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment methods and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
                <Badge>Default</Badge>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Mastercard ending in 5555</p>
                  <p className="text-sm text-muted-foreground">Expires 10/24</p>
                </div>
              </div>
            </div>
            <Button className="w-full">Add Payment Method</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
