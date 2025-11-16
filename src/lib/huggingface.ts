import { getFirestoreDB } from './firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import type { User } from 'firebase/auth'

// Hugging Face OAuth configuration
const HF_CLIENT_ID = import.meta.env.VITE_HUGGINGFACE_CLIENT_ID
const HF_CLIENT_SECRET = import.meta.env.VITE_HUGGINGFACE_CLIENT_SECRET
const HF_REDIRECT_URI = import.meta.env.VITE_HUGGINGFACE_REDIRECT_URI || `${window.location.origin}/auth/huggingface/callback`
const HF_AUTH_URL = 'https://huggingface.co/oauth/authorize'
const HF_TOKEN_URL = 'https://huggingface.co/oauth/token'
const HF_USERINFO_URL = 'https://huggingface.co/api/whoami-v2'

export interface HuggingFaceTokenData {
  access_token: string
  token_type: string
  expires_in?: number
  refresh_token?: string
  expires_at?: number
  scope?: string
}

export interface HuggingFaceUserInfo {
  id: string
  name: string
  fullname: string
  email: string
  avatarUrl?: string
}

/**
 * Generate a random state string for OAuth security
 */
function generateState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * Store state in localStorage for OAuth flow
 * Using localStorage instead of sessionStorage to ensure persistence across redirects
 */
function storeOAuthState(state: string): void {
  try {
    localStorage.setItem('hf_oauth_state', state)
    // Also store timestamp for expiration (5 minutes)
    localStorage.setItem('hf_oauth_state_timestamp', Date.now().toString())
  } catch (error) {
    console.error('Error storing OAuth state:', error)
    // Fallback to sessionStorage if localStorage fails
    sessionStorage.setItem('hf_oauth_state', state)
  }
}

/**
 * Retrieve and validate state from localStorage
 */
function validateOAuthState(state: string): boolean {
  try {
    // Check if state exists in localStorage
    let storedState = localStorage.getItem('hf_oauth_state')
    const timestamp = localStorage.getItem('hf_oauth_state_timestamp')
    
    // If not in localStorage, try sessionStorage as fallback
    if (!storedState) {
      storedState = sessionStorage.getItem('hf_oauth_state')
    }
    
    // Check expiration (5 minutes)
    if (timestamp) {
      const stateAge = Date.now() - parseInt(timestamp, 10)
      const fiveMinutes = 5 * 60 * 1000
      if (stateAge > fiveMinutes) {
        console.warn('OAuth state expired')
        localStorage.removeItem('hf_oauth_state')
        localStorage.removeItem('hf_oauth_state_timestamp')
        sessionStorage.removeItem('hf_oauth_state')
        return false
      }
    }
    
    // Clean up
    localStorage.removeItem('hf_oauth_state')
    localStorage.removeItem('hf_oauth_state_timestamp')
    sessionStorage.removeItem('hf_oauth_state')
    
    // Validate state
    const isValid = storedState === state
    
    if (!isValid) {
      console.error('State validation failed:', {
        stored: storedState,
        received: state,
        match: storedState === state
      })
    }
    
    return isValid
  } catch (error) {
    console.error('Error validating OAuth state:', error)
    return false
  }
}

/**
 * Initiate Hugging Face OAuth flow
 * Redirects user to Hugging Face authorization page
 */
export function initiateHuggingFaceAuth(): void {
  if (!HF_CLIENT_ID) {
    throw new Error('Hugging Face Client ID is not configured. Please check your environment variables.')
  }

  const state = generateState()
  storeOAuthState(state)

  const params = new URLSearchParams({
    client_id: HF_CLIENT_ID,
    redirect_uri: HF_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid profile email',
    state: state,
  })

  const authUrl = `${HF_AUTH_URL}?${params.toString()}`
  window.location.href = authUrl
}

/**
 * Handle OAuth callback and exchange authorization code for access token
 */
export async function handleHuggingFaceCallback(code: string, state: string): Promise<HuggingFaceTokenData> {
  if (!validateOAuthState(state)) {
    throw new Error('Invalid OAuth state. Possible CSRF attack.')
  }

  if (!HF_CLIENT_ID || !HF_CLIENT_SECRET) {
    throw new Error('Hugging Face OAuth credentials are not configured.')
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(HF_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: HF_REDIRECT_URI,
        client_id: HF_CLIENT_ID,
        client_secret: HF_CLIENT_SECRET,
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json().catch(() => ({}))
      throw new Error(errorData.error_description || errorData.error || 'Failed to exchange authorization code')
    }

    const tokenData: HuggingFaceTokenData = await tokenResponse.json()

    // Calculate expiration time if expires_in is provided
    if (tokenData.expires_in) {
      tokenData.expires_at = Date.now() + (tokenData.expires_in * 1000)
    }

    return tokenData
  } catch (error) {
    console.error('Error exchanging authorization code:', error)
    throw error
  }
}

/**
 * Get user information from Hugging Face using access token
 */
export async function getHuggingFaceUserInfo(accessToken: string): Promise<HuggingFaceUserInfo> {
  try {
    const response = await fetch(HF_USERINFO_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user information from Hugging Face')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching Hugging Face user info:', error)
    throw error
  }
}

/**
 * Store Hugging Face token in Firestore for the current user
 */
export async function storeHuggingFaceToken(user: User, tokenData: HuggingFaceTokenData): Promise<void> {
  try {
    const firestore = getFirestoreDB()
    const userDocRef = doc(firestore, 'users', user.uid)

    await setDoc(userDocRef, {
      huggingface_token: tokenData.access_token,
      huggingface_token_type: tokenData.token_type,
      huggingface_expires_at: tokenData.expires_at || null,
      huggingface_refresh_token: tokenData.refresh_token || null,
      huggingface_scope: tokenData.scope || null,
      huggingface_connected_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { merge: true })
  } catch (error) {
    console.error('Error storing Hugging Face token:', error)
    throw error
  }
}

/**
 * Retrieve stored Hugging Face token for the current user
 */
export async function getHuggingFaceToken(user: User): Promise<HuggingFaceTokenData | null> {
  try {
    const firestore = getFirestoreDB()
    const userDocRef = doc(firestore, 'users', user.uid)
    const userDoc = await getDoc(userDocRef)

    if (!userDoc.exists()) {
      return null
    }

    const data = userDoc.data()
    const tokenData: HuggingFaceTokenData = {
      access_token: data.huggingface_token,
      token_type: data.huggingface_token_type || 'Bearer',
      expires_at: data.huggingface_expires_at || undefined,
      refresh_token: data.huggingface_refresh_token || undefined,
      scope: data.huggingface_scope || undefined,
    }

    // Check if token is expired
    if (tokenData.expires_at && tokenData.expires_at < Date.now()) {
      // Token is expired, try to refresh if refresh token is available
      if (tokenData.refresh_token) {
        try {
          const refreshedToken = await refreshHuggingFaceToken(tokenData.refresh_token)
          await storeHuggingFaceToken(user, refreshedToken)
          return refreshedToken
        } catch (error) {
          console.error('Error refreshing token:', error)
          return null
        }
      }
      return null
    }

    return tokenData
  } catch (error) {
    console.error('Error retrieving Hugging Face token:', error)
    return null
  }
}

/**
 * Refresh Hugging Face access token using refresh token
 */
export async function refreshHuggingFaceToken(refreshToken: string): Promise<HuggingFaceTokenData> {
  if (!HF_CLIENT_ID || !HF_CLIENT_SECRET) {
    throw new Error('Hugging Face OAuth credentials are not configured.')
  }

  try {
    const response = await fetch(HF_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: HF_CLIENT_ID,
        client_secret: HF_CLIENT_SECRET,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error_description || errorData.error || 'Failed to refresh token')
    }

    const tokenData: HuggingFaceTokenData = await response.json()

    // Calculate expiration time if expires_in is provided
    if (tokenData.expires_in) {
      tokenData.expires_at = Date.now() + (tokenData.expires_in * 1000)
    }

    return tokenData
  } catch (error) {
    console.error('Error refreshing Hugging Face token:', error)
    throw error
  }
}

/**
 * Check if user has a valid Hugging Face token
 */
export async function hasValidHuggingFaceToken(user: User): Promise<boolean> {
  const token = await getHuggingFaceToken(user)
  return token !== null && token.access_token !== undefined
}

/**
 * Make an authenticated API call to Hugging Face
 */
export async function huggingFaceApiCall(
  endpoint: string,
  options: RequestInit = {},
  accessToken: string
): Promise<Response> {
  const baseUrl = 'https://api-inference.huggingface.co'
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    headers,
  })
}

/**
 * Remove Hugging Face token from user's profile
 */
export async function removeHuggingFaceToken(user: User): Promise<void> {
  try {
    const firestore = getFirestoreDB()
    const userDocRef = doc(firestore, 'users', user.uid)

    await setDoc(userDocRef, {
      huggingface_token: null,
      huggingface_token_type: null,
      huggingface_expires_at: null,
      huggingface_refresh_token: null,
      huggingface_scope: null,
      huggingface_connected_at: null,
      updated_at: new Date().toISOString(),
    }, { merge: true })
  } catch (error) {
    console.error('Error removing Hugging Face token:', error)
    throw error
  }
}

