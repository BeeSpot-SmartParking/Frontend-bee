"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ParkingMap } from "@/components/dashboard/parking-map"
import { ParkingList } from "@/components/dashboard/parking-list"
import { QuickStats } from "@/components/dashboard/quick-stats"
import { LocationSearch } from "@/components/dashboard/location-search"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

export default function DashboardPage() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
    address: string
  } | null>(null)

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setSelectedLocation(location)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Parking</h1>
          <p className="text-muted-foreground">Discover available parking spots near you</p>
        </div>

        <QuickStats />

        <div className="mt-6">
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>

        <Tabs defaultValue="map" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-6">
            <ParkingMap selectedLocation={selectedLocation} />
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <ParkingList selectedLocation={selectedLocation} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
