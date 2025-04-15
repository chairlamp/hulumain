"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, Clock, CreditCard, Home, LogOut, Package, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { OnlineStatusToggle } from "@/components/driver-dashboard/dashboard/online-status-toggle"

const sidebarLinks = [
  {
    title: "Overview",
    href: "/driver-dashboard",
    icon: Home,
  },
  {
    title: "Current Orders",
    href: "/driver-dashboard/current-orders",
    icon: Package,
  },
  {
    title: "Order History",
    href: "/driver-dashboard/order-history",
    icon: Clock,
  },
  {
    title: "Earnings",
    href: "/driver-dashboard/earnings",
    icon: CreditCard,
  },
  {
    title: "Profile",
    href: "/driver-dashboard/profile",
    icon: User,
  },
]

export function DriverDashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-full flex-col border-r bg-muted/40 md:w-64">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/driver-dashboard" className="flex items-center gap-2 font-semibold">
          <Car className="h-6 w-6" />
          <span>Driver Portal</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground",
                pathname === link.href && "bg-muted text-foreground",
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <OnlineStatusToggle />
        <Button variant="outline" className="w-full mt-4 gap-2" size="sm">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
