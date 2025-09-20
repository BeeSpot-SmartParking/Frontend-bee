import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { requireRole } from "@/lib/auth"

export const GET = requireRole(["consumer", "company", "admin"])(async (request: NextRequest, user) => {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    let bookings
    if (user.type === "consumer" || userId) {
      const targetUserId = userId ? Number.parseInt(userId) : user.id
      bookings = await db.getBookingsByUser(targetUserId)
    } else {
      bookings = await db.getBookings()
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
})

export const POST = requireRole(["consumer"])(async (request: NextRequest, user) => {
  try {
    const bookingData = await request.json()

    // Generate QR code
    const qrCode = `QR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const booking = await db.createBooking({
      ...bookingData,
      user_id: user.id,
      qr_code: qrCode,
      payment_status: "completed",
      booking_status: "active",
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
})
