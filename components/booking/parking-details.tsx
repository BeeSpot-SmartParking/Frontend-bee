import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Shield, Car, Zap } from "lucide-react"
import Image from "next/image"

interface ParkingDetailsProps {
  parking: {
    id: string
    name: string
    type: string
    address: string
    price: string
    available: number
    total: number
    rating: number
    features: string[]
    description: string
    images: string[]
    rules: string[]
  }
}

export function ParkingDetails({ parking }: ParkingDetailsProps) {
  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case "24/7":
        return <Clock className="h-4 w-4" />
      case "security":
        return <Shield className="h-4 w-4" />
      case "covered":
        return <Car className="h-4 w-4" />
      case "ev charging":
        return <Zap className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Details */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-card-foreground">{parking.name}</h2>
                <Badge variant={parking.type === "public" ? "secondary" : "outline"}>{parking.type}</Badge>
              </div>
              <p className="text-muted-foreground mb-2">{parking.address}</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{parking.rating}</span>
                <span className="text-muted-foreground text-sm">(124 reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-card-foreground">{parking.price}</p>
              <p className="text-sm text-muted-foreground">
                {parking.available}/{parking.total} available
              </p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">{parking.description}</p>

          <div className="flex flex-wrap gap-2">
            {parking.features.map((feature) => (
              <div key={feature} className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                {getFeatureIcon(feature)}
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parking.images.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${parking.name} - Photo ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rules */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Parking Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {parking.rules.map((rule, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                {rule}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
