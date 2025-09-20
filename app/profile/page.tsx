import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProfileForm } from "@/components/profile/profile-form"
import { ReportsForm } from "@/components/profile/reports-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account and submit reports</p>
        </div>

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="profile"  className="back">Profile</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your account details and vehicle information</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Submit Report</CardTitle>
                <CardDescription>Report parking violations or request no-parking zones</CardDescription>
              </CardHeader>
              <CardContent>
                <ReportsForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
