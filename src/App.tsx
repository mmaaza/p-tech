import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import MonthPage from './components/MonthPage'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState('dashboard') // 'dashboard' or 'month'
  const [selectedMonth, setSelectedMonth] = useState(null)

  const handleLogin = (userData: any) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('dashboard')
    setSelectedMonth(null)
  }

  const handleMonthSelect = (month: any) => {
    setSelectedMonth(month)
    setCurrentView('month')
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    setSelectedMonth(null)
  }

  // If user is not logged in, show login page
  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  // If user is logged in, show appropriate view
  if (currentView === 'month' && selectedMonth) {
    return (
      <MonthPage 
        month={selectedMonth}
        onBack={handleBackToDashboard}
        user={user}
      />
    )
  }

  // Default view is dashboard
  return (
    <Dashboard 
      user={user}
      onLogout={handleLogout}
      onMonthSelect={handleMonthSelect}
    />
  )
}

export default App

