const API_BASE = "http://localhost:3000/api/v1";

/** Shared fetch wrapper that always sends credentials (cookies). */
async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  return fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

// ────────────────────────── Auth ──────────────────────────

export interface ApiUser {
  id: string;
  email: string;
}

interface AuthResponse {
  message: string;
  user: ApiUser;
}

export async function apiSignUp(email: string, password: string): Promise<ApiUser> {
  const res = await apiFetch("/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Sign up failed");
  }
  const data: AuthResponse = await res.json();
  return data.user;
}

export async function apiSignIn(email: string, password: string): Promise<ApiUser> {
  const res = await apiFetch("/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Invalid email or password");
  }
  const data: AuthResponse = await res.json();
  return data.user;
}

export async function apiSignOut(): Promise<void> {
  await apiFetch("/signout", { method: "POST" });
}

export async function apiGetMe(): Promise<ApiUser | null> {
  const res = await apiFetch("/me");
  if (!res.ok) return null;
  const data: { user: ApiUser } = await res.json();
  return data.user;
}

// ────────────────────────── Executions (sidebar entries) ──────────────────────────

export interface ApiExecution {
  _id: string;
  title: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

export async function apiGetExecutions(): Promise<ApiExecution[]> {
  const res = await apiFetch("/executions");
  if (!res.ok) return [];
  const data: { executions: ApiExecution[] } = await res.json();
  return data.executions;
}

// ────────────────────────── Conversations ──────────────────────────

export interface ApiConversation {
  _id: string;
  userId: string;
  messages: Array<{ role: "user" | "assistant"; content: string; createdAt: string }>;
  createdAt: string;
  updatedAt: string;
}

export async function apiGetConversation(conversationId: string): Promise<ApiConversation | null> {
  const res = await apiFetch(`/converstion/${conversationId}`);
  if (!res.ok) return null;
  const data: { conversation: ApiConversation } = await res.json();
  return data.conversation;
}

export async function apiDeleteChat(chatId: string): Promise<boolean> {
  const res = await apiFetch(`/chat/${chatId}`, { method: "DELETE" });
  return res.ok;
}

// ────────────────────────── Streaming ──────────────────────────

export function getStreamUrl(): string {
  return `${API_BASE}/chat`;
}
