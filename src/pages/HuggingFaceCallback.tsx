import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getFirebaseAuth } from '@/lib/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { handleHuggingFaceCallback, storeHuggingFaceToken } from '@/lib/huggingface'
import { Baby } from 'lucide-react'

const HuggingFaceCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const auth = getFirebaseAuth()
    
    // Wait for Firebase auth to be ready
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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

      // Handle OAuth errors
      if (error) {
        setStatus('error')
        setErrorMessage(errorDescription || error || 'Authentication failed')
        setTimeout(() => {
          navigate('/dashboard')
        }, 3000)
        return
      }

      // Validate required parameters
      if (!code || !state) {
        setStatus('error')
        setErrorMessage('Missing authorization code or state parameter')
        setTimeout(() => {
          navigate('/dashboard')
        }, 3000)
        return
      }

      // Process OAuth callback
      processCallback(currentUser, code, state)
    })

    return () => unsubscribe()
  }, [searchParams, navigate])

  const processCallback = async (currentUser: User, code: string, state: string) => {
    try {
      setStatus('processing')
      
      // Debug: Log state information
      console.log('Processing OAuth callback:', {
        hasCode: !!code,
        hasState: !!state,
        stateValue: state,
        localStorageState: localStorage.getItem('hf_oauth_state'),
        sessionStorageState: sessionStorage.getItem('hf_oauth_state')
      })
      
      // Exchange authorization code for access token
      const tokenData = await handleHuggingFaceCallback(code, state)
      
      // Store token in Firestore
      await storeHuggingFaceToken(currentUser, tokenData)
      
      setStatus('success')
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            user: { 
              name: currentUser.displayName || 'User', 
              email: currentUser.email 
            },
            huggingFaceConnected: true
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
        if (error.message.includes('CSRF') || error.message.includes('state')) {
          errorMsg = 'Security validation failed. Please try connecting again from the login page.'
        }
      }
      
      setErrorMessage(errorMsg)
      
      // Redirect to dashboard after error
      setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
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

