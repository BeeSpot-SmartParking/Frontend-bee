import { AdminHeader } from "@/components/admin/admin-header"
import { SignalsManagement } from "@/components/admin/signals-management"

export default function AdminSignalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Signals Management</h1>
          <p className="text-muted-foreground">Review and respond to user reports and anomalies</p>
        </div>

        <SignalsManagement />
      </div>
    </div>
  )
}
