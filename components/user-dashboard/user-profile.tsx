"use client"

import type React from "react"

import { useState } from "react"
import { Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Food enthusiast and frequent delivery app user. I love trying new restaurants and cuisines!",
    avatar: "/placeholder-user.jpg",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...user })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(formData)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal information and how we can reach you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center space-y-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button variant="outline" size="sm" className="mt-2">
                    <Camera className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                    ) : (
                      <div className="rounded-md border border-input px-3 py-2">{user.name}</div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    ) : (
                      <div className="rounded-md border border-input px-3 py-2">{user.email}</div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                  ) : (
                    <div className="rounded-md border border-input px-3 py-2">{user.phone}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
                  ) : (
                    <div className="rounded-md border border-input px-3 py-2 min-h-[80px]">{user.bio}</div>
                  )}
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            )}
          </form>
        </CardContent>
        {!isEditing && (
          <CardFooter className="flex justify-end">
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </CardFooter>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>Manage your password and account security settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Password</Label>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Last changed 3 months ago</div>
              <Button variant="outline" size="sm">
                Change Password
              </Button>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Two-Factor Authentication</Label>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Protect your account with two-factor authentication</div>
              <Button variant="outline" size="sm">
                Enable 2FA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
