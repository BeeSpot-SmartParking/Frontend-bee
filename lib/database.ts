// Database connection and query utilities
// In a real application, you would use a proper database client like pg or prisma

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  license_plate: string
  emergency_contact?: string
  created_at: string
  updated_at: string
}

export interface Company {
  id: number
  company_name: string
  contact_name: string
  email: string
  phone: string
  address: string
  business_type: string
  description?: string
  plan_type: "normal" | "premium"
  status: "pending" | "approved" | "rejected"
  created_at: string
  updated_at: string
}

export interface ParkingLocation {
  id: number
  company_id: number
  name: string
  address: string
  total_spots: number
  available_spots: number
  price_per_hour: number
  location_type: "covered" | "outdoor" | "valet" | "reserved"
  status: "active" | "maintenance" | "inactive"
  features: string[]
  coordinates?: { lat: number; lng: number }
  rules: string[]
  images: string[]
  created_at: string
  updated_at: string
}

export interface Booking {
  id: number
  user_id: number
  location_id: number
  booking_date: string
  start_time: string
  end_time: string
  duration_hours: number
  vehicle_type: string
  license_plate: string
  total_amount: number
  payment_method: string
  payment_status: "pending" | "completed" | "failed"
  booking_status: "active" | "completed" | "cancelled"
  qr_code: string
  created_at: string
  updated_at: string
}

export interface Report {
  id: number
  user_id?: number
  report_type: "double-parking" | "illegal-parking" | "no-parking-request" | "damaged-spot" | "other"
  title: string
  description: string
  location: string
  reporter_contact?: string
  status: "pending" | "investigating" | "resolved" | "dismissed"
  priority: "low" | "medium" | "high"
  admin_notes?: string
  images: string[]
  created_at: string
  updated_at: string
}

export interface CompanyRequest {
  id: number
  company_id: number
  request_type: "registration" | "plan_upgrade"
  current_plan?: string
  requested_plan?: string
  reason?: string
  status: "pending" | "approved" | "rejected"
  admin_notes?: string
  created_at: string
  updated_at: string
}

// Mock database functions - in a real app, these would connect to your actual database
class MockDatabase {
  // Users
  async getUsers(): Promise<User[]> {
    // Mock implementation
    return []
  }

  async getUserById(id: number): Promise<User | null> {
    // Mock implementation
    return null
  }

  async getUserByEmail(email: string): Promise<User | null> {
    // Mock implementation
    return null
  }

  async createUser(userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
    // Mock implementation
    return { ...userData, id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  }

  // Companies
  async getCompanies(): Promise<Company[]> {
    // Mock implementation
    return []
  }

  async getCompanyById(id: number): Promise<Company | null> {
    // Mock implementation
    return null
  }

  async createCompany(companyData: Omit<Company, "id" | "created_at" | "updated_at">): Promise<Company> {
    // Mock implementation
    return { ...companyData, id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  }

  // Parking Locations
  async getParkingLocations(): Promise<ParkingLocation[]> {
    // Mock implementation
    return []
  }

  async getParkingLocationsByCompany(companyId: number): Promise<ParkingLocation[]> {
    // Mock implementation
    return []
  }

  async createParkingLocation(
    locationData: Omit<ParkingLocation, "id" | "created_at" | "updated_at">,
  ): Promise<ParkingLocation> {
    // Mock implementation
    return { ...locationData, id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    // Mock implementation
    return []
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    // Mock implementation
    return []
  }

  async createBooking(bookingData: Omit<Booking, "id" | "created_at" | "updated_at">): Promise<Booking> {
    // Mock implementation
    return { ...bookingData, id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  }

  // Reports
  async getReports(): Promise<Report[]> {
    // Mock implementation
    return []
  }

  async createReport(reportData: Omit<Report, "id" | "created_at" | "updated_at">): Promise<Report> {
    // Mock implementation
    return { ...reportData, id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  }

  // Company Requests
  async getCompanyRequests(): Promise<CompanyRequest[]> {
    // Mock implementation
    return []
  }

  async createCompanyRequest(
    requestData: Omit<CompanyRequest, "id" | "created_at" | "updated_at">,
  ): Promise<CompanyRequest> {
    // Mock implementation
    return { ...requestData, id: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
  }
}

export const db = new MockDatabase()
