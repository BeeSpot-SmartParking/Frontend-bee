import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Building2, Shield, MapPin, Clock, Star, Users } from "lucide-react"




export default function HomePage() {
  const features = [
    {
      icon: MapPin,
      title: "Smart Location Finding",
      description: "AI-powered parking spot recommendations based on your preferences and real-time availability.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Live parking availability updates and instant booking confirmations.",
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Save favorite spots, get priority booking, and enjoy seamless payment processing.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of users sharing parking spaces and building a better parking ecosystem.",
    },
  ]

  return (
    
    <div className="min-h-screen ">

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Car className="h-4 w-4" />
            Smart Parking Solutions
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
            Find Perfect Parking
            <span className="text-primary block">Every Time</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-8">
            Streamline parking operations with our comprehensive management platform. Whether you're looking for a spot,
            managing spaces, or overseeing operations - we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card/50 hover:bg-card transition-colors text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Access Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-border bg-card hover:bg-accent/50 transition-colors group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-card-foreground text-xl">Consumer Portal</CardTitle>
              <CardDescription className="text-base ">
                Find and book parking spots with ease. Real-time availability and instant confirmations.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/login">
                <Button className="w-full" size="lg">
                  Access Consumer Portal
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-2">
                New user?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Create account
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card className=" bg-card hover:bg-accent/50 transition-colors group">
            <CardHeader className="text-center">
              <div className="border-2  mx-auto mb-4 p-4 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-card-foreground text-xl">Company Dashboard</CardTitle>
              <CardDescription className="text-base">
                Manage your parking spaces, track revenue, and optimize occupancy rates.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/company/login">
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  Company Login
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-2">
                New partner?{" "}
                <Link href="/company/register" className="text-primary hover:underline">
                  Register company
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:bg-accent/50 transition-colors group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/20 transition-colors">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-card-foreground text-xl">Admin Panel</CardTitle>
              <CardDescription className="text-base">
                Oversee system operations, monitor analytics, and manage platform health.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/admin/login">
                <Button variant="secondary" className="w-full" size="lg">
                  Admin Access
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Trusted by Thousands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1.2M+</div>
              <div className="text-muted-foreground">Bookings Made</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
