"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Home, MapPin, Package, Settings, User, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function UserDashboardSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Overview",
      href: "/user-dashboard",
      icon: Home,
    },
    {
      title: "My Orders",
      href: "/user-dashboard/orders",
      icon: Package,
    },
    {
      title: "My Addresses",
      href: "/user-dashboard/addresses",
      icon: MapPin,
    },
    {
      title: "My Profile",
      href: "/user-dashboard/profile",
      icon: User,
    },
    {
      title: "My Favorites",
      href: "/user-dashboard/favorites",
      icon: Heart,
    },
    {
      title: "Settings",
      href: "/user-dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r">
      <SidebarHeader className="flex items-center px-4 py-2">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Kech Delivery</span>
        </Link>
        <SidebarTrigger className="ml-auto md:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                <Link href={route.href}>
                  <route.icon className="h-4 w-4" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/auth/logout">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
