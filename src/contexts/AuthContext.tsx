import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getFirebaseAuth } from '@/lib/firebase'
import { onAuthStateChanged, type User, signOut } from 'firebase/auth'
import { getHuggingFaceToken, hasValidHuggingFaceToken, type HuggingFaceTokenData } from '@/lib/huggingface'

type AuthContextValue = {
  user: User | null
  isLoading: boolean
  logout: () => Promise<void>
  huggingFaceToken: HuggingFaceTokenData | null
  isHuggingFaceConnected: boolean
  refreshHuggingFaceToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [huggingFaceToken, setHuggingFaceToken] = useState<HuggingFaceTokenData | null>(null)
  const [isHuggingFaceConnected, setIsHuggingFaceConnected] = useState(false)

  const loadHuggingFaceToken = async (currentUser: User | null) => {
    if (!currentUser) {
      setHuggingFaceToken(null)
      setIsHuggingFaceConnected(false)
      return
    }

    try {
      const hasToken = await hasValidHuggingFaceToken(currentUser)
      if (hasToken) {
        const token = await getHuggingFaceToken(currentUser)
        setHuggingFaceToken(token)
        setIsHuggingFaceConnected(true)
      } else {
        setHuggingFaceToken(null)
        setIsHuggingFaceConnected(false)
      }
    } catch (error) {
      console.error('Error loading Hugging Face token:', error)
      setHuggingFaceToken(null)
      setIsHuggingFaceConnected(false)
    }
  }

  useEffect(() => {
    const auth = getFirebaseAuth()
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u)
      setIsLoading(false)
      await loadHuggingFaceToken(u)
    })
    return () => unsub()
  }, [])

  const refreshHuggingFaceToken = async () => {
    if (user) {
      await loadHuggingFaceToken(user)
    }
  }

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isLoading,
    logout: async () => {
      const auth = getFirebaseAuth()
      await signOut(auth)
      setHuggingFaceToken(null)
      setIsHuggingFaceConnected(false)
    },
    huggingFaceToken,
    isHuggingFaceConnected,
    refreshHuggingFaceToken,
  }), [user, isLoading, huggingFaceToken, isHuggingFaceConnected])

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


