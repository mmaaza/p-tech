import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DashboardOld from './pages/Dashboard-old'
import MonthPage from './pages/MonthPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard-old" element={<DashboardOld />} />
      <Route path="/month/:month" element={<MonthPage />} />
    </Routes>
  )
}

export default App

