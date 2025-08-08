import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MarketingNavbar from '../components/MarketingNavbar'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
       <MarketingNavbar />
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-2xl text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">College Management System</h1>
        <p className="text-lg text-gray-600 mb-8">
          A comprehensive platform for students and staff to manage academic activities
        </p>
        <div className="flex justify-center space-x-4">
          {user ? (
            <Link
              to={user.role === 'student' ? '/dashboard/student' : '/dashboard/staff'}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default Home