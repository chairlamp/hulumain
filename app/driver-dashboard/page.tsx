import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"  // Assuming this is where your NextAuth options are defined
import { redirect } from "next/navigation"
import { DriverDashboardOverview } from "@/components/driver-dashboard/dashboard/driver-dashboard-overview"

export default async function DriverDashboardPage() {
  // Get the session of the current user
  const session = await getServerSession(authOptions)

  // If there is no session or the user is not a DELIVERY_AGENT, redirect them
  if (!session || !session.user || ((session.user as { role?: string }).role !== "DELIVERY_AGENT")) {
    redirect("/auth/login") // or redirect("/"); if you want to redirect to homepage
  }

  return <DriverDashboardOverview />
}
