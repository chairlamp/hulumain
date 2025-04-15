import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import DashboardMetrics from "@/components/admin-dashboard/dashboard/dashboard-metrics"
import OrdersTable from "@/components/admin-dashboard/dashboard/orders-table"
import { DashboardHeader } from "@/components/admin-dashboard/dashboard/dashboard-header"
import { DashboardShell } from "@/components/admin-dashboard/dashboard/dashboard-shell"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Normalize role to lowercase for comparison
  if (!session || !session.user || ((session.user as any).role || "").toLowerCase() !== "admin") {
    redirect("/") // or "/auth/login"
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your delivery operations" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMetrics />
      </div>
      <div className="mt-6">
        <OrdersTable />
      </div>
    </DashboardShell>
  )
}
