"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    matricule: "",
    emergencyContact: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        matricule: user.licensePlate || "",
        emergencyContact: user.emergencyContact || "",
      }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setMessage("")

    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmNewPassword) {
        setError("New passwords do not match")
        setIsLoading(false)
        return
      }
      if (formData.newPassword.length < 6) {
        setError("New password must be at least 6 characters long")
        setIsLoading(false)
        return
      }
      if (!formData.currentPassword) {
        setError("Current password is required to change password")
        setIsLoading(false)
        return
      }
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          licensePlate: formData.matricule,
          emergencyContact: formData.emergencyContact,
          currentPassword: formData.currentPassword || undefined,
          newPassword: formData.newPassword || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Update failed")
      }

      localStorage.setItem("user", JSON.stringify(data.user))

      setMessage("Profile updated successfully!")

      // Clear password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={formData.name} className="border-2 border-gray-400" onChange={(e) => handleChange("name", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            className="border-2 border-gray-400"
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="0778923299" className="border-2 border-gray-400" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="matricule">License Plate</Label>
          <Input
            id="matricule"
            value={formData.matricule}   placeholder="0778923299" className="border-2 border-gray-400"
            onChange={(e) => handleChange("matricule", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="emergency">Emergency Contact</Label>
        <Input
          id="emergency"
          value={formData.emergencyContact} className="border-2 border-gray-400"
          onChange={(e) => handleChange("emergencyContact", e.target.value)}
          placeholder="Name - Phone Number"
        />
      </div>

      <div className="border-t pt-4 mt-6">
        <h3 className="text-lg font-medium mb-4" >Change Password</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"  className="border-2 border-gray-400"
              value={formData.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              placeholder="Enter current password"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                className="border-2 border-gray-400"
                value={formData.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                className="border-2 border-gray-400"
                value={formData.confirmNewPassword}
                onChange={(e) => handleChange("confirmNewPassword", e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  )
}
