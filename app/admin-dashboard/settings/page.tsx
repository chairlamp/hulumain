import { SettingsHeader } from "@/components/admin-dashboard/settings/settings-header"
import { SettingsTabs } from "@/components/admin-dashboard/settings/settings-tabs"
import { DashboardShell } from "@/components/admin-dashboard/dashboard/dashboard-shell"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <SettingsHeader />
      <SettingsTabs />
    </DashboardShell>
  )
}
