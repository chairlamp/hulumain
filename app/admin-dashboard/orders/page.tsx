import { OrdersHeader } from "@/components/admin-dashboard/orders/orders-header"
import { OrdersTable } from "@/components/admin-dashboard/orders/orders-table"
import { DashboardShell } from "@/components/admin-dashboard/dashboard/dashboard-shell"

export default function OrdersPage() {
  return (
    <DashboardShell>
      <OrdersHeader />
      <OrdersTable />
    </DashboardShell>
  )
}
