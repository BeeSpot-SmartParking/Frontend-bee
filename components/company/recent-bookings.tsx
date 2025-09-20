import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Car, DollarSign, Eye } from "lucide-react"

// Mock bookings data
const recentBookings = [
  {
    id: "BK-2024-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    location: "Downtown Plaza - Level 1",
    licensePlate: "ABC-123",
    date: "2024-01-15",
    time: "14:00 - 16:00",
    duration: "2 hours",
    amount: "$4.00",
    status: "active",
  },
  {
    id: "BK-2024-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    location: "Business Center Lot",
    licensePlate: "XYZ-789",
    date: "2024-01-15",
    time: "09:00 - 17:00",
    duration: "8 hours",
    amount: "$12.00",
    status: "completed",
  },
  {
    id: "BK-2024-003",
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    location: "Premium Valet Section",
    licensePlate: "DEF-456",
    date: "2024-01-14",
    time: "10:00 - 14:00",
    duration: "4 hours",
    amount: "$20.00",
    status: "completed",
  },
  {
    id: "BK-2024-004",
    customerName: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    location: "Downtown Plaza - Level 2",
    licensePlate: "GHI-789",
    date: "2024-01-14",
    time: "12:00 - 15:00",
    duration: "3 hours",
    amount: "$6.00",
    status: "cancelled",
  },
]

export function RecentBookings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Recent Bookings</h3>
        <Button variant="outline">View All</Button>
      </div>

      <div className="space-y-4">
        {recentBookings.map((booking) => (
          <Card key={booking.id} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-card-foreground">{booking.customerName}</h4>
                    <Badge
                      variant={
                        booking.status === "active"
                          ? "default"
                          : booking.status === "completed"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{booking.customerEmail}</p>
                  <p className="text-sm font-medium text-card-foreground">{booking.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-card-foreground">{booking.amount}</p>
                  <p className="text-xs text-muted-foreground">Booking ID: {booking.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{booking.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Car className="h-4 w-4" />
                  <span>{booking.licensePlate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{booking.duration}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
