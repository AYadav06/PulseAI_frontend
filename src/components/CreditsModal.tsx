import { useState } from "react"
import { X, Zap, Crown, Check, Loader2, Sparkles } from "lucide-react"
import { apiCreateOrder, apiVerifyPayment } from "@/lib/api"
import { useAuth } from "@/context/AuthContext"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any
  }
}

interface CreditsModalProps {
  isOpen: boolean
  onClose: () => void
}

type PlanKey = "starter" | "pro" | "premium"

interface PlanCard {
  id: PlanKey
  name: string
  credits: string
  price: string
  badge?: string
  description: string
  features: string[]
  highlighted?: boolean
}

const PLANS: PlanCard[] = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: "50 Credits",
    price: "₹99",
    description: "Great for light users & testing Pro models",
    features: [
      "50 Pro model requests",
      "Never expires",
      "Standard response speed",
    ],
  },
  {
    id: "pro",
    name: "Pro Pack",
    credits: "200 Credits",
    price: "₹299",
    badge: "Most Popular",
    description: "Ideal for daily power users and developers",
    features: [
      "200 Pro model requests",
      "Never expires",
      "Priority response speed",
      "Best value per credit",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium Unlock",
    credits: "Unlimited",
    price: "₹499",
    badge: "Unlimited Access",
    description: "Unlock full access to all models without credit limits",
    features: [
      "Unlimited Pro & Standard models",
      "Permanent unlock",
      "Highest priority dispatch",
      "Dedicated support",
    ],
  },
]

export function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  const { user, refreshUser } = useAuth()
  const [loadingPlan, setLoadingPlan] = useState<PlanKey | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSelectPlan = async (plan: PlanKey) => {
    setLoadingPlan(plan)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      // 1. Create order on backend
      const order = await apiCreateOrder(plan)

      // 2. Configure Razorpay checkout options
      const options = {
        key: order.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "PulseAI",
        description: `Purchase ${order.planLabel}`,
        order_id: order.orderId,
        prefill: {
          email: user?.email || "",
        },
        theme: {
          color: "#4f46e5",
        },
        handler: async (response: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          try {
            // 3. Verify payment on backend
            const result = await apiVerifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })

            setSuccessMessage(
              result.plan === "premium"
                ? " Premium Access Unlocked! Enjoy unlimited requests."
                : `Payment successful! Added ${result.creditsAwarded} credits to your account.`
            )

            // Refresh user credits in global state
            await refreshUser()
          } catch (err) {
            setErrorMessage(
              err instanceof Error ? err.message : "Payment verification failed"
            )
          } finally {
            setLoadingPlan(null)
          }
        },
        modal: {
          ondismiss: () => {
            setLoadingPlan(null)
          },
        },
      }

      if (typeof window.Razorpay === "undefined") {
        throw new Error(
          "Razorpay SDK failed to load. Please check your network connection."
        )
      }

      const rzp = new window.Razorpay(options)
      rzp.on(
        "payment.failed",
        (response: { error: { description: string } }) => {
          setErrorMessage(
            response.error?.description || "Payment failed. Please try again."
          )
          setLoadingPlan(null)
        }
      )

      rzp.open()
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to initiate payment"
      )
      setLoadingPlan(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/70 p-4 backdrop-blur-md duration-200 fade-in">
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 p-6 text-foreground shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow effects */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/20 text-indigo-400">
                <Zap className="h-4 w-4" />
              </span>
              <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                Add Credits
              </h2>
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              Choose a pack to top up your AI credits or upgrade to unlimited.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Current Balance Badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
              {user?.isPremium ? (
                <>
                  <Crown className="h-3.5 w-3.5 text-amber-400" />
                  <span>Unlimited</span>
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{user?.credits ?? 0} Credits</span>
                </>
              )}
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {errorMessage && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm font-medium text-emerald-300">
            <Sparkles className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Plans Grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {PLANS.map((plan) => {
            const isLoading = loadingPlan === plan.id
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-xl border p-5 transition-all duration-200 ${
                  plan.highlighted
                    ? "border-indigo-500/60 bg-indigo-950/20 shadow-lg shadow-indigo-500/10 hover:border-indigo-400"
                    : plan.id === "premium"
                      ? "border-amber-500/40 bg-amber-950/10 hover:border-amber-400/60"
                      : "border-white/10 bg-zinc-800/40 hover:border-white/20"
                }`}
              >
                {/* Plan Badge */}
                {plan.badge && (
                  <span
                    className={`absolute -top-2.5 right-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                      plan.id === "premium"
                        ? "bg-amber-500 text-black shadow-sm"
                        : "bg-indigo-600 text-white shadow-sm"
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-base font-bold text-white">
                    {plan.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="text-xs text-zinc-400">/ one-time</span>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                    <Zap className="h-3.5 w-3.5 fill-indigo-400/30" />
                    <span>{plan.credits}</span>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {plan.description}
                  </p>

                  <ul className="mt-4 space-y-2 border-t border-white/5 pt-3 text-xs text-zinc-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loadingPlan !== null}
                  className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all duration-200 disabled:opacity-50 ${
                    plan.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-500/20"
                      : plan.id === "premium"
                        ? "bg-linear-to-r from-amber-500 to-amber-600 font-bold text-black hover:brightness-110"
                        : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Buy {plan.name}</span>
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
