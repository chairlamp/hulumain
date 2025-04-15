"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NotificationSettings() {
  return (
    <Tabs defaultValue="email">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="push">Push Notifications</TabsTrigger>
        <TabsTrigger value="sms">SMS</TabsTrigger>
      </TabsList>

      <TabsContent value="email">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Manage your email notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Order Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">New Orders</div>
                    <div className="text-sm text-muted-foreground">Receive notifications for new orders</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Order Status Changes</div>
                    <div className="text-sm text-muted-foreground">Receive notifications when order status changes</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Order Cancellations</div>
                    <div className="text-sm text-muted-foreground">Receive notifications when orders are cancelled</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Driver Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Driver Assignment</div>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications when drivers are assigned to orders
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Driver Status Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications when driver status changes
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">System Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">System Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications about system updates and maintenance
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Security Alerts</div>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications about security-related events
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Marketing Updates</div>
                    <div className="text-sm text-muted-foreground">Receive marketing and promotional information</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Disable All</Button>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="push">
        <Card>
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription>Manage your push notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Order Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">New Orders</div>
                    <div className="text-sm text-muted-foreground">Receive push alerts for new orders</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Order Status Changes</div>
                    <div className="text-sm text-muted-foreground">Receive push alerts when order status changes</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Urgent Orders</div>
                    <div className="text-sm text-muted-foreground">Receive push alerts for orders marked as urgent</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">System Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Critical Alerts</div>
                    <div className="text-sm text-muted-foreground">Receive push alerts for critical system issues</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Disable All</Button>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="sms">
        <Card>
          <CardHeader>
            <CardTitle>SMS Notifications</CardTitle>
            <CardDescription>Manage your SMS notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Order Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">New Orders</div>
                    <div className="text-sm text-muted-foreground">Receive SMS alerts for new orders</div>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Urgent Orders</div>
                    <div className="text-sm text-muted-foreground">Receive SMS alerts for orders marked as urgent</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">System Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Critical Alerts</div>
                    <div className="text-sm text-muted-foreground">Receive SMS alerts for critical system issues</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Disable All</Button>
            <Button>Save Preferences</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
