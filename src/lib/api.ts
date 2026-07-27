import dotenv from "dotenv"

dotenv.config();

async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetch(`${process.env.API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })
}

// ────────────────────────── Auth ──────────────────────────

export interface ApiUser {
  id: string
  email: string
  credits?: number
  isPremium?: boolean
}

interface AuthResponse {
  message: string
  user: ApiUser
}

export async function apiSignUp(
  email: string,
  password: string
): Promise<ApiUser> {
  const res = await apiFetch("/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || "Sign up failed")
  }
  const data: AuthResponse = await res.json()
  return data.user
}

export async function apiSignIn(
  email: string,
  password: string
): Promise<ApiUser> {
  const res = await apiFetch("/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || "Invalid email or password")
  }
  const data: AuthResponse = await res.json()
  return data.user
}

export async function apiSignOut(): Promise<void> {
  await apiFetch("/signout", { method: "POST" })
}

export async function apiGetMe(): Promise<ApiUser | null> {
  const res = await apiFetch("/me")
  if (!res.ok) return null
  const data: { user: ApiUser } = await res.json()
  return data.user
}

// ────────────────────────── Payment ──────────────────────────

export interface CreateOrderResponse {
  orderId: string
  amount: number
  currency: string
  keyId: string
  planLabel: string
}

export async function apiCreateOrder(
  plan: "starter" | "pro" | "premium"
): Promise<CreateOrderResponse> {
  const res = await apiFetch("/payment/create-order", {
    method: "POST",
    body: JSON.stringify({ plan }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || "Failed to create order")
  }
  return res.json()
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export async function apiVerifyPayment(
  data: VerifyPaymentPayload
): Promise<{ message: string; plan: string; creditsAwarded: number }> {
  const res = await apiFetch("/payment/verify", {
    method: "POST",
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || "Payment verification failed")
  }
  return res.json()
}

// ────────────────────────── Executions (sidebar entries) ──────────────────────────

export interface ApiExecution {
  _id: string
  title: string
  conversationId: string
  createdAt: string
  updatedAt: string
}

export async function apiGetExecutions(): Promise<ApiExecution[]> {
  const res = await apiFetch("/executions")
  if (!res.ok) return []
  const data: { executions: ApiExecution[] } = await res.json()
  return data.executions
}

// ────────────────────────── Conversations ──────────────────────────

export interface ApiConversation {
  _id: string
  userId: string
  messages: Array<{
    role: "user" | "assistant"
    content: string
    createdAt: string
  }>
  createdAt: string
  updatedAt: string
}

export async function apiGetConversation(
  conversationId: string
): Promise<ApiConversation | null> {
  let res = await apiFetch(`/conversation/${conversationId}`)
  if (!res.ok) {
    res = await apiFetch(`/converstion/${conversationId}`)
  }
  if (!res.ok) return null
  const data: { conversation: ApiConversation } = await res.json()
  return data.conversation
}

export async function apiDeleteChat(chatId: string): Promise<boolean> {
  const res = await apiFetch(`/chat/${chatId}`, { method: "DELETE" })
  return res.ok
}

// ────────────────────────── Streaming ──────────────────────────

export function getStreamUrl(): string {
  return `${process.env.API_BASE}/chat`
}
