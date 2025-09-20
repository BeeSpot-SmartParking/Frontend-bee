// Authentication utilities and middleware
import { type NextRequest, NextResponse } from "next/server"

export interface AuthUser {
  id: number
  email: string
  name: string
  type: "consumer" | "company" | "admin"
}

// Mock authentication functions - in a real app, use proper JWT/session management
export class AuthService {
  static async login(
    email: string,
    password: string,
    userType: "consumer" | "company" | "admin",
  ): Promise<AuthUser | null> {
    // Mock authentication logic
    // In a real app, verify credentials against database

    if (email && password) {
      return {
        id: 1,
        email,
        name: userType === "admin" ? "System Admin" : "John Doe",
        type: userType,
      }
    }

    return null
  }

  static async register(
    userData: {
      name: string
      email: string
      password: string
      licensePlate?: string
      companyName?: string
    },
    userType: "consumer" | "company",
  ): Promise<AuthUser | null> {


    return {
      id: 1,
      email: userData.email,
      name: userData.name,
      type: userType,
    }
  }

  static async getCurrentUser(token: string): Promise<AuthUser | null> {
    // Mock token verification
    // In a real app, verify JWT token

    if (token) {
      return {
        id: 1,
        email: "user@example.com",
        name: "John Doe",
        type: "consumer",
      }
    }

    return null
  }

  static generateToken(user: AuthUser): string {
    // Mock token generation
    // In a real app, generate proper JWT
    return `mock_token_${user.id}_${user.type}`
  }
}

// Middleware for protecting routes
export function withAuth(handler: (req: NextRequest, user: AuthUser) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const token = req.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await AuthService.getCurrentUser(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    return handler(req, user)
  }
}

// Role-based access control
export function requireRole(allowedRoles: Array<"consumer" | "company" | "admin">) {
  return (handler: (req: NextRequest, user: AuthUser) => Promise<NextResponse>) => {
    return withAuth(async (req: NextRequest, user: AuthUser) => {
      if (!allowedRoles.includes(user.type)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
      }

      return handler(req, user)
    })
  }
}
