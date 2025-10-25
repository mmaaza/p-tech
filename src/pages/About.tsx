import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-gray-900">
              AI Pregi
            </Link>
            <div className="space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/about" className="text-blue-600 font-medium">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About AI Pregi</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            AI Pregi is an innovative platform designed to support expecting mothers throughout their pregnancy journey. 
            Our AI-powered system provides personalized insights, health monitoring, and expert guidance.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Insights</h3>
              <p className="text-gray-600">
                Get personalized recommendations based on your pregnancy stage, health data, and preferences.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Monitoring</h3>
              <p className="text-gray-600">
                Track your pregnancy milestones and receive alerts for important appointments and check-ups.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
