import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Users, Baby } from 'lucide-react'
import { getFirebaseAuth } from '@/lib/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const auth = getFirebaseAuth()
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        if (formData.name) {
          await updateProfile(cred.user, { displayName: formData.name })
        }
        navigate('/dashboard', { state: { user: { name: cred.user.displayName || formData.name, email: cred.user.email } } })
      } else {
        const cred = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        navigate('/dashboard', { state: { user: { name: cred.user.displayName || formData.name || 'User', email: cred.user.email } } })
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication failed')
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
