"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ReportsForm() {
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    description: "",
    contactInfo: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Reset form and show success message
      setFormData({
        type: "",
        location: "",
        description: "",
        contactInfo: "",
      })
    }, 1000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="report-type">Report Type</Label>
        <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="double-parking">Double Parking</SelectItem>
            <SelectItem value="illegal-parking">Illegal Parking</SelectItem>
            <SelectItem value="no-parking-request">No Parking Zone Request</SelectItem>
            <SelectItem value="damaged-spot">Damaged Parking Spot</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="Enter the location or address"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Provide details about the issue..."
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Contact Information (Optional)</Label>
        <Input
          id="contact"
          placeholder="Phone or email for follow-up"
          value={formData.contactInfo}
          onChange={(e) => handleChange("contactInfo", e.target.value)}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Report"}
      </Button>
    </form>
  )
}
