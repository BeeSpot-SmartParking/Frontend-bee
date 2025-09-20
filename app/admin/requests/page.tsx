import { AdminHeader } from "@/components/admin/admin-header"
import { RequestsManagement } from "@/components/admin/requests-management"

export default function AdminRequestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Requests Management</h1>
          <p className="text-muted-foreground">Review company registrations and plan upgrade requests</p>
        </div>

        <RequestsManagement />
      </div>
    </div>
  )
}
