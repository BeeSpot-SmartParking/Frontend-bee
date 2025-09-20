// components/BookingForm.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar, CreditCard, Car } from "lucide-react"
import { useRouter } from "next/navigation"

interface BookingFormProps {
  parkingId: string
  parkingData: {
    name: string
    price: string
    type: string
  }
}

export function BookingForm({ parkingId, parkingData }: BookingFormProps) {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    duration: "",
    vehicleType: "",
    licensePlate: "ABC-123",
    paymentMethod: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. Send form data to your backend API to create a reservation
      const reservationData = {
        parkingId,
        ...formData,
      };

      const response = await fetch("http://localhost:3000/api/payment/initiate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // 2. Log the data and redirect to the payment URL
      console.log("Payment initiation response:", data);

      // Check for the paymentUrl in the response and redirect the user
      if (data.paymentUrl) {
        // Redirecting to an external URL
        window.location.href = data.paymentUrl;
      } else {
        // Handle cases where no payment URL is returned
        console.error("No payment URL found in the response.");
        alert("Payment initiation failed. Please try again.");
      }

    } catch (error) {
      console.error('Error during payment initiation:', error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Make sure to turn off loading state
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTotal = () => {
    const hourlyRate = Number.parseFloat(parkingData.price.replace("$", "").replace("/hour", ""))
    const duration = Number.parseFloat(formData.duration) || 0
    return (hourlyRate * duration).toFixed(2)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* ... (Your form elements are unchanged) ... */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
          <Calendar className="h-4 w-4" />
          Date & Time
        </div>
        <div className="space-y-3">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration (hours)</Label>
            <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="2">2 hours</SelectItem>
                <SelectItem value="3">3 hours</SelectItem>
                <SelectItem value="4">4 hours</SelectItem>
                <SelectItem value="6">6 hours</SelectItem>
                <SelectItem value="8">8 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
          <Car className="h-4 w-4" />
          Vehicle Details
        </div>
        <div className="space-y-3">
          <div>
            <Label htmlFor="vehicleType">Vehicle Type</Label>
            <Select value={formData.vehicleType} onValueChange={(value) => handleChange("vehicleType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">Compact Car</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
                <SelectItem value="motorcycle">Motorcycle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="licensePlate">License Plate</Label>
            <Input
              id="licensePlate"
              value={formData.licensePlate}
              onChange={(e) => handleChange("licensePlate", e.target.value)}
              placeholder="Enter license plate"
              required
            />
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
          <CreditCard className="h-4 w-4" />
          Payment Method
        </div>
        <Select value={formData.paymentMethod} onValueChange={(value) => handleChange("paymentMethod", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="card">Credit/Debit Card</SelectItem>
            <SelectItem value="guidini">Guidini Pay</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <div className="space-y-3">
        <h4 className="font-medium text-card-foreground">Booking Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="text-card-foreground">{parkingData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rate:</span>
            <span className="text-card-foreground">{parkingData.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration:</span>
            <span className="text-card-foreground">{formData.duration || "0"} hours</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium">
            <span className="text-card-foreground">Total:</span>
            <span className="text-card-foreground">${calculateTotal()}</span>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isLoading || !formData.date || !formData.startTime || !formData.duration || !formData.paymentMethod}
      >
        {isLoading ? "Processing..." : `Book Now - $${calculateTotal()}`}
      </Button>
    </form>
  )
}