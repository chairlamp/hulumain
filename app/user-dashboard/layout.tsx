import type React from "react"
import { UserDashboardSidebar } from "@/components/user-dashboard/user-dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { cookies } from "next/headers"

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value !== "false"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full">
        <UserDashboardSidebar />
        <div className="flex-1 w-full">{children}</div>
      </div>
    </SidebarProvider>
  )
}
