import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import type { User } from "@/lib/types"
import { apiSignIn, apiSignUp, apiSignOut, apiGetMe } from "@/lib/api"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const apiUser = await apiGetMe()
      if (apiUser) {
        setUser({
          id: apiUser.id,
          name: apiUser.email
            .split("@")[0]
            .replace(/[._-]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          email: apiUser.email,
          credits: apiUser.credits ?? 0,
          isPremium: apiUser.isPremium ?? false,
        })
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    }
  }, [])

  // Hydrate auth state from cookie on mount via GET /me
  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false))
  }, [refreshUser])

  const signIn = useCallback(
    async (email: string, password: string) => {
      await apiSignIn(email, password)
      await refreshUser()
    },
    [refreshUser]
  )

  const signUp = useCallback(
    async (_name: string, email: string, password: string) => {
      await apiSignUp(email, password)
      await refreshUser()
    },
    [refreshUser]
  )

  const signOut = useCallback(async () => {
    await apiSignOut()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
