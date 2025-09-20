"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Mail, Phone, CheckCircle, X, Eye } from "lucide-react"
import { useState } from "react"

// Mock requests data
const requests = [
  {
    id: "REQ-001",
    type: "company_registration",
    companyName: "Acme Parking Solutions",
    contactName: "John Smith",
    email: "john@acmeparking.com",
    phone: "+1 (555) 123-4567",
    businessType: "parking-operator",
    description: "Large parking operator looking to expand digital presence",
    timestamp: "2024-01-15 09:30",
    status: "pending",
  },
  {
    id: "REQ-002",
    type: "plan_upgrade",
    companyName: "City Center Parking",
    contactName: "Jane Doe",
    email: "jane@citycenter.com",
    phone: "+1 (555) 987-6543",
    currentPlan: "Normal",
    requestedPlan: "Premium",
    reason: "Need promotional offers and advanced analytics",
    timestamp: "2024-01-14 16:20",
    status: "approved",
  },
  {
    id: "REQ-003",
    type: "company_registration",
    companyName: "Metro Mall Parking",
    contactName: "Mike Johnson",
    email: "mike@metromall.com",
    phone: "+1 (555) 456-7890",
    businessType: "retail-business",
    description: "Shopping mall with 500+ parking spaces",
    timestamp: "2024-01-14 11:45",
    status: "rejected",
    rejectionReason: "Incomplete documentation",
  },
  {
    id: "REQ-004",
    type: "plan_upgrade",
    companyName: "Downtown Valet Services",
    contactName: "Sarah Wilson",
    email: "sarah@downtownvalet.com",
    phone: "+1 (555) 321-0987",
    currentPlan: "Normal",
    requestedPlan: "Premium",
    reason: "Expanding to multiple locations, need advanced features",
    timestamp: "2024-01-13 14:15",
    status: "pending",
  },
]

export function RequestsManagement() {
  const [selectedType, setSelectedType] = useState("all")

  const filteredRequests = requests.filter((request) => {
    if (selectedType === "all") return true
    return request.type === selectedType
  })

  const handleApprove = (requestId: string) => {
    console.log("Approving request:", requestId)
    // Handle request approval
  }

  const handleReject = (requestId: string) => {
    console.log("Rejecting request:", requestId)
    // Handle request rejection
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="company_registration">Registrations</TabsTrigger>
          <TabsTrigger value="plan_upgrade">Plan Upgrades</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedType} className="mt-6">
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="h-5 w-5 text-chart-2" />
                        <h3 className="text-lg font-medium text-card-foreground">{request.companyName}</h3>
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        <Badge variant="outline">
                          {request.type === "company_registration" ? "Registration" : "Plan Upgrade"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Contact: {request.contactName}</p>
                      {request.type === "plan_upgrade" && (
                        <p className="text-sm text-muted-foreground">
                          {request.currentPlan} → {request.requestedPlan}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">ID: {request.id}</p>
                      <p className="text-xs text-muted-foreground">{request.timestamp}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{request.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{request.phone}</span>
                    </div>
                  </div>

                  {request.description && <p className="text-sm text-muted-foreground mb-4">{request.description}</p>}

                  {request.reason && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-card-foreground mb-1">Upgrade Reason:</p>
                      <p className="text-sm text-muted-foreground">{request.reason}</p>
                    </div>
                  )}

                  {request.rejectionReason && (
                    <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <p className="text-sm font-medium text-red-800 dark:text-red-400 mb-1">Rejection Reason:</p>
                      <p className="text-sm text-red-700 dark:text-red-300">{request.rejectionReason}</p>
                    </div>
                  )}

                  {request.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleApprove(request.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleReject(request.id)}>
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
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
