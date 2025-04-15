import { CurrentOrdersList } from "@/components/driver-dashboard/orders/current-orders-list"

export default function CurrentOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Current Orders</h1>
        <p className="text-muted-foreground">Manage your active and upcoming deliveries</p>
      </div>
      <CurrentOrdersList />
    </div>
  )
}
