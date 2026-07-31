import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { Logo } from "@/assets/logo"

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { signIn } = useAuth()
  const navigate = useNavigate()

  function validate(): boolean {
    const next: FormErrors = {}

    if (!email.trim()) {
      next.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Please enter a valid email address."
    }

    if (!password) {
      next.password = "Password is required."
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setErrors({})

    try {
      await signIn(email, password)
      navigate("/dashboard")
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Sign in failed. Please try again."
      setErrors({ general: message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* ── Brand Panel ── */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] lg:flex lg:w-1/2">
        {/* Decorative rings */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full border border-white/[0.06]" />
        <div className="absolute -right-40 -bottom-40 h-[28rem] w-[28rem] rounded-full border border-white/[0.06]" />
        <div className="absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.04]" />

        <div className="relative z-10 flex w-full flex-col items-center justify-center px-12 text-center text-white">
          <div className="mb-8">
            <Logo />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Welcome back
          </h1>
          <p className="max-w-sm text-lg leading-relaxed text-white/70">
            Sign in to continue your conversations with Pulse&nbsp;AI
          </p>
        </div>
      </div>

      {/* ── Form Panel ── */}
      <div className="flex w-full items-center justify-center bg-background px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="mb-2 flex justify-center lg:hidden">
            <Logo />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground">Sign in</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          {errors.general && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full rounded-xl border bg-card py-3 pr-4 pl-10 text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20 ${
                    errors.email ? "border-destructive" : "border-border"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-xl border bg-card py-3 pr-11 pl-10 text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20 ${
                    errors.password ? "border-destructive" : "border-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-3.5 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-[#5B9BFF] to-[#2B4C8C] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-md active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
            >
              {/* Shimmer overlay */}
              {isSubmitting && (
                <span className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]" />
              )}

              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
