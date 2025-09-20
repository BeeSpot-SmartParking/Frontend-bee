import { CompanyRegisterForm } from "@/components/auth/company-register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CompanyRegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-border bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-card-foreground">Register Your Company</CardTitle>
          <CardDescription>Join BeeSpot to manage your parking spaces</CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyRegisterForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/company/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
