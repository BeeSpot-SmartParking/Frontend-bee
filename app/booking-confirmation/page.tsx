import { BookingConfirmation } from "@/components/booking/booking-confirmation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6">
        <BookingConfirmation />
      </div>
    </div>
  )
}
