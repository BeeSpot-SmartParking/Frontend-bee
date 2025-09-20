import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import QRCode from 'react-qr-code';
import { QrCode, MapPin, Clock, Calendar } from "lucide-react"

interface ReservationsListProps {
  type: "active" | "history"
}

// Mock reservation data
const activeReservations = [
  {
    id: 1,
    location: "Downtown Plaza",
    address: "123 Main St",
    date: "2024-01-15",
    time: "14:00 - 16:00",
    price: "$4.00",
    status: "active",
    qrCode: "QR123456",
    expiresIn: "1h 45m",
  },
]

const historyReservations = [
  {
    id: 2,
    location: "Business Center",
    address: "456 Business Ave",
    date: "2024-01-10",
    time: "09:00 - 17:00",
    price: "$24.00",
    status: "completed",
    qrCode: "QR789012",
  },
  {
    id: 3,
    location: "Shopping Mall",
    address: "789 Commerce Blvd",
    date: "2024-01-08",
    time: "12:00 - 15:00",
    price: "$4.50",
    status: "completed",
    qrCode: "QR345678",
  },
]

export function ReservationsList({ type }: ReservationsListProps) {
  const reservations = type === "active" ? activeReservations : historyReservations

  if (reservations.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="p-8 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No {type} reservations</h3>
          <p className="text-muted-foreground">
            {type === "active"
              ? "You don't have any active parking reservations."
              : "Your reservation history will appear here."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <Card key={reservation.id} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-medium text-card-foreground mb-1">{reservation.location}</h4>
                <p className="text-sm text-muted-foreground mb-2">{reservation.address}</p>
                <Badge variant={reservation.status === "active" ? "default" : "secondary"} className="mb-2">
                  {reservation.status}
                </Badge>
                {reservation.status === "active" && reservation.expiresIn && (
                  <p className="text-sm text-orange-500 font-medium">Expires in {reservation.expiresIn}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-card-foreground">{reservation.price}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {reservation.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {reservation.time}
              </div>
            </div>

            <div className="flex gap-2">
              {reservation.status === "active" && (
                <Button className="flex-1">
                
                  <div style={{ background: 'white', padding: '16px' }}>
                    <QRCode
                      value={url}
                       size={256}
                       style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                        viewBox={`0 0 256 256`}
                        className="mr-2 h-4 w-4" 
                  />
                </div>
                  Show QR Code
                </Button>
              )}
              <Button variant="outline" size={reservation.status === "active" ? "default" : "sm"}>
                <MapPin className="mr-2 h-4 w-4" />
                View Location
              </Button>
              {reservation.status === "active" && (
                <Button variant="destructive" size="default">
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
