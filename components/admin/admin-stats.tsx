import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, Building2, DollarSign, AlertTriangle } from "lucide-react"

export function AdminStats() {
  const stats = [
    {
      title: "Total Bookings",
      value: "12,847",
      description: "This month",
      icon: Users,
      color: "text-chart-1",
      trend: { value: "+15%", isPositive: true },
    },
    {
      title: "Active Companies",
      value: "156",
      description: "Registered partners",
      icon: Building2,
      color: "text-chart-2",
      trend: { value: "+8", isPositive: true },
    },
    {
      title: "Platform Revenue",
      value: "$48,320",
      description: "Monthly total",
      icon: DollarSign,
      color: "text-chart-3",
      trend: { value: "+22%", isPositive: true },
    },
    {
      title: "Pending Signals",
      value: "23",
      description: "Require attention",
      icon: AlertTriangle,
      color: "text-orange-500",
      trend: { value: "-5", isPositive: true },
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
