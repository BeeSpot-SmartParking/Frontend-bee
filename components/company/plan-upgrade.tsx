import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap } from "lucide-react"

const plans = [
  {
    name: "Normal",
    price: "Free",
    description: "Perfect for small parking operations",
    features: [
      "Up to 25 parking spots",
      "Basic listing management",
      "Standard customer support",
      "Basic analytics",
      "Mobile app access",
    ],
    limitations: ["No promotional offers", "Limited customization", "Basic reporting only"],
    current: true,
    popular: false,
  },
  {
    name: "Premium",
    price: "$49/month",
    description: "Advanced features for growing businesses",
    features: [
      "Unlimited parking spots",
      "Advanced listing management",
      "Priority customer support",
      "Advanced analytics & insights",
      "Mobile app access",
      "Create promotional offers",
      "Discount campaigns",
      "Subscription packages",
      "Custom branding",
      "API access",
      "Advanced reporting",
    ],
    limitations: [],
    current: false,
    popular: true,
  },
]

export function PlanUpgrade() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Choose Your Plan</h2>
        <p className="text-muted-foreground">Unlock advanced features to grow your parking business</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`border-border bg-card relative ${plan.popular ? "ring-2 ring-primary" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CardTitle className="text-2xl text-card-foreground">{plan.name}</CardTitle>
                {plan.current && <Badge variant="secondary">Current Plan</Badge>}
              </div>
              <div className="text-3xl font-bold text-card-foreground mb-2">{plan.price}</div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium text-card-foreground mb-3">Features included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {plan.limitations.length > 0 && (
                <div>
                  <h4 className="font-medium text-card-foreground mb-3">Limitations:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        </div>
                        <span className="text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Button className="w-full" variant={plan.current ? "secondary" : "default"} disabled={plan.current}>
                {plan.current ? (
                  "Current Plan"
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Upgrade to {plan.name}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Need a custom solution? Contact our sales team for enterprise pricing.
        </p>
        <Button variant="outline">Contact Sales</Button>
      </div>
    </div>
  )
}
