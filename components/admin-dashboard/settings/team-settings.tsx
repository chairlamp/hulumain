"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, MoreHorizontal, Mail } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TeamSettings() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  // Mock team members data - in a real app, this would come from an API
  const teamMembers = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@deliveryapp.com",
      role: "Administrator",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@deliveryapp.com",
      role: "Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@deliveryapp.com",
      role: "Support",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@deliveryapp.com",
      role: "Viewer",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "pending",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert.wilson@deliveryapp.com",
      role: "Support",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "inactive",
    },
  ]

  // Function to render status badge with appropriate color
  const renderStatus = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      case "inactive":
        return <Badge className="bg-gray-500 hover:bg-gray-600">Inactive</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team members and their access</CardDescription>
            </div>
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to a new team member to join your organization.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="colleague@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrator">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Personal Message (Optional)</Label>
                    <Input id="message" placeholder="I'd like to invite you to our team..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsInviteDialogOpen(false)}>Send Invitation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between rounded-md border p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="mr-1 h-3 w-3" />
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="hidden md:block">{renderStatus(member.status)}</div>
                  <Select defaultValue={member.role}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Remove Member</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Roles and Permissions</CardTitle>
          <CardDescription>Define what each role can do in your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Administrator</h3>
              <p className="text-sm text-muted-foreground">
                Full access to all features and settings. Can manage team members and billing.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Manager</h3>
              <p className="text-sm text-muted-foreground">
                Can manage orders, customers, and drivers. Limited access to settings.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Support</h3>
              <p className="text-sm text-muted-foreground">
                Can view and update orders and customer information. No access to settings.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Viewer</h3>
              <p className="text-sm text-muted-foreground">
                Read-only access to orders, customers, and analytics. No edit capabilities.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Customize Permissions</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
