import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getFirebaseAuth } from '@/lib/firebase'
import { onAuthStateChanged, type User, deleteUser, signOut } from 'firebase/auth'
import { handleHuggingFaceCallback, storeHuggingFaceToken } from '@/lib/huggingface'
import { Baby } from 'lucide-react'

const HuggingFaceCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const auth = getFirebaseAuth()
    
    // Check if this is a registration flow
    const isRegistrationFlow = sessionStorage.getItem('is_registration_flow') === 'true'
    
    // Wait for Firebase auth to be ready
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setStatus('error')
        setErrorMessage('You must be logged in to connect Hugging Face. Please log in first.')
        setTimeout(() => {
          navigate('/')
        }, 3000)
        return
      }

      // Get OAuth parameters from URL
      const code = searchParams.get('code')
      const state = searchParams.get('state')
      const error = searchParams.get('error')
      const errorDescription = searchParams.get('error_description')

      // Handle OAuth errors from Hugging Face redirect
      if (error) {
        const errorMsg = errorDescription || error || 'Authentication failed'
        setStatus('error')
        setErrorMessage(errorMsg)
        
        // CRITICAL: If this is a registration flow, delete the account
        if (isRegistrationFlow) {
          await cleanupFailedRegistration(currentUser, errorMsg)
        } else {
          setTimeout(() => {
            navigate('/dashboard')
          }, 3000)
        }
        return
      }

      // Validate required parameters
      if (!code || !state) {
        const errorMsg = 'Missing authorization code or state parameter. The authentication request may have been corrupted.'
        setStatus('error')
        setErrorMessage(errorMsg)
        
        // CRITICAL: If this is a registration flow, delete the account
        if (isRegistrationFlow) {
          await cleanupFailedRegistration(currentUser, errorMsg)
        } else {
          setTimeout(() => {
            navigate('/dashboard')
          }, 3000)
        }
        return
      }

      // Process OAuth callback
      processCallback(currentUser, code, state, isRegistrationFlow)
    })

    return () => unsubscribe()
  }, [searchParams, navigate])

  /**
   * Cleanup function to delete account and redirect to login on registration failure
   */
  const cleanupFailedRegistration = async (user: User, errorMessage: string) => {
    try {
      console.error('Registration failed during Hugging Face callback:', errorMessage)
      
      // Delete the Firebase account
      try {
        await deleteUser(user)
        console.log('Account deleted due to registration failure')
      } catch (deleteError: any) {
        console.error('Error deleting account:', deleteError)
        // If deleteUser fails (e.g., user already signed out), try signOut
        try {
          await signOut(getFirebaseAuth())
        } catch (signOutError) {
          console.error('Error signing out:', signOutError)
        }
      }
      
      // Clean up session storage
      sessionStorage.removeItem('pending_user')
      sessionStorage.removeItem('is_registration_flow')
      
      // Redirect to login page with error message
      setTimeout(() => {
        navigate('/', { 
          state: { 
            registrationError: errorMessage || 'Account registration failed. Please try again.'
          } 
        })
      }, 3000)
    } catch (cleanupError) {
      console.error('Error during cleanup:', cleanupError)
      // Still redirect to login even if cleanup fails
      setTimeout(() => {
        navigate('/', { 
          state: { 
            registrationError: 'Account registration failed. Please try again.'
          } 
        })
      }, 3000)
    }
  }

  const processCallback = async (currentUser: User, code: string, state: string, isRegistrationFlow: boolean) => {
    try {
      setStatus('processing')
      
      // Debug: Log state information
      console.log('Processing OAuth callback:', {
        hasCode: !!code,
        hasState: !!state,
        stateValue: state,
        isRegistrationFlow,
        localStorageState: localStorage.getItem('hf_oauth_state'),
        sessionStorageState: sessionStorage.getItem('hf_oauth_state')
      })
      
      // Exchange authorization code for access token
      let tokenData
      try {
        tokenData = await handleHuggingFaceCallback(code, state)
      } catch (tokenError: any) {
        // Handle token exchange errors
        let errorMsg = 'Failed to exchange authorization code for access token'
        if (tokenError?.message) {
          errorMsg = tokenError.message
          if (tokenError.message.includes('CSRF') || tokenError.message.includes('state')) {
            errorMsg = 'Security validation failed. The authentication request may have been tampered with.'
          } else if (tokenError.message.includes('invalid_grant')) {
            errorMsg = 'Authorization code is invalid or has expired. Please try registering again.'
          } else if (tokenError.message.includes('network') || tokenError.message.includes('fetch')) {
            errorMsg = 'Network error while connecting to Hugging Face. Please check your connection and try again.'
          }
        }
        
        throw new Error(errorMsg)
      }
      
      // Validate token data
      if (!tokenData || !tokenData.access_token) {
        throw new Error('Invalid token data received from Hugging Face. Authentication failed.')
      }
      
      // Store token in Firestore
      try {
        await storeHuggingFaceToken(currentUser, tokenData)
      } catch (storeError: any) {
        console.error('Error storing Hugging Face token:', storeError)
        throw new Error('Failed to save authentication token. Please try again.')
      }
      
      // Registration successful - clean up registration flags
      if (isRegistrationFlow) {
        sessionStorage.removeItem('is_registration_flow')
        sessionStorage.removeItem('pending_user')
      }
      
      setStatus('success')
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            user: { 
              name: currentUser.displayName || 'User', 
              email: currentUser.email 
            },
            huggingFaceConnected: true,
            registrationSuccess: isRegistrationFlow
          } 
        })
      }, 2000)
    } catch (error: any) {
      console.error('Error processing Hugging Face callback:', error)
      setStatus('error')
      
      // Provide more detailed error messages
      let errorMsg = 'Failed to connect Hugging Face account'
      if (error?.message) {
        errorMsg = error.message
      }
      
      setErrorMessage(errorMsg)
      
      // CRITICAL: If this is a registration flow, delete the account
      if (isRegistrationFlow) {
        await cleanupFailedRegistration(currentUser, errorMsg)
      } else {
        // For existing users, just redirect to dashboard
        setTimeout(() => {
          navigate('/dashboard')
        }, 3000)
      }
    }
  }

  return (
    <div className="min-h-screen medical-hero flex items-center justify-center p-4">
      <div className="max-w-md w-full medical-card p-8 text-center">
        <div className="medical-icon medical-icon-primary mx-auto mb-4">
          <Baby className="w-8 h-8" />
        </div>
        
        {status === 'processing' && (
          <>
            <h1 className="text-2xl medical-text-primary mb-4">Connecting Hugging Face...</h1>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
            <p className="medical-text-secondary">Please wait while we connect your account.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl medical-text-primary mb-4">Successfully Connected!</h1>
            <p className="medical-text-secondary mb-4">
              Your Hugging Face account has been connected successfully.
            </p>
            <p className="text-sm medical-text-muted">Redirecting to dashboard...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl medical-text-primary mb-4">Connection Failed</h1>
            <p className="medical-text-secondary mb-4 text-red-600">
              {errorMessage || 'An error occurred while connecting your Hugging Face account.'}
            </p>
            <p className="text-sm medical-text-muted">Redirecting to dashboard...</p>
          </>
        )}
      </div>
    </div>
  )
}

export default HuggingFaceCallback

