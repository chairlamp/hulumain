"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, MoreHorizontal, MapPin, Phone, Star, Truck, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"
import { DriverDetails } from "@/components/admin-dashboard/drivers/driver-details"

// Mock data - in a real app, this would come from an API
const drivers = [
  {
    id: "DRV-1001",
    name: "Michael Johnson",
    phone: "+1 (555) 123-4567",
    email: "michael.johnson@example.com",
    location: "New York, NY",
    status: "active",
    vehicle: "Car - Toyota Camry",
    licensePlate: "ABC-1234",
    rating: 4.9,
    completedDeliveries: 342,
    onTimeRate: 98,
    avatar: "/placeholder.svg?height=40&width=40",
    currentOrder: null,
    joinDate: "2022-03-15",
    earnings: {
      today: "$124.50",
      week: "$876.25",
      month: "$3,245.75",
    },
    recentDeliveries: [
      {
        id: "ORD-1234",
        customer: "John Smith",
        address: "123 Main St, New York, NY",
        time: "2023-04-15T14:30:00",
        status: "delivered",
      },
      {
        id: "ORD-1235",
        customer: "Sarah Williams",
        address: "456 Park Ave, Boston, MA",
        time: "2023-04-15T12:45:00",
        status: "delivered",
      },
      {
        id: "ORD-1236",
        customer: "Emily Davis",
        address: "789 Oak St, Chicago, IL",
        time: "2023-04-14T16:15:00",
        status: "delivered",
      },
    ],
  },
  {
    id: "DRV-1002",
    name: "Sarah Williams",
    phone: "+1 (555) 987-6543",
    email: "sarah.williams@example.com",
    location: "Boston, MA",
    status: "on-delivery",
    vehicle: "Scooter - Honda PCX",
    licensePlate: "XYZ-7890",
    rating: 4.8,
    completedDeliveries: 287,
    onTimeRate: 96,
    avatar: "/placeholder.svg?height=40&width=40",
    currentOrder: {
      id: "ORD-1240",
      customer: "Jennifer Martinez",
      address: "741 Birch Blvd, Austin, TX",
      estimatedDelivery: "2023-04-15T18:15:00",
    },
    joinDate: "2022-04-20",
    earnings: {
      today: "$98.75",
      week: "$745.50",
      month: "$2,876.25",
    },
    recentDeliveries: [
      {
        id: "ORD-1237",
        customer: "Robert Johnson",
        address: "321 Pine St, San Francisco, CA",
        time: "2023-04-15T11:30:00",
        status: "delivered",
      },
      {
        id: "ORD-1238",
        customer: "Lisa Anderson",
        address: "654 Maple Ave, Seattle, WA",
        time: "2023-04-15T09:45:00",
        status: "delivered",
      },
      {
        id: "ORD-1239",
        customer: "Michael Wilson",
        address: "987 Cedar Rd, Miami, FL",
        time: "2023-04-14T15:20:00",
        status: "delivered",
      },
    ],
  },
  {
    id: "DRV-1003",
    name: "David Lee",
    phone: "+1 (555) 456-7890",
    email: "david.lee@example.com",
    location: "Chicago, IL",
    status: "active",
    vehicle: "Car - Honda Civic",
    licensePlate: "DEF-5678",
    rating: 4.7,
    completedDeliveries: 215,
    onTimeRate: 94,
    avatar: "/placeholder.svg?height=40&width=40",
    currentOrder: null,
    joinDate: "2022-05-10",
    earnings: {
      today: "$87.25",
      week: "$654.50",
      month: "$2,432.75",
    },
    recentDeliveries: [
      {
        id: "ORD-1241",
        customer: "Daniel Thompson",
        address: "852 Spruce St, Denver, CO",
        time: "2023-04-15T13:15:00",
        status: "delivered",
      },
      {
        id: "ORD-1242",
        customer: "Olivia Brown",
        address: "963 Elm St, Portland, OR",
        time: "2023-04-15T10:30:00",
        status: "delivered",
      },
      {
        id: "ORD-1243",
        customer: "William Garcia",
        address: "159 Walnut Ave, Nashville, TN",
        time: "2023-04-14T14:45:00",
        status: "delivered",
      },
    ],
  },
  {
    id: "DRV-1004",
    name: "Jessica Brown",
    phone: "+1 (555) 234-5678",
    email: "jessica.brown@example.com",
    location: "San Francisco, CA",
    status: "offline",
    vehicle: "Bicycle",
    licensePlate: "N/A",
    rating: 4.9,
    completedDeliveries: 178,
    onTimeRate: 97,
    avatar: "/placeholder.svg?height=40&width=40",
    currentOrder: null,
    joinDate: "2022-06-05",
    earnings: {
      today: "$0.00",
      week: "$543.25",
      month: "$2,187.50",
    },
    recentDeliveries: [
      {
        id: "ORD-1244",
        customer: "Thomas White",
        address: "753 Pine St, Austin, TX",
        time: "2023-04-14T16:30:00",
        status: "delivered",
      },
      {
        id: "ORD-1245",
        customer: "Elizabeth Clark",
        address: "426 Oak Dr, Miami, FL",
        time: "2023-04-14T14:15:00",
        status: "delivered",
      },
      {
        id: "ORD-1246",
        customer: "James Rodriguez",
        address: "987 Maple Ln, Chicago, IL",
        time: "2023-04-14T11:45:00",
        status: "delivered",
      },
    ],
  },
  {
    id: "DRV-1005",
    name: "Thomas White",
    phone: "+1 (555) 876-5432",
    email: "thomas.white@example.com",
    location: "Miami, FL",
    status: "on-delivery",
    vehicle: "Car - Ford Focus",
    licensePlate: "GHI-9012",
    rating: 4.6,
    completedDeliveries: 156,
    onTimeRate: 92,
    avatar: "/placeholder.svg?height=40&width=40",
    currentOrder: {
      id: "ORD-1247",
      customer: "Patricia Martinez",
      address: "321 Cedar St, Seattle, WA",
      estimatedDelivery: "2023-04-15T17:45:00",
    },
    joinDate: "2022-07-12",
    earnings: {
      today: "$76.50",
      week: "$498.75",
      month: "$1,976.25",
    },
    recentDeliveries: [
      {
        id: "ORD-1248",
        customer: "Richard Taylor",
        address: "654 Birch Ave, Denver, CO",
        time: "2023-04-15T12:30:00",
        status: "delivered",
      },
      {
        id: "ORD-1249",
        customer: "Linda Anderson",
        address: "789 Spruce Rd, Portland, OR",
        time: "2023-04-15T09:15:00",
        status: "delivered",
      },
      {
        id: "ORD-1250",
        customer: "Charles Wilson",
        address: "159 Elm Blvd, Nashville, TN",
        time: "2023-04-14T15:45:00",
        status: "delivered",
      },
    ],
  },
  {
    id: "DRV-1006",
    name: "Amanda Garcia",
    phone: "+1 (555) 345-6789",
    email: "amanda.garcia@example.com",
    location: "Seattle, WA",
    status: "inactive",
    vehicle: "Car - Nissan Altima",
    licensePlate: "JKL-3456",
    rating: 4.5,
    completedDeliveries: 132,
    onTimeRate: 90,
    avatar: "/placeholder.svg?height=40&width=40",
    currentOrder: null,
    joinDate: "2022-08-18",
    earnings: {
      today: "$0.00",
      week: "$0.00",
      month: "$1,654.50",
    },
    recentDeliveries: [
      {
        id: "ORD-1251",
        customer: "Barbara Lewis",
        address: "852 Oak St, Boston, MA",
        time: "2023-04-10T14:30:00",
        status: "delivered",
      },
      {
        id: "ORD-1252",
        customer: "Joseph Hill",
        address: "963 Pine Ave, New York, NY",
        time: "2023-04-10T11:45:00",
        status: "delivered",
      },
      {
        id: "ORD-1253",
        customer: "Susan Scott",
        address: "159 Cedar Rd, Chicago, IL",
        time: "2023-04-10T09:15:00",
        status: "delivered",
      },
    ],
  },
  {
    id: "DRV-1007",
    name: "Kevin Wilson",
    phone: "+1 (555) 567-8901",
    email: "kevin.wilson@example.com",
    location: "Denver, CO",
    status: "active",
    vehicle: "Car - Chevrolet Malibu",
    licensePlate: "MNO-7890",
    rating: 4.8,
    completedDeliveries: 198,
    onTimeRate: 95,
    avatar: "/placeholder.svg?height=40&width=40",
    currentOrder: null,
    joinDate: "2022-09-25",
    earnings: {
      today: "$98.25",
      week: "$587.50",
      month: "$2,143.75",
    },
    recentDeliveries: [
      {
        id: "ORD-1254",
        customer: "Dorothy Young",
        address: "753 Maple St, San Francisco, CA",
        time: "2023-04-15T13:45:00",
        status: "delivered",
      },
      {
        id: "ORD-1255",
        customer: "Paul Hernandez",
        address: "426 Birch Dr, Miami, FL",
        time: "2023-04-15T11:15:00",
        status: "delivered",
      },
      {
        id: "ORD-1256",
        customer: "Betty King",
        address: "987 Spruce Ln, Seattle, WA",
        time: "2023-04-14T16:45:00",
        status: "delivered",
      },
    ],
  },
  {
    id: "DRV-1008",
    name: "Rachel Thompson",
    phone: "+1 (555) 678-9012",
    email: "rachel.thompson@example.com",
    location: "Portland, OR",
    status: "offline",
    vehicle: "Scooter - Vespa Primavera",
    licensePlate: "PQR-1234",
    rating: 4.7,
    completedDeliveries: 167,
    onTimeRate: 93,
    avatar: "/placeholder.svg?height=40&width=40",
    currentOrder: null,
    joinDate: "2022-10-15",
    earnings: {
      today: "$0.00",
      week: "$432.75",
      month: "$1,876.50",
    },
    recentDeliveries: [
      {
        id: "ORD-1257",
        customer: "Kenneth Wright",
        address: "654 Elm St, Denver, CO",
        time: "2023-04-14T15:30:00",
        status: "delivered",
      },
      {
        id: "ORD-1258",
        customer: "Carol Lopez",
        address: "789 Oak Ave, Portland, OR",
        time: "2023-04-14T13:15:00",
        status: "delivered",
      },
      {
        id: "ORD-1259",
        customer: "Jason Hall",
        address: "159 Pine Rd, Nashville, TN",
        time: "2023-04-14T10:45:00",
        status: "delivered",
      },
    ],
  },
  {
    id: "DRV-1009",
    name: "Brian Martinez",
    phone: "+1 (555) 789-0123",
    email: "brian.martinez@example.com",
    location: "Nashville, TN",
    status: "on-delivery",
    vehicle: "Car - Hyundai Elantra",
    licensePlate: "STU-5678",
    rating: 4.6,
    completedDeliveries: 145,
    onTimeRate: 91,
    avatar: "/placeholder.svg?height=40&width=40",
    currentOrder: {
      id: "ORD-1260",
      customer: "Nancy Allen",
      address: "852 Cedar St, Chicago, IL",
      estimatedDelivery: "2023-04-15T18:30:00",
    },
    joinDate: "2022-11-08",
    earnings: {
      today: "$67.50",
      week: "$465.25",
      month: "$1,932.75",
    },
    recentDeliveries: [
      {
        id: "ORD-1261",
        customer: "Sandra Young",
        address: "963 Maple Ave, Boston, MA",
        time: "2023-04-15T14:15:00",
        status: "delivered",
      },
      {
        id: "ORD-1262",
        customer: "George Baker",
        address: "159 Birch Blvd, New York, NY",
        time: "2023-04-15T11:30:00",
        status: "delivered",
      },
      {
        id: "ORD-1263",
        customer: "Donna Nelson",
        address: "753 Spruce Dr, San Francisco, CA",
        time: "2023-04-14T16:15:00",
        status: "delivered",
      },
    ],
  },
  {
    id: "DRV-1010",
    name: "Michelle Davis",
    phone: "+1 (555) 890-1234",
    email: "michelle.davis@example.com",
    location: "Austin, TX",
    status: "active",
    vehicle: "Bicycle",
    licensePlate: "N/A",
    rating: 4.9,
    completedDeliveries: 187,
    onTimeRate: 98,
    avatar: "/placeholder.svg?height=40&width=40",
    currentOrder: null,
    joinDate: "2022-12-20",
    earnings: {
      today: "$87.75",
      week: "$543.50",
      month: "$2,087.25",
    },
    recentDeliveries: [
      {
        id: "ORD-1264",
        customer: "Edward Mitchell",
        address: "426 Elm St, Miami, FL",
        time: "2023-04-15T15:45:00",
        status: "delivered",
      },
      {
        id: "ORD-1265",
        customer: "Lisa Carter",
        address: "987 Oak Dr, Seattle, WA",
        time: "2023-04-15T12:30:00",
        status: "delivered",
      },
      {
        id: "ORD-1266",
        customer: "Ronald Roberts",
        address: "159 Pine Ln, Denver, CO",
        time: "2023-04-14T14:45:00",
        status: "delivered",
      },
    ],
  },
]

export function DriversTable() {
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Function to render status badge with appropriate color
  const renderStatus = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "on-delivery":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Truck className="mr-1 h-3 w-3" />
            On Delivery
          </Badge>
        )
      case "offline":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">
            <Clock className="mr-1 h-3 w-3" />
            Offline
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <XCircle className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Toggle row selection
  const toggleRowSelection = (driverId: string) => {
    setSelectedRows((prev) => (prev.includes(driverId) ? prev.filter((id) => id !== driverId) : [...prev, driverId]))
  }

  // Check if all rows are selected
  const allSelected = selectedRows.length === drivers.length

  // Toggle all rows selection
  const toggleAllRows = () => {
    if (allSelected) {
      setSelectedRows([])
    } else {
      setSelectedRows(drivers.map((driver) => driver.id))
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle>Driver List</CardTitle>
          <CardDescription>
            {selectedRows.length > 0 ? (
              <div className="flex items-center gap-2">
                <span>{selectedRows.length} drivers selected</span>
                <Button variant="outline" size="sm" onClick={() => setSelectedRows([])}>
                  Clear
                </Button>
                <Button variant="default" size="sm">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Message Selected
                </Button>
              </div>
            ) : (
              <span>Total {drivers.length} drivers</span>
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox checked={allSelected} onCheckedChange={toggleAllRows} aria-label="Select all drivers" />
                </TableHead>
                <TableHead className="w-[250px]">Driver</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Rating</TableHead>
                <TableHead className="hidden md:table-cell">Deliveries</TableHead>
                <TableHead className="hidden lg:table-cell">Vehicle</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drivers.map((driver) => (
                <TableRow
                  key={driver.id}
                  className={selectedRows.includes(driver.id) ? "bg-muted/50" : ""}
                  onClick={() => {
                    setSelectedDriver(driver)
                    setIsDetailsOpen(true)
                  }}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedRows.includes(driver.id)}
                      onCheckedChange={() => toggleRowSelection(driver.id)}
                      aria-label={`Select driver ${driver.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={driver.avatar || "/placeholder.svg"} alt={driver.name} />
                        <AvatarFallback>
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{driver.name}</span>
                        <span className="text-xs text-muted-foreground">{driver.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Phone className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm">{driver.phone}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{driver.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{driver.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{renderStatus(driver.status)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center">
                      <Star className="mr-1 h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                      <span>{driver.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{driver.completedDeliveries}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center">
                      <Truck className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm truncate max-w-[150px]">{driver.vehicle}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedDriver(driver)
                              setIsDetailsOpen(true)
                            }}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit driver</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Assign order</DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Send message</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-red-600">
                            Deactivate driver
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>1-{drivers.length}</strong> of <strong>{drivers.length}</strong> drivers
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>

      {/* Driver Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedDriver && <DriverDetails driver={selectedDriver} />}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
