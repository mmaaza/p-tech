import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Header from '@/components/Header'
import { Heart, Calendar, Bot, BookOpen, Apple, X, Sparkles } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { initiateHuggingFaceAuth } from '@/lib/huggingface'

const Dashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = location.state?.user
  const { isHuggingFaceConnected, user: authUser, refreshHuggingFaceToken } = useAuth()
  const [showHuggingFaceBanner, setShowHuggingFaceBanner] = useState(false)
  const [dismissedBanner, setDismissedBanner] = useState(false)

  // Check if user needs to connect Hugging Face
  useEffect(() => {
    // Check if banner was dismissed in this session
    const bannerDismissed = sessionStorage.getItem('hf_banner_dismissed')
    if (bannerDismissed === 'true') {
      setDismissedBanner(true)
    }

    // Show banner if user is logged in but doesn't have HF token
    if (authUser && !isHuggingFaceConnected && !dismissedBanner) {
      setShowHuggingFaceBanner(true)
    } else {
      setShowHuggingFaceBanner(false)
    }
  }, [authUser, isHuggingFaceConnected, dismissedBanner])

  // Refresh token status when coming back from OAuth callback
  useEffect(() => {
    if (location.state?.huggingFaceConnected) {
      refreshHuggingFaceToken()
      setShowHuggingFaceBanner(false)
      // Clear dismissed state since they successfully connected
      setDismissedBanner(false)
      sessionStorage.removeItem('hf_banner_dismissed')
    }
  }, [location.state, refreshHuggingFaceToken])

  // Also check connection status periodically in case token was added elsewhere
  useEffect(() => {
    if (isHuggingFaceConnected && dismissedBanner) {
      // If connected but was previously dismissed, clear dismissed state
      setDismissedBanner(false)
      sessionStorage.removeItem('hf_banner_dismissed')
    }
  }, [isHuggingFaceConnected, dismissedBanner])

  const handleConnectHuggingFace = () => {
    try {
      initiateHuggingFaceAuth()
    } catch (error: any) {
      console.error('Error initiating Hugging Face auth:', error)
      alert('Failed to connect Hugging Face. Please try again.')
    }
  }

  const handleDismissBanner = () => {
    setShowHuggingFaceBanner(false)
    setDismissedBanner(true)
    sessionStorage.setItem('hf_banner_dismissed', 'true')
  }

  const handleMonthSelect = (month: number) => {
    navigate(`/month/${month}`, { state: { user } })
  }

  const months = [
    { number: 1, title: 'Month 1', subtitle: 'Early Development', color: 'bg-pink-100 text-pink-800' },
    { number: 2, title: 'Month 2', subtitle: 'Neural Development', color: 'bg-purple-100 text-purple-800' },
    { number: 3, title: 'Month 3', subtitle: 'Organ Formation', color: 'bg-blue-100 text-blue-800' },
    { number: 4, title: 'Month 4', subtitle: 'Second Trimester', color: 'bg-green-100 text-green-800' },
    { number: 5, title: 'Month 5', subtitle: 'Halfway Point', color: 'bg-yellow-100 text-yellow-800' },
    { number: 6, title: 'Month 6', subtitle: 'Rapid Growth', color: 'bg-orange-100 text-orange-800' },
    { number: 7, title: 'Month 7', subtitle: 'Third Trimester', color: 'bg-red-100 text-red-800' },
    { number: 8, title: 'Month 8', subtitle: 'Final Preparations', color: 'bg-indigo-100 text-indigo-800' },
    { number: 9, title: 'Month 9', subtitle: 'Birth Preparation', color: 'bg-teal-100 text-teal-800' }
  ]

  return (
    <div className="min-h-screen medical-hero">
      <Header 
        user={user} 
        subtitle="Pregnancy Tracker"
      />

      {/* Main Content */}
      <main className="medical-container px-4 sm:px-6 lg:px-8 py-8">
        {/* Hugging Face Connection Banner */}
        {showHuggingFaceBanner && (
          <div className="mb-6 relative">
            <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold medical-text-primary mb-1">
                        Connect Your Hugging Face Account
                      </h3>
                      <p className="text-sm medical-text-secondary mb-3">
                        Connect your Hugging Face account to unlock enhanced AI features and personalized assistance throughout your pregnancy journey.
                      </p>
                      <Button
                        onClick={handleConnectHuggingFace}
                        className="bg-primary hover:bg-primary/90 text-white"
                        size="sm"
                      >
                        Connect Hugging Face
                      </Button>
                    </div>
                  </div>
                  <button
                    onClick={handleDismissBanner}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Dismiss"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl medical-gradient">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
            <div className="relative px-8 py-12 md:px-12 md:py-16">
              <div className="max-w-4xl">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                      Welcome to Your Pregnancy Journey
                    </h1>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                      <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <p className="text-xl text-white/95 leading-relaxed">
                      Track your progress through each month of pregnancy with personalized insights and AI guidance.
                    </p>
                    <p className="text-lg text-white/85 leading-relaxed">
                      Select a month below to explore detailed information about your baby's development, 
                      common symptoms, and helpful tips for that stage of pregnancy.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-6">
                      <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-white text-sm font-medium">AI-Powered</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                        <span className="text-white text-sm font-medium">Personalized</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                        <span className="text-white text-sm font-medium">24/7 Support</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl transform rotate-3"></div>
                      <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-accent rounded-full"></div>
                            <span className="text-white font-medium">Current Progress</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm text-white/80">
                              <span>Pregnancy Timeline</span>
                              <span>9 months</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div className="bg-accent h-2 rounded-full w-1/3"></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">3</div>
                              <div className="text-xs text-white/70">Months Left</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">6</div>
                              <div className="text-xs text-white/70">Weeks Pregnant</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pregnancy Timeline */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold medical-text-primary">Pregnancy Timeline</h2>
                <p className="text-sm medical-text-muted">Explore each month of your pregnancy journey</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {months.map((month) => (
              <div 
                key={month.number} 
                className="group relative"
                onClick={() => handleMonthSelect(month.number)}
              >
                <Card className="medical-card cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50/50">
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{month.number}</span>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-xl font-bold medical-text-primary group-hover:text-primary transition-colors">
                            {month.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full"></div>
                            <span className="text-sm medical-text-secondary">{month.subtitle}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm medical-text-secondary leading-relaxed">
                      Click to explore detailed information about Month {month.number} of your pregnancy.
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        <div className="w-1 h-1 bg-primary/60 rounded-full"></div>
                        <div className="w-1 h-1 bg-primary/30 rounded-full"></div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-200"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 hover:from-pink-100 hover:via-rose-100 hover:to-pink-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            <CardHeader className="relative pb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg group-hover:shadow-pink-500/25 group-hover:scale-110 transition-all duration-300">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-700 transition-colors duration-300">
                    AI Guidance
                  </CardTitle>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-pink-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Get personalized advice and answers to your pregnancy questions with our AI assistant.
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-pink-600">Always Available</span>
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full">
                  <span className="text-xs font-semibold text-pink-700">Smart</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50 hover:from-pink-100 hover:via-rose-100 hover:to-pink-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            <CardHeader className="relative pb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl shadow-lg group-hover:shadow-pink-500/25 group-hover:scale-110 transition-all duration-300">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-700 transition-colors duration-300">
                    Monthly Insights
                  </CardTitle>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-pink-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Detailed information about your baby's development and what to expect each month.
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-pink-600">Comprehensive</span>
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full">
                  <span className="text-xs font-semibold text-pink-700">Detailed</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 hover:from-rose-100 hover:via-pink-100 hover:to-red-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-400/10 to-red-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
            <CardHeader className="relative pb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-lg group-hover:shadow-rose-500/25 group-hover:scale-110 transition-all duration-300">
                    <Apple className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-rose-700 transition-colors duration-300">
                    Diet Plan
                  </CardTitle>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 bg-rose-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-rose-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Personalized nutrition guidance and meal plans tailored for each stage of your pregnancy.
              </p>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-rose-600">Healthy</span>
                </div>
                <div className="px-3 py-1 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full">
                  <span className="text-xs font-semibold text-rose-700">Nutritious</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
