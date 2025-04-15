import type React from "react"
import { DriverDashboardSidebar } from "@/components/driver-dashboard/dashboard/driver-dashboard-sidebar"

export const metadata = {
  title: "Driver Dashboard",
  description: "Manage your deliveries and earnings",
}

export default function DriverDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DriverDashboardSidebar />
      <div className="flex-1 p-4 md:p-6">{children}</div>
    </div>
  )
}
