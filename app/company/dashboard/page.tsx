import { CompanyHeader } from "@/components/company/company-header"
import { CompanyStats } from "@/components/company/company-stats"
import { ParkingSpotsList } from "@/components/company/parking-spots-list"
import { RecentBookings } from "@/components/company/recent-bookings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompanyDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Company Dashboard</h1>
          <p className="text-muted-foreground">Manage your parking spaces and track performance</p>
        </div>

        <CompanyStats />

        <Tabs defaultValue="spots" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="spots">Parking Spots</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
          </TabsList>

          <TabsContent value="spots" className="mt-6">
            <ParkingSpotsList />
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <RecentBookings />
          </TabsContent>

          <TabsContent value="offers" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Promotional offers management coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
