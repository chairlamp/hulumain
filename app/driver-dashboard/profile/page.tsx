import { DriverProfile } from "@/components/driver-dashboard/profile/driver-profile"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <DriverProfile />
    </div>
  )
}
