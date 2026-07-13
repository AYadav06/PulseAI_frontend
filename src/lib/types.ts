export type Role = "user" | "assistant";

export type ChatMessage ={
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  streaming?: boolean;
  error?: boolean;
}

export type ModelId = "gemini-2.5-flash";

export type ModelTier = "standard" | "premium";

export interface ModelOption {
  id: ModelId;
  label: string;
  badge: string;
  tier: ModelTier;
  creditCost: number;
  description: string;
}

export interface Conversation {
  id: string;
  title: string;
  model: ModelId;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export interface UserBilling {
  credits: number;
  premium: boolean;
}

export interface SSETokenChunk {
  text?: string;
  done?: boolean;
}

export interface StreamChatRequest {
  model: ModelId;
  messages: Array<Pick<ChatMessage, "role" | "content">>;
  conversationId?: string;
}
export interface CreditPack {
  id: string;
  name: string;
  credits: number | "unlimited";
  amountInr: number;
  tagline: string;
  premium?: boolean;
  highlight?: boolean;
}

export const MODEL_OPTIONS: ModelOption[] = [
  {
    id: "gemini-2.5-flash",
    label: "Gemini 2.5 Flash",
    badge: "Standard",
    tier: "standard",
    creditCost: 0,
    description: "Fast everyday routing — free on all tiers",
  },
];

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
];