import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import Navbar from "./navbar";
import Footer from "./footer";

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for individuals and small projects",
    features: [
      "100 video analyses per month",
      "50 video transformations",
      "Basic API access",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$199",
    description: "Ideal for growing businesses",
    features: [
      "1000 video analyses per month",
      "500 video transformations",
      "Advanced API access",
      "Priority support",
      "Custom webhooks",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale operations",
    features: [
      "Unlimited video analyses",
      "Unlimited transformations",
      "Full API access",
      "24/7 priority support",
      "Custom integration",
      "Dedicated account manager",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <BackButton />
      <div className="container pt-32 pb-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-muted-foreground">
            Choose the perfect plan for your needs. All plans include a 14-day
            free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl border bg-card ${plan.popular ? "border-primary shadow-lg" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
