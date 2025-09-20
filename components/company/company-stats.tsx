import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Car, DollarSign, Users, MapPin } from "lucide-react"

export function CompanyStats() {
  const stats = [
    {
      title: "Total Spots",
      value: "45",
      description: "5 locations",
      icon: MapPin,
      color: "text-chart-1",
      trend: { value: "+2", isPositive: true },
    },
    {
      title: "Occupancy Rate",
      value: "78%",
      description: "35/45 occupied",
      icon: Car,
      color: "text-chart-2",
      trend: { value: "+5%", isPositive: true },
    },
    {
      title: "Monthly Revenue",
      value: "$3,240",
      description: "+12% from last month",
      icon: DollarSign,
      color: "text-chart-3",
      trend: { value: "+$380", isPositive: true },
    },
    {
      title: "Active Bookings",
      value: "28",
      description: "Current reservations",
      icon: Users,
      color: "text-chart-4",
      trend: { value: "-3", isPositive: false },
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className={`flex items-center text-xs ${stat.trend.isPositive ? "text-green-600" : "text-red-600"}`}>
                {stat.trend.isPositive ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {stat.trend.value}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
