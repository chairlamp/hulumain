"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Truck, Users, BarChart3, Settings, HelpCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export function DashboardNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Overview",
      href: "/admin-dashboard", // Updated href
      icon: LayoutDashboard,
    },
    {
      title: "Orders",
      href: "/admin-dashboard/orders", // Updated href
      icon: Package,
    },
    {
      title: "Drivers",
      href: "/admin-dashboard/drivers", // Updated href
      icon: Truck,
    },
    {
      title: "Customers",
      href: "/admin-dashboard/customers", // Updated href
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/admin-dashboard/analytics", // Updated href
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/admin-dashboard/settings", // Updated href
      icon: Settings,
    },
    {
      title: "Help",
      href: "/admin-dashboard/help", // Updated href
      icon: HelpCircle,
    },
  ]

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <Button
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
