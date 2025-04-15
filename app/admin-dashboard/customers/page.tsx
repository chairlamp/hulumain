import { CustomersHeader } from "@/components/admin-dashboard/customers/customers-header"
import { CustomersTable } from "@/components/admin-dashboard/customers/customers-table"
import { DashboardShell } from "@/components/admin-dashboard/dashboard/dashboard-shell"

export default function CustomersPage() {
  return (
    <DashboardShell>
      <CustomersHeader />
      <CustomersTable />
    </DashboardShell>
  )
}
