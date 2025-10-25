import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to AI Pregi
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your AI-powered pregnancy companion. Get personalized insights and support throughout your pregnancy journey.
        </p>
        <div className="space-x-4">
          <Link 
            to="/about" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn More
          </Link>
          <Link 
            to="/contact" 
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
