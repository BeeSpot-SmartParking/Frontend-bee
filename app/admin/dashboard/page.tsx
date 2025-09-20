import { AdminHeader } from "@/components/admin/admin-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { OccupancyChart } from "@/components/admin/occupancy-chart"
import { RecentActivity } from "@/components/admin/recent-activity"

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">System Overview</h1>
          <p className="text-muted-foreground">Monitor platform performance and manage operations</p>
        </div>

        <AdminStats />

        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          <RevenueChart />
          <OccupancyChart />
        </div>

        <div className="mt-6">
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
