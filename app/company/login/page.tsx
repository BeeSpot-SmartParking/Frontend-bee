import { CompanyLoginForm } from "@/components/auth/company-login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function CompanyLoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-card-foreground">Company Login</CardTitle>
          <CardDescription>Access your parking management dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyLoginForm />
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              New company?{" "}
              <Link href="/company/register" className="text-primary hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
