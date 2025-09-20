import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const currentUser = await AuthService.getCurrentUser(token)
    if (!currentUser) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { name, email, phone, licensePlate, emergencyContact, currentPassword, newPassword } = body

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // If changing password, validate current password
    if (newPassword && !currentPassword) {
      return NextResponse.json({ error: "Current password is required to change password" }, { status: 400 })
    }

    // Update user profile (mock implementation)
    const updatedUser = {
      ...currentUser,
      name,
      email,
      phone,
      licensePlate,
      emergencyContact,
    }

    // In a real app, update the database here
    // If password is being changed, hash and store the new password

    return NextResponse.json({
      user: updatedUser,
      message: "Profile updated successfully",
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
