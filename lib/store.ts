"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// User store for authentication and user data
interface UserState {
  user: {
    id: number
    name: string
    email: string
    type: "consumer" | "company" | "admin"
  } | null
  isAuthenticated: boolean
  login: (user: UserState["user"]) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user-storage",
    },
  ),
)

// Parking store for parking locations and availability
interface ParkingState {
  locations: Array<{
    id: number
    name: string
    address: string
    available: number
    total: number
    price: string
    type: string
    distance: string
    rating: number
    features: string[]
  }>
  selectedLocation: number | null
  filters: {
    type: string
    maxPrice: number
    features: string[]
  }
  setLocations: (locations: ParkingState["locations"]) => void
  setSelectedLocation: (id: number | null) => void
  updateFilters: (filters: Partial<ParkingState["filters"]>) => void
}

export const useParkingStore = create<ParkingState>((set) => ({
  locations: [],
  selectedLocation: null,
  filters: {
    type: "all",
    maxPrice: 100,
    features: [],
  },
  setLocations: (locations) => set({ locations }),
  setSelectedLocation: (id) => set({ selectedLocation: id }),
  updateFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}))

// Booking store for managing reservations
interface BookingState {
  activeBookings: Array<{
    id: string
    location: string
    date: string
    time: string
    qrCode: string
    status: string
  }>
  bookingHistory: Array<{
    id: string
    location: string
    date: string
    time: string
    amount: string
    status: string
  }>
  currentBooking: {
    locationId: number | null
    date: string
    startTime: string
    duration: string
    vehicleType: string
    licensePlate: string
    paymentMethod: string
  } | null
  setActiveBookings: (bookings: BookingState["activeBookings"]) => void
  setBookingHistory: (history: BookingState["bookingHistory"]) => void
  setCurrentBooking: (booking: BookingState["currentBooking"]) => void
  clearCurrentBooking: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  activeBookings: [],
  bookingHistory: [],
  currentBooking: null,
  setActiveBookings: (bookings) => set({ activeBookings: bookings }),
  setBookingHistory: (history) => set({ bookingHistory: history }),
  setCurrentBooking: (booking) => set({ currentBooking: booking }),
  clearCurrentBooking: () => set({ currentBooking: null }),
}))

// Admin store for managing system data
interface AdminState {
  stats: {
    totalBookings: number
    activeCompanies: number
    platformRevenue: number
    pendingSignals: number
  }
  signals: Array<{
    id: string
    type: string
    title: string
    status: string
    priority: string
    timestamp: string
  }>
  requests: Array<{
    id: string
    type: string
    companyName: string
    status: string
    timestamp: string
  }>
  setStats: (stats: AdminState["stats"]) => void
  setSignals: (signals: AdminState["signals"]) => void
  setRequests: (requests: AdminState["requests"]) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  stats: {
    totalBookings: 0,
    activeCompanies: 0,
    platformRevenue: 0,
    pendingSignals: 0,
  },
  signals: [],
  requests: [],
  setStats: (stats) => set({ stats }),
  setSignals: (signals) => set({ signals }),
  setRequests: (requests) => set({ requests }),
}))

// Company store for managing company data
interface CompanyState {
  companyInfo: {
    id: number
    name: string
    plan: "normal" | "premium"
    status: string
  } | null
  parkingSpots: Array<{
    id: number
    name: string
    totalSpots: number
    availableSpots: number
    price: string
    status: string
    type: string
  }>
  recentBookings: Array<{
    id: string
    customerName: string
    location: string
    date: string
    amount: string
    status: string
  }>
  stats: {
    totalSpots: number
    occupancyRate: number
    monthlyRevenue: number
    activeBookings: number
  }
  setCompanyInfo: (info: CompanyState["companyInfo"]) => void
  setParkingSpots: (spots: CompanyState["parkingSpots"]) => void
  setRecentBookings: (bookings: CompanyState["recentBookings"]) => void
  setStats: (stats: CompanyState["stats"]) => void
}

export const useCompanyStore = create<CompanyState>((set) => ({
  companyInfo: null,
  parkingSpots: [],
  recentBookings: [],
  stats: {
    totalSpots: 0,
    occupancyRate: 0,
    monthlyRevenue: 0,
    activeBookings: 0,
  },
  setCompanyInfo: (info) => set({ companyInfo: info }),
  setParkingSpots: (spots) => set({ parkingSpots: spots }),
  setRecentBookings: (bookings) => set({ recentBookings: bookings }),
  setStats: (stats) => set({ stats }),
}))
