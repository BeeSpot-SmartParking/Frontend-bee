import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QRCodeDisplay } from "@/components/booking/qr-code-display"
import { CheckCircle, Calendar, Clock, MapPin, Car, Download, Share } from "lucide-react"
import Link from "next/link"

// Mock booking data - in real app, get from booking ID or state
const bookingData = {
  id: "BK-2024-001",
  location: "Downtown Plaza",
  address: "123 Main St, Downtown",
  date: "2024-01-15",
  startTime: "14:00",
  endTime: "16:00",
  duration: "2 hours",
  licensePlate: "ABC-123",
  total: "$4.00",
  status: "confirmed",
  qrCode: "QR-BK-2024-001-DOWNTOWN",
}

export function BookingConfirmation() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit">
          <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground">Your parking spot has been successfully reserved</p>
      </div>

      <div className="space-y-6">
        {/* QR Code */}
        <Card className="border-border bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-card-foreground">Your Parking Ticket</CardTitle>
            <p className="text-sm text-muted-foreground">Show this QR code when you arrive</p>
          </CardHeader>
          <CardContent className="text-center">
            <QRCodeDisplay value={bookingData.qrCode} size={200} />
            <p className="text-xs text-muted-foreground mt-2 font-mono">{bookingData.qrCode}</p>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-card-foreground">{bookingData.location}</CardTitle>
                <p className="text-sm text-muted-foreground">{bookingData.address}</p>
              </div>
              <Badge variant="default">{bookingData.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium text-card-foreground">{bookingData.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium text-card-foreground">
                    {bookingData.startTime} - {bookingData.endTime}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Vehicle</p>
                  <p className="font-medium text-card-foreground">{bookingData.licensePlate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium text-card-foreground">{bookingData.duration}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="text-xl font-bold text-card-foreground">{bookingData.total}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Booking ID: {bookingData.id}</p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download Ticket
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Share className="mr-2 h-4 w-4" />
            Share Details
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/reservations" className="flex-1">
            <Button variant="secondary" className="w-full">
              View All Reservations
            </Button>
          </Link>
          <Link href="/dashboard" className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Important Notes */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground text-lg">Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                Arrive within 15 minutes of your start time to secure your spot
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                Show the QR code to the parking attendant or scan at the entrance
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                Additional charges apply if you exceed your reserved time
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                Contact support if you need to modify or cancel your booking
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
