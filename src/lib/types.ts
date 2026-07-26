export type Role = "user" | "assistant"

export type ChatMessage = {
  id?: string
  role: Role
  content: string
  createdAt?: number
  streaming?: boolean
  error?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  credits?: number
  isPremium?: boolean
}

export type ModelId = "gemini-2.0-flash" | "gemini-1.5-flash" | "gemini-1.5-pro"

export type ModelTier = "standard" | "premium"

export interface ModelOption {
  id: ModelId
  label: string
  badge: string
  tier: ModelTier
  creditCost: number
  description: string
}

export interface Conversation {
  id: string
  title: string
  model: ModelId
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export interface UserBilling {
  credits: number
  premium: boolean
}

export interface SSETokenChunk {
  text?: string
  done?: boolean
}

export interface StreamChatRequest {
  model: ModelId
  messages: Array<Pick<ChatMessage, "role" | "content">>
  conversationId?: string
}
export interface CreditPack {
  id: string
  name: string
  credits: number | "unlimited"
  amountInr: number
  tagline: string
  premium?: boolean
  highlight?: boolean
}

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: "gemini-2.0-flash",
    label: "Gemini 2.0 Flash",
    badge: "Standard",
    tier: "standard",
    creditCost: 0,
    description: "Fast everyday routing — free on all tiers",
  },
  {
    id: "gemini-1.5-flash",
    label: "Gemini 1.5 Flash",
    badge: "Legacy Flash",
    tier: "standard",
    creditCost: 0,
    description: "Highly stable fallback model",
  },
  {
    id: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    badge: "Pro",
    tier: "premium",
    creditCost: 1,
    description: "Complex reasoning and coding model",
  },
]

export const CREDIT_PACKS: CreditPack[] = [
  {
    id: "pack_starter",
    name: "Starter",
    credits: 50,
    amountInr: 99,
    tagline: "50 premium dispatches",
  },
  {
    id: "pack_builder",
    name: "Builder",
    credits: 200,
    amountInr: 299,
    tagline: "200 premium dispatches",
    highlight: true,
  },
  {
    id: "pack_premium",
    name: "Premium Member",
    credits: "unlimited",
    amountInr: 999,
    tagline: "Unlimited active routing, forever",
    premium: true,
  },
]
