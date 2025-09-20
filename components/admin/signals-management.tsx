"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, MapPin, Calendar, User, CheckCircle, X } from "lucide-react"
import { useState } from "react"

// Mock signals data
const signals = [
  {
    id: "SIG-001",
    type: "double-parking",
    title: "Double Parking Violation",
    description: "Vehicle blocking two parking spaces at Downtown Plaza",
    location: "Downtown Plaza, Level 1, Spot 15-16",
    reportedBy: "John Doe",
    reporterEmail: "john@example.com",
    timestamp: "2024-01-15 14:30",
    status: "pending",
    priority: "high",
    images: ["/placeholder.svg"],
  },
  {
    id: "SIG-002",
    type: "illegal-parking",
    title: "Illegal Parking in Disabled Space",
    description: "Non-disabled vehicle parked in handicapped spot",
    location: "Business Center, Entrance Area",
    reportedBy: "Jane Smith",
    reporterEmail: "jane@example.com",
    timestamp: "2024-01-15 12:15",
    status: "investigating",
    priority: "high",
    images: [],
  },
  {
    id: "SIG-003",
    type: "no-parking-request",
    title: "No Parking Zone Request",
    description: "Request to establish no-parking zone in front of residential property",
    location: "123 Oak Street, Residential Area",
    reportedBy: "Mike Johnson",
    reporterEmail: "mike@example.com",
    timestamp: "2024-01-14 16:45",
    status: "pending",
    priority: "medium",
    images: [],
  },
  {
    id: "SIG-004",
    type: "damaged-spot",
    title: "Damaged Parking Surface",
    description: "Large pothole making parking spot unusable",
    location: "Shopping Mall, Section C, Spot 45",
    reportedBy: "Sarah Wilson",
    reporterEmail: "sarah@example.com",
    timestamp: "2024-01-14 10:20",
    status: "resolved",
    priority: "medium",
    images: [],
  },
]

export function SignalsManagement() {
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredSignals = signals.filter((signal) => {
    if (selectedStatus === "all") return true
    return signal.status === selectedStatus
  })

  const handleResolve = (signalId: string) => {
    console.log("Resolving signal:", signalId)
    // Handle signal resolution
  }

  const handleDismiss = (signalId: string) => {
    console.log("Dismissing signal:", signalId)
    // Handle signal dismissal
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "investigating":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="investigating">Active</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedStatus} className="mt-6">
          <div className="space-y-4">
            {filteredSignals.map((signal) => (
              <Card key={signal.id} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        <h3 className="text-lg font-medium text-card-foreground">{signal.title}</h3>
                        <Badge className={getPriorityColor(signal.priority)}>{signal.priority}</Badge>
                        <Badge className={getStatusColor(signal.status)}>{signal.status}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{signal.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">ID: {signal.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{signal.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{signal.reportedBy}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{signal.timestamp}</span>
                    </div>
                  </div>

                  {signal.status !== "resolved" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleResolve(signal.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark Resolved
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDismiss(signal.id)}>
                        <X className="mr-2 h-4 w-4" />
                        Dismiss
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Reporter
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
