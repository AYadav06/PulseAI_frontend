import { Separator } from "@/components/ui/separator"
import { Container } from "./ui/container"
import { Logo } from "@/assets/logo"
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <Container>
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2.5">
                <Logo className="h-8 w-8 shrink-0" />
                <span className="text-lg font-bold tracking-tight">
                  PulseAI
                </span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                The intelligent AI chat assistant that understands context,
                learns from interactions, and delivers precise answers in
                real-time.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <TwitterLogoIcon className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <GithubLogoIcon className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LinkedinLogoIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground">
              2026 PulseAI. All rights reserved.
            </p>
            <p className="font-mono text-xs text-muted-foreground">v1.0.1</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
