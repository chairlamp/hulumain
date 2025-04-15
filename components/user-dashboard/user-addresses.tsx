"use client"

import { useState, useEffect } from "react"
import { Edit, MapPin, MoreHorizontal, Plus, Trash } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export function UserAddresses() {
  const { data: session } = useSession()
  const [addresses, setAddresses] = useState([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const fetchAddresses = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/users/${session?.user?.id}/addresses`)

      if (!response.ok) throw new Error("Failed to fetch addresses")

      const data = await response.json()
      setAddresses(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching addresses:", error)
      setError("Failed to load addresses. Please try again.")
      setLoading(false)
    }
  }

  const addAddress = async (addressData) => {
    try {
      setSubmitting(true)
      const response = await fetch(`/api/users/${session?.user?.id}/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      })

      if (!response.ok) throw new Error("Failed to add address")

      const data = await response.json()
      setAddresses([...addresses, data.address])
      setSubmitting(false)
      return data
    } catch (error) {
      console.error("Error adding address:", error)
      setSubmitting(false)
      throw error
    }
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchAddresses()
    }
  }, [session])

  const handleAddAddress = async () => {
    try {
      const newAddressData = {
        name: newAddress.name,
        address: newAddress.address,
        city: newAddress.city,
        state: newAddress.state,
        zipCode: newAddress.zipCode,
        isDefault: newAddress.isDefault,
      }

      await addAddress(newAddressData)

      setNewAddress({
        name: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        isDefault: false,
      })
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Failed to add address:", error)
      // Handle error appropriately, e.g., display an error message to the user
    }
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>Add a new delivery address to your account.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Address Name</Label>
                <Input
                  id="name"
                  placeholder="Home, Work, etc."
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Street Address</Label>
                <Textarea
                  id="address"
                  placeholder="123 Main St, Apt 4B"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  placeholder="10001"
                  value={newAddress.zipCode}
                  onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="isDefault">Set as default address</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAddress} disabled={submitting}>
                {submitting ? "Saving..." : "Save Address"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p>Loading addresses...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          addresses.map((address) => (
            <Card key={address.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{address.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {!address.isDefault && (
                        <DropdownMenuItem onClick={() => handleSetDefault(address.id)}>
                          <MapPin className="mr-2 h-4 w-4" />
                          Set as default
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteAddress(address.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                {address.isDefault && (
                  <Badge variant="outline" className="text-xs">
                    Default Address
                  </Badge>
                )}
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
