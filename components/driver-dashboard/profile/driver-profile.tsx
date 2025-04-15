"use client"

import { Badge } from "@/components/ui/badge"
import { CreditCard, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DriverProfile() {
  return (
    <Tabs defaultValue="personal" className="space-y-4">
      <TabsList>
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        <TabsTrigger value="vehicle">Vehicle Details</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button size="sm">Upload new photo</Button>
                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 3MB.</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" defaultValue="Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="123 Main St" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="San Francisco" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" defaultValue="CA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP code</Label>
                <Input id="zip" defaultValue="94103" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a little about yourself"
                defaultValue="Experienced delivery driver with 3+ years of experience in food delivery. I pride myself on fast, friendly service and always ensuring orders arrive in perfect condition."
              />
              <p className="text-xs text-muted-foreground">This will be displayed on your profile.</p>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button className="gap-1">
              <Save className="h-4 w-4" />
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="payment" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment methods and payout preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Payout Method</Label>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Direct Deposit</p>
                      <p className="text-sm text-muted-foreground">Ending in ••••1234</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payout Schedule</Label>
              <Select defaultValue="weekly">
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Payouts are processed on Mondays for the previous week</p>
            </div>

            <div className="space-y-2">
              <Label>Tax Information</Label>
              <div className="rounded-lg border p-4">
                <p className="font-medium">W-9 Form</p>
                <p className="text-sm text-muted-foreground">Your tax information is up to date</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button className="gap-1">
              <Save className="h-4 w-4" />
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="vehicle" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Details</CardTitle>
            <CardDescription>Manage your vehicle information for deliveries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                <Select defaultValue="car">
                  <SelectTrigger id="vehicle-type">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="bicycle">Bicycle</SelectItem>
                    <SelectItem value="scooter">Scooter</SelectItem>
                    <SelectItem value="walking">Walking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-year">Year</Label>
                <Input id="vehicle-year" defaultValue="2019" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-make">Make</Label>
                <Input id="vehicle-make" defaultValue="Toyota" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-model">Model</Label>
                <Input id="vehicle-model" defaultValue="Corolla" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicle-color">Color</Label>
                <Input id="vehicle-color" defaultValue="Silver" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license-plate">License Plate</Label>
                <Input id="license-plate" defaultValue="ABC123" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Insurance Information</Label>
              <div className="rounded-lg border p-4">
                <p className="font-medium">Insurance Provider: AllState</p>
                <p className="text-sm text-muted-foreground">Policy #: INS-987654321</p>
                <p className="text-sm text-muted-foreground">Expiration: 12/31/2023</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button className="gap-1">
              <Save className="h-4 w-4" />
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Delivery Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-order">New Order Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications when new orders are available</p>
                  </div>
                  <Switch id="new-order" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-updates">Order Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about changes to your current orders
                    </p>
                  </div>
                  <Switch id="order-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="delivery-reminders">Delivery Reminders</Label>
                    <p className="text-sm text-muted-foreground">Receive reminders about upcoming deliveries</p>
                  </div>
                  <Switch id="delivery-reminders" defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="payment-notifications">Payment Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about payments and earnings</p>
                  </div>
                  <Switch id="payment-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-updates">App Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about app updates and new features
                    </p>
                  </div>
                  <Switch id="app-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="promotional">Promotional Messages</Label>
                    <p className="text-sm text-muted-foreground">Receive promotional offers and incentives</p>
                  </div>
                  <Switch id="promotional" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notification Methods</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                  </div>
                  <Switch id="push-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email</Label>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS</Label>
                  </div>
                  <Switch id="sms-notifications" defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button className="gap-1">
              <Save className="h-4 w-4" />
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security and authentication methods</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Change Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Update Password</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Login Sessions</h3>
              <div className="rounded-lg border p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">San Francisco, CA • iPhone 13 • Today, 1:24 PM</p>
                    </div>
                    <Badge>Current</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Previous Session</p>
                      <p className="text-sm text-muted-foreground">
                        San Francisco, CA • MacBook Pro • Yesterday, 3:15 PM
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Logout
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Logout of All Devices
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button className="gap-1">
              <Save className="h-4 w-4" />
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
