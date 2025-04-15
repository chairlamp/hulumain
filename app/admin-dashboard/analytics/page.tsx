import { AnalyticsHeader } from "@/components/admin-dashboard/analytics/analytics-header"
import { AnalyticsOverview } from "@/components/admin-dashboard/analytics/analytics-overview"
import { AnalyticsCharts } from "@/components/admin-dashboard/analytics/analytics-charts"
import { AnalyticsPerformance } from "@/components/admin-dashboard/analytics/analytics-performance"
import { DashboardShell } from "@/components/admin-dashboard/dashboard/dashboard-shell"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <AnalyticsHeader />
      <AnalyticsOverview />
      <AnalyticsCharts />
      <AnalyticsPerformance />
    </DashboardShell>
  )
}
