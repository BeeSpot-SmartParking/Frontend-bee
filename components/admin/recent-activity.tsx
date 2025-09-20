import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, User, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "company_registration",
    title: "New company registration",
    description: "Acme Parking Solutions submitted registration",
    timestamp: "2 minutes ago",
    status: "pending",
    icon: Building2,
  },
  {
    id: 2,
    type: "signal_resolved",
    title: "Parking violation resolved",
    description: "Double parking report at Downtown Plaza - resolved",
    timestamp: "15 minutes ago",
    status: "resolved",
    icon: CheckCircle,
  },
  {
    id: 3,
    type: "user_report",
    title: "New anomaly report",
    description: "Illegal parking reported at Business Center",
    timestamp: "1 hour ago",
    status: "pending",
    icon: AlertTriangle,
  },
  {
    id: 4,
    type: "plan_upgrade",
    title: "Plan upgrade request",
    description: "City Parking Co. requested Premium plan upgrade",
    timestamp: "2 hours ago",
    status: "approved",
    icon: Building2,
  },
  {
    id: 5,
    type: "user_registration",
    title: "New user registration",
    description: "125 new users registered today",
    timestamp: "3 hours ago",
    status: "info",
    icon: User,
  },
]

export function RecentActivity() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "resolved":
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "company_registration":
      case "plan_upgrade":
        return "text-chart-2"
      case "signal_resolved":
        return "text-green-500"
      case "user_report":
        return "text-orange-500"
      case "user_registration":
        return "text-chart-1"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
              <div className={`p-2 rounded-full bg-background`}>
                <activity.icon className={`h-4 w-4 ${getIconColor(activity.type)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-card-foreground">{activity.title}</h4>
                  <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
