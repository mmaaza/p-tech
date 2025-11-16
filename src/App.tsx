import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DashboardOld from './pages/Dashboard-old'
import MonthPage from './pages/MonthPage'
import Team from './pages/Team'
import HuggingFaceCallback from './pages/HuggingFaceCallback'
import ProtectedRoute from '@/components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard-old" element={<ProtectedRoute><DashboardOld /></ProtectedRoute>} />
      <Route path="/month/:month" element={<ProtectedRoute><MonthPage /></ProtectedRoute>} />
      <Route path="/team" element={<Team />} />
      <Route path="/auth/huggingface/callback" element={<HuggingFaceCallback />} />
    </Routes>
  )
}

export default App

