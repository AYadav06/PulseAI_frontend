import React from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import { Container } from "./ui/container"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, signOut } = useAuth()

  return (
    <header className="`supports-backdrop-filter:bg-background/60` sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">PulseAI</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </a>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button size="sm" variant="outline" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate("/signup")}>
                  Start Free
                </Button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 transition-colors hover:bg-muted lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <nav className="flex flex-col gap-4 border-t border-border py-4 lg:hidden">
            <a
              href="#features"
              className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            {isAuthenticated ? (
              <div className="mt-2 flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false)
                    navigate("/dashboard")
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false)
                    signOut()
                  }}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false)
                    navigate("/signin")
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false)
                    navigate("/signup")
                  }}
                >
                  Start Free
                </Button>
              </div>
            )}
          </nav>
        )}
      </Container>
    </header>
  )
}
