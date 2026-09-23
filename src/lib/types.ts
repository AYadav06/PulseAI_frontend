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

export type ModelId = "gemini-2.5-flash" | "gemini-2.5-flash-lite" | "gemini-2.5-pro"

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: "gemini-2.5-flash-lite",
    label: "Gemini 2.5 Flash Lite",
    badge: "Fast",
    tier: "standard",
    creditCost: 1,
    description: "Quickest responses, best for short questions and casual chat.",
  },
  {
    id: "gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    badge: "Balanced",
    tier: "standard",
    creditCost: 2,
    description: "Strong all-round quality and speed for everyday use.",
  },
  {
    id: "gemini-2.5-pro",
    label: "Gemini 2.5 Pro",
    badge: "Premium",
    tier: "premium",
    creditCost: 5,
    description: "Highest-quality reasoning for complex or detailed tasks.",
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
