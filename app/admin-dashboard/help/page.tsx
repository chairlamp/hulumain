import { HelpContent } from "@/components/admin-dashboard/help/help-content"
import { DashboardShell } from "@/components/admin-dashboard/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/admin-dashboard/dashboard/dashboard-header"

export default function HelpPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Help Center" text="Find answers and learn how to use the delivery admin dashboard" />
      <HelpContent />
    </DashboardShell>
  )
}
