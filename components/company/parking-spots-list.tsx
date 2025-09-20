"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Trash2, Plus, Eye } from "lucide-react"
import { useState } from "react"

// Mock parking spots data
const parkingSpots = [
  {
    id: 1,
    name: "Downtown Plaza - Level 1",
    address: "123 Main St, Downtown",
    totalSpots: 25,
    availableSpots: 8,
    price: "$2.00/hour",
    status: "active",
    type: "covered",
  },
  {
    id: 2,
    name: "Downtown Plaza - Level 2",
    address: "123 Main St, Downtown",
    totalSpots: 25,
    availableSpots: 15,
    price: "$2.00/hour",
    status: "active",
    type: "covered",
  },
  {
    id: 3,
    name: "Business Center Lot",
    address: "456 Business Ave",
    totalSpots: 50,
    availableSpots: 32,
    price: "$1.50/hour",
    status: "active",
    type: "outdoor",
  },
  {
    id: 4,
    name: "Premium Valet Section",
    address: "789 Executive Dr",
    totalSpots: 15,
    availableSpots: 5,
    price: "$5.00/hour",
    status: "maintenance",
    type: "valet",
  },
]

export function ParkingSpotsList() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSpot, setNewSpot] = useState({
    name: "",
    address: "",
    totalSpots: "",
    price: "",
    type: "",
  })

  const handleAddSpot = () => {
    // Handle adding new parking spot
    console.log("Adding new spot:", newSpot)
    setIsAddDialogOpen(false)
    setNewSpot({ name: "", address: "", totalSpots: "", price: "", type: "" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Your Parking Locations</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Parking Location</DialogTitle>
              <DialogDescription>Create a new parking spot listing for your customers.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="spot-name">Location Name</Label>
                <Input
                  id="spot-name"
                  placeholder="e.g., Downtown Plaza - Level 1"
                  value={newSpot.name}
                  onChange={(e) => setNewSpot((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="spot-address">Address</Label>
                <Input
                  id="spot-address"
                  placeholder="Full address"
                  value={newSpot.address}
                  onChange={(e) => setNewSpot((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="total-spots">Total Spots</Label>
                  <Input
                    id="total-spots"
                    type="number"
                    placeholder="25"
                    value={newSpot.totalSpots}
                    onChange={(e) => setNewSpot((prev) => ({ ...prev, totalSpots: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="spot-price">Price per Hour</Label>
                  <Input
                    id="spot-price"
                    placeholder="$2.00"
                    value={newSpot.price}
                    onChange={(e) => setNewSpot((prev) => ({ ...prev, price: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="spot-type">Type</Label>
                <Select
                  value={newSpot.type}
                  onValueChange={(value) => setNewSpot((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="covered">Covered</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="valet">Valet</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddSpot} className="flex-1">
                  Add Location
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {parkingSpots.map((spot) => (
          <Card key={spot.id} className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-medium text-card-foreground">{spot.name}</h4>
                    <Badge
                      variant={spot.status === "active" ? "default" : "secondary"}
                      className={
                        spot.status === "maintenance"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                          : ""
                      }
                    >
                      {spot.status}
                    </Badge>
                    <Badge variant="outline">{spot.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{spot.address}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Occupancy:{" "}
                      <span className="font-medium text-card-foreground">
                        {spot.totalSpots - spot.availableSpots}/{spot.totalSpots}
                      </span>
                    </span>
                    <span className="text-muted-foreground">
                      Rate: <span className="font-medium text-card-foreground">{spot.price}</span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${((spot.totalSpots - spot.availableSpots) / spot.totalSpots) * 100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round(((spot.totalSpots - spot.availableSpots) / spot.totalSpots) * 100)}% occupied
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
