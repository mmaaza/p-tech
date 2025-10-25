import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Header from '@/components/Header'
import { Heart, Calendar, Baby } from 'lucide-react'

const Dashboard = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = location.state?.user

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
            {months.map((month, index) => (
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="medical-card border-0 bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg medical-text-primary">Total Months</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline space-x-2">
                <div className="text-4xl font-bold text-primary">9</div>
                <span className="text-sm medical-text-muted">months</span>
              </div>
              <p className="text-sm medical-text-secondary">Complete pregnancy duration</p>
              <div className="w-full bg-primary/10 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-full"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="medical-card border-0 bg-gradient-to-br from-accent/5 to-primary/5 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Heart className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-lg medical-text-primary">AI Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline space-x-2">
                <div className="text-4xl font-bold text-accent">24/7</div>
                <span className="text-sm medical-text-muted">support</span>
              </div>
              <p className="text-sm medical-text-secondary">Always available assistance</p>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-accent/30 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="medical-card border-0 bg-gradient-to-br from-primary/5 to-accent/5 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Baby className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg medical-text-primary">Personalized</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-baseline space-x-2">
                <div className="text-4xl font-bold text-primary">100%</div>
                <span className="text-sm medical-text-muted">tailored</span>
              </div>
              <p className="text-sm medical-text-secondary">Customized guidance for you</p>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-primary rounded-full"></div>
                <div className="w-1 h-1 bg-primary/60 rounded-full"></div>
                <div className="w-1 h-1 bg-primary/30 rounded-full"></div>
                <div className="w-1 h-1 bg-primary/20 rounded-full"></div>
                <div className="w-1 h-1 bg-primary/10 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
