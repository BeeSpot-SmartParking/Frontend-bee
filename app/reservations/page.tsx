import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ReservationsList } from "@/components/reservations/reservations-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Reservations</h1>
          <p className="text-muted-foreground">Manage your parking reservations and tickets</p>
        </div>

        <Tabs defaultValue="active" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <ReservationsList type="active" />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <ReservationsList type="history" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
