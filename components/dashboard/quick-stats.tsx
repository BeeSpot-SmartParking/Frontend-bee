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
      color: "text-chart-1",
      trend: "+3 from yesterday",
      status: "available",
    },
    {
      title: "Active Booking",
      value: "1",
      description: "Expires in 2h 15m",
      icon: Clock,
      color: "text-chart-2",
      trend: "Ending soon",
      status: "active",
    },
    {
      title: "Monthly Spent",
      value: "$45",
      description: "+12% from last month",
      icon: CreditCard,
      color: "text-chart-3",
      trend: "+$5 this week",
      status: "increase",
    },
    {
      title: "Favorite Spots",
      value: "8",
      description: "Saved locations",
      icon: Star,
      color: "text-chart-4",
      trend: "2 new this month",
      status: "neutral",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-slate-200 bg-green shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900">{stat.title}</CardTitle>
            <div className="flex items-center gap-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <Badge variant={stat.status === "active" ? "default" : "secondary"} className="text-xs">
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
            <div className="text-2xl font-bold text-card-foreground mb-1">{stat.value}</div>
            <p className="text-xs text-muted-foreground mb-1">{stat.description}</p>
            <p className="text-xs text-primary font-medium">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
