// components/QuickStats.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, CreditCard, Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface QuickStatsProps {
  isLoading?: boolean
}

export function QuickStats({ isLoading = false }: QuickStatsProps) {
  const stats = [
    {
      title: "Available Spots",
      value: "24",
      description: "Within 1km radius",
      icon: MapPin,
      // Removed stat.color property to use a static color class below
      trend: "+3 from yesterday",
      status: "available",
    },
    {
      title: "Active Booking",
      value: "1",
      description: "Expires in 2h 15m",
      icon: Clock,
      trend: "Ending soon",
      status: "active",
    },
    {
      title: "Monthly Spent",
      value: "$45",
      description: "+12% from last month",
      icon: CreditCard,
      trend: "+$5 this week",
      status: "increase",
    },
    {
      title: "Favorite Spots",
      value: "8",
      description: "Saved locations",
      icon: Star,
      trend: "2 new this month",
      status: "neutral",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-400">
        {Array.from({ length: 4 }).map((_, i) => (
          // The skeleton cards already use shades of gray
          <Card key={i} className="border-slate-200 bg-gray-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24 bg-gray-300" />
              <Skeleton className="h-4 w-4 rounded bg-gray-300" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2 bg-gray-400" />
              <Skeleton className="h-3 w-32 bg-gray-200" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-slate-200 bg-white hover:bg-gray-50 transition-colors shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            {/* Changed text color to a darker gray */}
            <CardTitle className="text-l font-bold text-gray-900">{stat.title}</CardTitle>
            <div className="flex items-center gap-2">
              {/* Changed icon color to a single gray shade */}
              <stat.icon className="h-4 w-4 text-gray-400" />
              {/* Updated badge styles for gray consistency */}
              <Badge variant="secondary" className="text-xs text-gray-600 bg-gray-100 hover:bg-gray-200">
                {stat.status === "available"
                  ? "Live"
                  : stat.status === "active"
                    ? "Active"
                    : stat.status === "increase"
                      ? "↑"
                      : "New"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {/* Changed value and description text colors */}
            <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <p className="text-xs text-gray-500 mb-1">{stat.description}</p>
            {/* Changed trend text color to a dark gray */}
            <p className="text-xs text-gray-700 font-medium">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}