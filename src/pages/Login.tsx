import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple login logic - in real app, this would validate credentials
    if (formData.name && formData.email) {
      navigate('/dashboard', { state: { user: formData } })
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
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h1 className="text-3xl medical-text-primary mb-2">PREGNITECH</h1>
          <p className="medical-text-secondary">Your AI-powered pregnancy companion</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
              required
            />
          </div>
          
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
          
          <button
            type="submit"
            className="w-full medical-button py-2 px-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
