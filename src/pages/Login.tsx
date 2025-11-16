import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Users, Baby } from 'lucide-react'
import { getFirebaseAuth } from '@/lib/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, deleteUser } from 'firebase/auth'
import { initiateHuggingFaceAuth, getHuggingFaceToken, hasValidHuggingFaceToken } from '@/lib/huggingface'

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const location = useLocation()
  const [isRegister, setIsRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for registration errors from callback redirect
  useEffect(() => {
    if (location.state?.registrationError) {
      setError(location.state.registrationError)
      // Clear the state to prevent showing the error again on re-render
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    
    let createdUser: any = null
    
    try {
      const auth = getFirebaseAuth()
      if (isRegister) {
        // Validate inputs before attempting registration
        if (!formData.email || !formData.password) {
          throw new Error('Email and password are required')
        }
        
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long')
        }
        
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
          throw new Error('Please enter a valid email address')
        }
        
        // Create Firebase account
        try {
          const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
          createdUser = cred.user
          
          // Update profile with name if provided
          if (formData.name) {
            try {
              await updateProfile(cred.user, { displayName: formData.name })
            } catch (profileError: any) {
              console.error('Error updating profile:', profileError)
              // Delete account if profile update fails
              await deleteUser(cred.user)
              throw new Error('Failed to set up user profile. Please try again.')
            }
          }
        } catch (createError: any) {
          // Handle Firebase account creation errors
          if (createError.code === 'auth/email-already-in-use') {
            throw new Error('This email is already registered. Please sign in instead.')
          } else if (createError.code === 'auth/invalid-email') {
            throw new Error('Invalid email address. Please check and try again.')
          } else if (createError.code === 'auth/weak-password') {
            throw new Error('Password is too weak. Please use a stronger password.')
          } else if (createError.code === 'auth/network-request-failed') {
            throw new Error('Network error. Please check your connection and try again.')
          } else {
            throw new Error(createError.message || 'Failed to create account. Please try again.')
          }
        }
        
        // Mark this as a registration flow - critical for cleanup on error
        sessionStorage.setItem('is_registration_flow', 'true')
        sessionStorage.setItem('pending_user', JSON.stringify({
          name: createdUser.displayName || formData.name,
          email: createdUser.email,
          uid: createdUser.uid,
          createdAt: Date.now()
        }))
        
        // Initiate Hugging Face OAuth flow - MUST succeed or account will be deleted
        try {
          // Validate Hugging Face configuration before redirecting
          if (!import.meta.env.VITE_HUGGINGFACE_CLIENT_ID) {
            throw new Error('Hugging Face authentication is not properly configured. Account creation cannot proceed.')
          }
          
          initiateHuggingFaceAuth()
          // User will be redirected to Hugging Face, then back to callback
          // If callback fails, account will be deleted in HuggingFaceCallback
          return
        } catch (hfError: any) {
          // CRITICAL: If Hugging Face auth fails, delete the account immediately
          console.error('Hugging Face authentication failed during registration:', hfError)
          
          try {
            if (createdUser) {
              await deleteUser(createdUser)
              console.log('Account deleted due to Hugging Face authentication failure')
            }
          } catch (deleteError: any) {
            console.error('Error deleting account after Hugging Face failure:', deleteError)
            // Even if deletion fails, we should still show the error
          }
          
          // Clean up session storage
          sessionStorage.removeItem('pending_user')
          sessionStorage.removeItem('is_registration_flow')
          
          // Show user-friendly error message
          const errorMsg = hfError.message || 'Failed to initiate Hugging Face authentication. Account creation cancelled.'
          throw new Error(errorMsg)
        }
      } else {
        const cred = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        
        // Check if user has valid Hugging Face token
        const hasToken = await hasValidHuggingFaceToken(cred.user)
        const token = hasToken ? await getHuggingFaceToken(cred.user) : null
        
        navigate('/dashboard', { 
          state: { 
            user: { 
              name: cred.user.displayName || formData.name || 'User', 
              email: cred.user.email 
            },
            huggingFaceConnected: hasToken,
            huggingFaceToken: token
          } 
        })
      }
    } catch (err: any) {
      // Ensure account is cleaned up if registration failed
      if (isRegister && createdUser) {
        try {
          await deleteUser(createdUser)
          console.log('Account cleaned up after registration error')
        } catch (deleteError) {
          console.error('Error cleaning up account:', deleteError)
        }
        sessionStorage.removeItem('pending_user')
        sessionStorage.removeItem('is_registration_flow')
      }
      
      // Set user-friendly error message
      const errorMessage = err?.message || 'Authentication failed. Please try again.'
      setError(errorMessage)
      console.error('Authentication error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen medical-hero flex items-center justify-center p-4">
      <div className="max-w-md w-full medical-card p-8">
        <div className="text-center mb-8">
          <div className="medical-icon medical-icon-primary mx-auto mb-4">
            <Baby className="w-8 h-8" />
          </div>
          <h1 className="text-3xl medical-text-primary mb-2">PREGNITECH</h1>
          <p className="medical-text-secondary">Your AI-powered pregnancy companion</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegister && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium medical-text-primary mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border medical-border rounded-md medical-focus"
                required={isRegister}
              />
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium medical-text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border medical-border rounded-md medical-focus"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium medical-text-primary mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border medical-border rounded-md medical-focus"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`w-full medical-button py-2 px-4 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (isRegister ? 'Creating account...' : 'Signing in...') : (isRegister ? 'Create Account' : 'Login')}
          </button>

          <div className="text-center text-sm medical-text-muted">
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button type="button" className="text-primary underline" onClick={() => setIsRegister(false)}>
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                New here?{' '}
                <button type="button" className="text-primary underline" onClick={() => setIsRegister(true)}>
                  Create an account
                </button>
              </span>
            )}
          </div>
        </form>
        
        {/* Team Link */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm medical-text-muted mb-4">
            Want to meet our expert team?
          </p>
          <Link to="/team">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center space-x-2 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-200"
            >
              <Users className="h-4 w-4" />
              <span>Meet Our Team</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
