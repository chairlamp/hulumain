import { EarningsOverview } from "@/components/driver-dashboard/earnings/earnings-overview"

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Earnings</h1>
        <p className="text-muted-foreground">Track your income and payment history</p>
      </div>
      <EarningsOverview />
    </div>
  )
}
