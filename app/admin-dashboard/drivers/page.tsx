import { DriversHeader } from "@/components/admin-dashboard/drivers/drivers-header"
import { DriversTable } from "@/components/admin-dashboard/drivers/drivers-table"
import { DashboardShell } from "@/components/admin-dashboard/dashboard/dashboard-shell"

export default function DriversPage() {
  return (
    <DashboardShell>
      <DriversHeader />
      <DriversTable />
    </DashboardShell>
  )
}
