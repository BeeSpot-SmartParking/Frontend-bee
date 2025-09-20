import { BookingForm } from "@/components/booking/booking-form"
import { ParkingDetails } from "@/components/booking/parking-details"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock parking data - in real app, fetch by ID
const parkingData = {
  id: "1",
  name: "El harrach",
  type: "public",
  address: "123 Main St, Downtown",
  price: "100DA/hour",
  available: 15,
  total: 50,
  rating: 4.5,
  features: ["24/7", "Security", "Covered"],
  description:
    "Convenient downtown parking with 24/7 security and covered spaces. Perfect for shopping and business visits.",
  images: ["/multi-level-parking.png"],
  rules: [
    "Maximum stay: 8 hours",
    "No overnight parking",
    "Compact cars only in designated spots",
    "Payment required before parking",
  ],
}

interface BookingPageProps {
  params: {
    parkingId: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Book Parking Spot</h1>
          <p className="text-muted-foreground">Complete your reservation at {parkingData.name}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 p-6 bg-gray-600 rounded-lg border border-slate-200 shadow-sm">
          <div className="lg:col-span-2">
            <ParkingDetails parking={parkingData} />
          </div>
          <div>
            <Card className="border-slate-200 bg-gradient-to-br from-blue-600 to-blue-900 sticky top-6 shadow-md">
              <CardHeader>
                <CardTitle className="text-card-foreground">Complete Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingForm parkingId={params.parkingId} parkingData={parkingData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
