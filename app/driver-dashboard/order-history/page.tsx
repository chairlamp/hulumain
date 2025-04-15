import { OrderHistoryList } from "@/components/driver-dashboard/orders/order-history-list"

export default function OrderHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
        <p className="text-muted-foreground">View your past deliveries and performance</p>
      </div>
      <OrderHistoryList />
    </div>
  )
}
