import { CompanyHeader } from "@/components/company/company-header"
import { PlanUpgrade } from "@/components/company/plan-upgrade"

export default function CompanyPlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <CompanyHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Subscription Plans</h1>
          <p className="text-muted-foreground">Choose the plan that fits your business needs</p>
        </div>

        <PlanUpgrade />
      </div>
    </div>
  )
}
