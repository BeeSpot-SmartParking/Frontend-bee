"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, DollarSign, Target } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

// Mock parking data
const allParkingSpots = [
  {
    id: 1,
    name: "Downtown Plaza",
    type: "public",
    distance: "0.2 km",
    price: "$2/hour",
    available: 15,
    total: 50,
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 2,
    name: "Business Center",
    type: "organized",
    distance: "0.5 km",
    price: "$3/hour",
    available: 8,
    total: 25,
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: 3,
    name: "Shopping Mall",
    type: "public",
    distance: "0.8 km",
    price: "$1.5/hour",
    available: 32,
    total: 100,
    coordinates: { lat: 40.7505, lng: -73.9934 },
  },
  {
    id: 4,
    name: "City Center Garage",
    type: "organized",
    distance: "1.2 km",
    price: "$2.5/hour",
    available: 22,
    total: 75,
    coordinates: { lat: 40.7614, lng: -73.9776 },
  },
  {
    id: 5,
    name: "Metro Station",
    type: "public",
    distance: "1.5 km",
    price: "$1/hour",
    available: 45,
    total: 80,
    coordinates: { lat: 40.7282, lng: -73.9942 },
  },
]

interface ParkingMapProps {
  selectedLocation?: { lat: number; lng: number; address: string } | null
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function ParkingMap({ selectedLocation }: ParkingMapProps) {
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null)
  const [filteredSpots, setFilteredSpots] = useState(allParkingSpots)

  useEffect(() => {
    if (selectedLocation) {
      const spotsWithDistance = allParkingSpots.map((spot) => {
        const distance = calculateDistance(
          selectedLocation.lat,
          selectedLocation.lng,
          spot.coordinates.lat,
          spot.coordinates.lng,
        )
        return {
          ...spot,
          calculatedDistance: distance,
          distance: `${distance.toFixed(1)} km`,
        }
      })

      // Filter spots within 5km radius and sort by distance
      const nearbySpots = spotsWithDistance
        .filter((spot) => spot.calculatedDistance <= 5)
        .sort((a, b) => a.calculatedDistance - b.calculatedDistance)

      setFilteredSpots(nearbySpots)
    } else {
      setFilteredSpots(allParkingSpots)
    }
  }, [selectedLocation])

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Map Container */}
      <div className="lg:col-span-2">
        <Card className="h-[500px] border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <MapPin className="h-5 w-5" />
              Parking Locations
              {selectedLocation && (
                <Badge variant="outline" className="ml-2 ">
                  <Target className="h-3 w-3 mr-1" />
                  Near {selectedLocation.address}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full bg-red">
            {/* Placeholder for map - in real implementation, use Leaflet or Google Maps */}
            <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden ">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive Map</p>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredSpots.length} parking locations
                  {selectedLocation && ` near ${selectedLocation.address}`}
                </p>
              </div>

              {selectedLocation && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full p-2">
                  <Target className="h-4 w-4" />
                </div>
              )}

              {/* Mock map pins for filtered spots */}
              {filteredSpots.slice(0, 3).map((spot, index) => (
                <div
                  key={spot.id}
                  className={`absolute bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:scale-110 transition-transform ${
                    index === 0 ? "top-1/4 left-1/3" : index === 1 ? "top-1/2 right-1/3" : "bottom-1/4 left-1/2"
                  }`}
                  onClick={() => setSelectedSpot(spot.id)}
                >
                  <MapPin className="h-4 w-4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parking Spots List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          {selectedLocation ? "Nearby Spots" : "Available Spots"}
        </h3>

        {filteredSpots.length === 0 ? (
          <Card className="border-border bg-accent/50 bg-card">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No parking spots found in this area</p>
              <p className="text-sm text-muted-foreground">Try searching a different location</p>
            </CardContent>
          </Card>
        ) : (
          filteredSpots.map((spot) => (
            <Card
              key={spot.id}
              className={`cursor-pointer transition-all border-3  border-yellow-400 hover:bg-accent/50 ${
                selectedSpot === spot.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedSpot(spot.id)}
            >
              <CardContent className="p-4 ">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-card-foreground">{spot.name}</h4>
                  <Badge variant={spot.type === "public" ? "secondary" : "outline"}>{spot.type}</Badge>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 ">
                    <Navigation className="h-4 w-4" />
                    {spot.distance}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    {spot.price}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {spot.available}/{spot.total} available
                  </div>
                </div>

                <Link href={`/book/${spot.id}`}>
                  <Button className="w-full mt-3" size="sm" onClick>
                    Book Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
