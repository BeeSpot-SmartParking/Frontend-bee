import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const companyId = searchParams.get("companyId")

    let locations
    if (companyId) {
      locations = await db.getParkingLocationsByCompany(Number.parseInt(companyId))
    } else {
      locations = await db.getParkingLocations()
    }

    return NextResponse.json({ locations })
  } catch (error) {
    console.error("Error fetching parking locations:", error)
    return NextResponse.json({ error: "Failed to fetch parking locations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const locationData = await request.json()

    // In a real app, validate the user has permission to create locations
    const location = await db.createParkingLocation(locationData)

    return NextResponse.json({ location }, { status: 201 })
  } catch (error) {
    console.error("Error creating parking location:", error)
    return NextResponse.json({ error: "Failed to create parking location" }, { status: 500 })
  }
}
