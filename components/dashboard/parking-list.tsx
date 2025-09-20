"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Clock, Star, Target } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Mock parking data
const allParkingSpots = [
  {
    id: 1,
    name: "Downtown Plaza",
    type: "public",
    address: "123 Main St, Downtown",
    distance: "0.2 km",
    price: "$2/hour",
    available: 15,
    total: 50,
    rating: 4.5,
    features: ["24/7", "Security", "Covered"],
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 2,
    name: "Business Center",
    type: "organized",
    address: "456 Business Ave",
    distance: "0.5 km",
    price: "$3/hour",
    available: 8,
    total: 25,
    rating: 4.8,
    features: ["Valet", "EV Charging", "Reserved"],
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  {
    id: 3,
    name: "Shopping Mall",
    type: "public",
    address: "789 Commerce Blvd",
    distance: "0.8 km",
    price: "$1.5/hour",
    available: 32,
    total: 100,
    rating: 4.2,
    features: ["Free 1st hour", "Shopping validation"],
    coordinates: { lat: 40.7505, lng: -73.9934 },
  },
  {
    id: 4,
    name: "City Center Garage",
    type: "organized",
    address: "321 Center St",
    distance: "1.2 km",
    price: "$2.5/hour",
    available: 45,
    total: 200,
    rating: 4.6,
    features: ["Multi-level", "Elevator", "CCTV"],
    coordinates: { lat: 40.7614, lng: -73.9776 },
  },
  {
    id: 5,
    name: "Metro Station",
    type: "public",
    address: "555 Transit Way",
    distance: "1.5 km",
    price: "$1/hour",
    available: 28,
    total: 80,
    rating: 4.0,
    features: ["Transit access", "24/7", "Budget-friendly"],
    coordinates: { lat: 40.7282, lng: -73.9942 },
  },
]

interface ParkingListProps {
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

export function ParkingList({ selectedLocation }: ParkingListProps) {
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">
          {selectedLocation ? (
            <span className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Near {selectedLocation.address}
            </span>
          ) : (
            "Available Parking Spots"
          )}
        </h3>
        <p className="text-sm text-muted-foreground">{filteredSpots.length} locations found</p>
      </div>

      {filteredSpots.length === 0 ? (
        <Card className="border-border bg-card">
          <CardContent className="p-8 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-card-foreground mb-2">No parking spots found</h4>
            <p className="text-muted-foreground">Try searching a different location or expand your search radius</p>
          </CardContent>
        </Card>
      ) : (
        filteredSpots.map((spot) => (
          <Card key={spot.id} className="border-border bg-card hover:bg-accent/50 transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-medium text-card-foreground">{spot.name}</h4>
                    <Badge variant={spot.type === "public" ? "secondary" : "outline"}>{spot.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{spot.address}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{spot.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-card-foreground">{spot.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {spot.available}/{spot.total} available
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  {spot.distance} away
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Available now
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {spot.features.map((feature) => (
                  <Badge key={feature} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Link href={`/book/${spot.id}`} className="flex-1">
                  <Button className="w-full">Book Now</Button>
                </Link>
                <Button variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
