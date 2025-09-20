"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Search } from "lucide-react"

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)

    // Mock geocoding - in real app, use Google Maps Geocoding API
    setTimeout(() => {
      const mockLocation = {
        lat: 40.7128 + (Math.random() - 0.5) * 0.1,
        lng: -74.006 + (Math.random() - 0.5) * 0.1,
        address: searchQuery,
      }
      onLocationSelect(mockLocation)
      setIsLoading(false)
    }, 1000)
  }

  const getCurrentLocation = () => {
    setIsLoading(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: "Current Location",
          }
          onLocationSelect(location)
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)
        },
      )
    } else {
      console.error("Geolocation is not supported")
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Find Parking Near You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location">Enter your destination</Label>
          <div className="flex gap-2">
            <Input
              id="location"
              placeholder="Enter address or landmark..."
              value={searchQuery}
              className="border-1 border-gray-400"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading || !searchQuery.trim()}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-border"></div>
          <span className="text-l text-muted-foreground">or</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        <Button variant="outline" onClick={getCurrentLocation} disabled={isLoading} className="w-full bg-gray-200">
          <Navigation className="h-4 w-4 mr-2" />
          Use Current Location
        </Button>
      </CardContent>
    </Card>
  )
}
