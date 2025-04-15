"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Home, ShoppingBag, Truck, Utensils, LogOut, Settings, FileText, Users, BarChart4 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function DashboardSidebar() {
  const pathname = usePathname()
  const basePath = "/admin-dashboard"

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <Sidebar>
      <SidebarHeader className="py-6">
        <Link href="/" className="flex items-center gap-2 px-4">
          <Utensils className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Kech Delivery</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`${basePath}`)}>
              <Link href={`${basePath}`}>
                <Home />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`${basePath}/orders`)}>
              <Link href={`${basePath}/orders`}>
                <ShoppingBag />
                <span>Orders</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`${basePath}/drivers`)}>
              <Link href={`${basePath}/drivers`}>
                <Truck />
                <span>Drivers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`${basePath}/customers`)}>
              <Link href={`${basePath}/customers`}>
                <Users />
                <span>Customers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`${basePath}/analytics`)}>
              <Link href={`${basePath}/analytics`}>
                <BarChart4 />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`${basePath}/settings`)}>
              <Link href={`${basePath}/settings`}>
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive(`${basePath}/help`)}>
              <Link href={`${basePath}/help`}>
                <FileText />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
