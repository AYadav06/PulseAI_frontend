import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { CreditsModal } from "@/components/CreditsModal"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  MessageSquare,
  Zap,
  Shield,
  Brain,
  Globe,
  ArrowRight,
  Check,
  Star,
  ChevronRight,
  Bot,
  Code,
  FileText,
  ArrowUpRight,
  Layers,
} from "lucide-react"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

function ChatDemo() {
  const messages = [
    { role: "user", text: "Explain quantum computing in simple terms" },
    {
      role: "assistant",
      text: "Quantum computing uses qubits that can exist in multiple states simultaneously, unlike classical bits. This allows quantum computers to process vast amounts of possibilities in parallel.",
    },
    { role: "user", text: "How does this differ from regular computers?" },
    {
      role: "assistant",
      text: "Classical computers process data sequentially — one calculation at a time. Quantum computers leverage superposition and entanglement to explore multiple solutions simultaneously, making them exponentially faster for specific problems like cryptography and molecular simulation.",
    },
  ]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50">
      <div className="flex items-center gap-2 border-b border-border bg-card/80 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-destructive/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-accent/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="font-mono text-xs text-muted-foreground">
            PulseAI Chat
          </span>
        </div>
      </div>
      <div className="min-h-80 space-y-4 p-4 md:p-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-muted text-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div className="flex justify-start">
          <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
            <div className="flex gap-1">
              <div
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
          <input
            type="text"
            placeholder="Ask PulseAI anything..."
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
            readOnly
          />
          <Button size="sm" className="rounded-lg">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function Hero({ onStartFree }: { onStartFree: () => void }) {
  return (
    <section className="min-h-100dvh relative flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_50%,rgba(59,130,246,0.08),transparent)]" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <Container>
        <div className="relative grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-16 lg:py-0">
          <div className="space-y-8">
            <Badge
              variant="secondary"
              className="w-fit gap-2 font-mono text-xs"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              Now powered by GPT-5
            </Badge>

            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight md:text-5xl lg:text-6xl">
              Your AI assistant
              <br />
              <span className="text-primary">that actually</span>
              <br />
              gets it
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              PulseAI understands context, remembers conversations, and delivers
              precise answers. Built for developers, teams, and anyone who
              demands more from AI.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" onClick={onStartFree}>
                Start for Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                No credit card
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                100 free messages
              </div>
            </div>
          </div>

          <div className="relative">
            <ChatDemo />
          </div>
        </div>
      </Container>
    </section>
  )
}
function Features() {
  const features = [
    {
      icon: Brain,
      title: "Contextual Memory",
      description:
        "PulseAI remembers your conversation history and adapts responses based on previous interactions.",
      tag: "Core",
    },
    {
      icon: Zap,
      title: "Instant Responses",
      description:
        "Sub-200ms response times powered by optimized inference pipelines and edge caching.",
      tag: "Performance",
    },
    {
      icon: Code,
      title: "Code Generation",
      description:
        "Write, debug, and refactor code across 50+ languages with real-time syntax awareness.",
      tag: "Developer",
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description:
        "Upload PDFs, docs, or datasets. PulseAI extracts insights, summaries, and key metrics.",
      tag: "Tools",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "SOC 2 Type II compliant. Your data stays yours with zero-retention guarantees.",
      tag: "Security",
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description:
        "Native support for 95+ languages with automatic detection and culturally-aware responses.",
      tag: "Global",
    },
  ]

  return (
    <section id="features" className="py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="space-y-6">
            <Badge variant="secondary" className="w-fit font-mono text-xs">
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need,
              <br />
              nothing you don't
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Built for real workflows. PulseAI cuts through noise to deliver
              exactly what you're looking for.
            </p>
            <Button variant="outline" className="mt-4 gap-2">
              Explore all features
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:bg-card"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] uppercase"
                  >
                    {feature.tag}
                  </Badge>
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Sign up in seconds",
      description:
        "Create your account with email or SSO. No credit card required to get started.",
      icon: Layers,
    },
    {
      step: "02",
      title: "Start a conversation",
      description:
        "Ask questions, upload documents, or request code. PulseAI understands natural language.",
      icon: MessageSquare,
    },
    {
      step: "03",
      title: "Get precise answers",
      description:
        "Receive context-aware responses with citations, code blocks, and actionable insights.",
      icon: Bot,
    },
  ]

  return (
    <section id="how-it-works" className="bg-card/20 py-24 lg:py-32">
      <Container>
        <div className="mb-16 text-center">
          <Badge
            variant="secondary"
            className="mx-auto mb-4 w-fit font-mono text-xs"
          >
            How It Works
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Three steps to smarter AI
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.step} className="relative">
              {i < steps.length - 1 && (
                <div className="h-1px absolute top-12 right-[calc(-50%+4rem)] left-[calc(50%+4rem)] hidden bg-border md:block" />
              )}
              <div className="relative space-y-6 text-center">
                <div className="relative mx-auto inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card">
                  <step.icon className="h-7 w-7 text-primary" />
                  <span className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Stats() {
  const stats = [
    { value: "2.4M+", label: "Messages processed daily" },
    { value: "99.97%", label: "Uptime guaranteed" },
    { value: "180ms", label: "Average response time" },
    { value: "50K+", label: "Active users worldwide" },
  ]

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="font-mono text-4xl font-bold tracking-tight text-primary md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Pricing({
  onPlanSelect,
}: {
  onPlanSelect: (planName: string) => void
}) {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for trying out PulseAI",
      features: [
        "100 messages/month",
        "Basic context window",
        "Standard response speed",
        "Community support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹99",
      period: "/month",
      description: "For power users who need more",
      features: [
        "Unlimited messages",
        "Extended context (128K)",
        "Priority response speed",
        "Code generation",
        "Document upload",
        "API access",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Team",
      price: "₹299",
      period: "/user/mo",
      description: "For teams building with AI",
      features: [
        "Everything in Pro",
        "Shared workspaces",
        "Admin dashboard",
        "SSO & SAML",
        "Custom model fine-tuning",
        "Dedicated support",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="bg-card/20 py-24 lg:py-32">
      <Container>
        <div className="mb-16 text-center">
          <Badge
            variant="secondary"
            className="mx-auto mb-4 w-fit font-mono text-xs"
          >
            Pricing
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-lg text-muted-foreground">
            Start free, upgrade when you need more. No hidden fees, no
            surprises.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-primary bg-card shadow-[0_0_40px_-15px_rgba(59,130,246,0.15)]"
                  : "border-border bg-card/50"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-mono text-4xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <Separator />

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => onPlanSelect(plan.name)}
                >
                  {plan.cta}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    {
      quote:
        "PulseAI replaced our internal docs search. Engineers get answers in seconds instead of digging through wikis.",
      author: "Marcus Chen",
      role: "VP of Engineering",
      company: "Meridian Labs",
      avatar: "https://i.pravatar.cc/200?img=11",
    },
    {
      quote:
        "The context retention is unreal. It remembers my coding style and project structure across sessions.",
      author: "Priya Sharma",
      role: "Staff Developer",
      company: "NovaTech",
      avatar: "https://i.pravatar.cc/200?img=5",
    },
    {
      quote:
        "We handle 2M+ customer queries daily. PulseAI's accuracy and speed have cut our support costs by 40%.",
      author: "Jordan Williams",
      role: "Head of CX",
      company: "ScaleFlow",
      avatar: "https://i.pravatar.cc/200?img=12",
    },
  ]

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <Container>
        <div className="mb-16 text-center">
          <Badge
            variant="secondary"
            className="mx-auto mb-4 w-fit font-mono text-xs"
          >
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Loved by builders
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="space-y-6 rounded-2xl border border-border bg-card/50 p-6"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

function CTA({
  onStartFree,
  onTalkToSales,
}: {
  onStartFree: () => void
  onTalkToSales: () => void
}) {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-12 md:p-16 lg:p-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_50%,rgba(59,130,246,0.1),transparent)]" />
          <div className="relative mx-auto max-w-2xl space-y-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              Ready to talk to smarter AI?
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Join 50,000+ users who've made PulseAI their go-to assistant.
              Start free, no strings attached.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 text-base"
                onClick={onStartFree}
              >
                Start for Free
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base"
                onClick={onTalkToSales}
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false)

  const handleStartFree = () => {
    if (isAuthenticated) {
      navigate("/dashboard")
    } else {
      navigate("/signup")
    }
  }

  const handlePlanSelect = (planName: string) => {
    if (!isAuthenticated) {
      navigate("/signup")
      return
    }
    if (planName === "Free") {
      navigate("/dashboard")
    } else {
      setIsCreditsModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero onStartFree={handleStartFree} />
        <Features />
        <HowItWorks />
        <Stats />
        <Pricing onPlanSelect={handlePlanSelect} />
        <Testimonials />
        <CTA
          onStartFree={handleStartFree}
          onTalkToSales={() => handlePlanSelect("Team")}
        />
      </main>
      <Footer />
      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
      />
    </div>
  )
}
