"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Shield, Smartphone } from "lucide-react"

export function SecuritySettings() {
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Update Password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">Require a verification code when logging in</div>
            </div>
            <Switch checked={showTwoFactorSetup} onCheckedChange={setShowTwoFactorSetup} />
          </div>

          {showTwoFactorSetup && (
            <div className="mt-6 space-y-4 rounded-md border p-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-medium">Set up authenticator app</h3>
                  <p className="text-sm text-muted-foreground">
                    Use an authenticator app like Google Authenticator or Authy to get verification codes.
                  </p>
                  <div className="mt-4 flex flex-col items-center space-y-4">
                    <div className="aspect-square w-40 rounded-md bg-muted flex items-center justify-center">
                      <p className="text-xs text-muted-foreground">QR Code would appear here</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Or enter this setup code manually:</p>
                      <code className="mt-1 block rounded bg-muted px-2 py-1">ABCD-EFGH-IJKL-MNOP</code>
                    </div>
                    <div className="w-full space-y-2">
                      <Label htmlFor="verification-code">Verification Code</Label>
                      <Input id="verification-code" placeholder="Enter 6-digit code" />
                    </div>
                    <Button className="w-full">Verify and Activate</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Session Timeout</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically log out after a period of inactivity
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Login Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive notifications for new login attempts</div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Save Security Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login Sessions</CardTitle>
          <CardDescription>Manage your active sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-muted-foreground">
                    Chrome on Windows • New York, USA • Started 2 hours ago
                  </p>
                </div>
                <Shield className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Mobile App</p>
                  <p className="text-sm text-muted-foreground">iPhone 13 • San Francisco, USA • Started 1 day ago</p>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Tablet</p>
                  <p className="text-sm text-muted-foreground">iPad • Chicago, USA • Started 3 days ago</p>
                </div>
                <Button variant="outline" size="sm">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="destructive">Revoke All Other Sessions</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login History</CardTitle>
          <CardDescription>Recent login activity on your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Today at 2:30 PM</p>
                <p className="text-xs text-muted-foreground">Chrome on Windows • New York, USA</p>
              </div>
              <div className="text-sm text-green-500">Successful</div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Yesterday at 4:15 PM</p>
                <p className="text-xs text-muted-foreground">iPhone 13 • San Francisco, USA</p>
              </div>
              <div className="text-sm text-green-500">Successful</div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Yesterday at 9:30 AM</p>
                <p className="text-xs text-muted-foreground">Unknown Device • Moscow, Russia</p>
              </div>
              <div className="text-sm text-red-500">Failed</div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">3 days ago at 11:45 AM</p>
                <p className="text-xs text-muted-foreground">iPad • Chicago, USA</p>
              </div>
              <div className="text-sm text-green-500">Successful</div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Alert variant="destructive" className="w-full">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Security Alert</AlertTitle>
            <AlertDescription>
              We detected a failed login attempt from an unusual location. If this wasn't you, please change your
              password immediately.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  )
}
