"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/admin-dashboard",
      label: "Dashboard",
      active: pathname === "/admin-dashboard",
    },
    {
      href: "/admin-dashboard/orders",
      label: "Orders",
      active: pathname === "/admin-dashboard/orders",
    },
    {
      href: "/admin-dashboard/drivers",
      label: "Drivers",
      active: pathname === "/admin-dashboard/drivers",
    },
    {
      href: "/admin-dashboard/customers",
      label: "Customers",
      active: pathname === "/admin-dashboard/customers",
    },
    {
      href: "/admin-dashboard/analytics",
      label: "Analytics",
      active: pathname === "/admin-dashboard/analytics",
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-black dark:text-white" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
