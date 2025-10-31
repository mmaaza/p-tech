import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Heart, Baby, Calendar, LogOut } from 'lucide-react'

interface DashboardProps {
  user: {
    name: string
    email: string
  }
  onLogout: () => void
  onMonthSelect: (value: string) => void
}

const Dashboard = ({ user, onLogout, onMonthSelect }: DashboardProps) => {
  const [selectedMonth, setSelectedMonth] = useState('')

  const pregnancyMonths = [
    { value: '1', label: 'Month 1 - Early Development', description: 'Conception and implantation' },
    { value: '2', label: 'Month 2 - Neural Development', description: 'Brain and nervous system formation' },
    { value: '3', label: 'Month 3 - Organ Formation', description: 'Major organs begin to develop' },
    { value: '4', label: 'Month 4 - Second Trimester', description: 'Movement and growth acceleration' },
    { value: '5', label: 'Month 5 - Halfway Point', description: 'Gender determination possible' },
    { value: '6', label: 'Month 6 - Rapid Growth', description: 'Lung development and weight gain' },
    { value: '7', label: 'Month 7 - Third Trimester', description: 'Brain development and fat storage' },
    { value: '8', label: 'Month 8 - Final Preparations', description: 'Organ maturation and positioning' },
    { value: '9', label: 'Month 9 - Birth Preparation', description: 'Full term and delivery readiness' }
  ]

  const handleMonthSelection = (value: string) => {
    setSelectedMonth(value)
    onMonthSelect(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Baby className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purple-700">PREGNITECH</h1>
                <p className="text-sm text-gray-600">AI-Based Pregnancy Guidance</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome, {user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center space-x-2">
                <Heart className="h-6 w-6" />
                <span>Your Pregnancy Journey</span>
              </CardTitle>
              <CardDescription className="text-purple-100">
                Get personalized AI-powered guidance for every stage of your pregnancy
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Month Selection */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span>Select Pregnancy Month</span>
              </CardTitle>
              <CardDescription>
                Choose your current month of pregnancy to get specific guidance and information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={selectedMonth} onValueChange={handleMonthSelection}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your pregnancy month..." />
                  </SelectTrigger>
                  <SelectContent>
                    {pregnancyMonths.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{month.label}</span>
                          <span className="text-sm text-gray-500">{month.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedMonth && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-purple-800">
                          {pregnancyMonths.find(m => m.value === selectedMonth)?.label}
                        </h3>
                        <p className="text-sm text-purple-600">
                          {pregnancyMonths.find(m => m.value === selectedMonth)?.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        Month {selectedMonth}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get personalized advice and answers to your pregnancy questions with our AI assistant.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Detailed information about your baby's development and what to expect each month.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Expert Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access to reliable medical information and guidance throughout your pregnancy journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

