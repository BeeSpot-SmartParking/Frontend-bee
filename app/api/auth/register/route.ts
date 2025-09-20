import { type NextRequest, NextResponse } from "next/server"
import { AuthService } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, userType, licensePlate, companyName } = body

    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: "Name, email, password, and user type are required" }, { status: 400 })
    }

    if (userType === "consumer" && !licensePlate) {
      return NextResponse.json({ error: "License plate is required for consumers" }, { status: 400 })
    }

    if (userType === "company" && !companyName) {
      return NextResponse.json({ error: "Company name is required for companies" }, { status: 400 })
    }

    const user = await AuthService.register(
      {
        name,
        email,
        password,
        licensePlate,
        companyName,
      },
      userType,
    )

    if (!user) {
      return NextResponse.json({ error: "Registration failed" }, { status: 400 })
    }

    const token = AuthService.generateToken(user)

    return NextResponse.json({
      user,
      token,
      message: "Registration successful",
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
