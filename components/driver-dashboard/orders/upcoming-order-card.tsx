import { Clock, MapPin, User } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UpcomingOrderCardProps {
  id: string
  restaurant: string
  customer: string
  time: string
  address: string
  amount: string
  distance: string
}

export function UpcomingOrderCard({
  id,
  restaurant,
  customer,
  time,
  address,
  amount,
  distance,
}: UpcomingOrderCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="space-y-1">
            <div className="text-sm font-medium">{restaurant}</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-3.5 w-3.5" />
              {time}
            </div>
            <div className="text-sm font-medium">Order #{id}</div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <User className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
              {customer}
            </div>
            <div className="flex items-start text-sm text-muted-foreground">
              <MapPin className="mr-1 h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{address}</span>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <div>
              <div className="text-sm font-medium">{amount}</div>
              <div className="text-sm text-muted-foreground">{distance}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end border-t p-3">
        <Button size="sm" variant="outline">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
