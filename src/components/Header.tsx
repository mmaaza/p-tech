import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Baby, LogOut, ArrowLeft, Menu, X, User, Bell, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface HeaderProps {
  user?: {
    name: string
    email: string
  }
  showBackButton?: boolean
  backPath?: string
  title?: string
  subtitle?: string
}

const Header = ({ user, showBackButton = false, backPath = '/dashboard', title, subtitle }: HeaderProps) => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    navigate('/')
  }

  const handleBack = () => {
    navigate(backPath, { state: { user } })
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="medical-container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="flex items-center space-x-2 hover:bg-primary/10 transition-all duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="medical-icon medical-icon-primary group-hover:scale-105 transition-transform duration-200">
                  <Baby className="h-6 w-6" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-bold medical-text-primary tracking-tight">
                  PREGNITECH
                </h1>
                {subtitle && (
                  <Badge 
                    variant="secondary" 
                    className="medical-button-secondary text-xs px-2 py-1 w-fit"
                  >
                    {subtitle}
                  </Badge>
                )}
                {title && (
                  <div className="text-sm medical-text-muted mt-1 hidden sm:block">{title}</div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative hover:bg-primary/10">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
                </Button>
                
                {/* User Profile */}
                <div className="flex items-center space-x-3 bg-gray-50/50 rounded-full px-3 py-2 hover:bg-gray-100/50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {getUserInitials(user.name)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium medical-text-primary">{user.name}</p>
                    <p className="text-xs medical-text-muted hidden lg:block">{user.email}</p>
                  </div>
                </div>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 py-4">
            <div className="space-y-4">
              {user && (
                <div className="flex items-center space-x-3 bg-gray-50/50 rounded-lg px-4 py-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                    {getUserInitials(user.name)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium medical-text-primary">{user.name}</p>
                    <p className="text-sm medical-text-muted">{user.email}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
