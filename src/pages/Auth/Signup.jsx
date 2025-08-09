import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import SignupForm from '../../components/Auth/SignupForm'
import { toast } from 'react-toastify'
import MarketingNavbar from '../../components/MarketingNavbar'

const Signup = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      await register({
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        [values.role === 'student' ? 'studentId' : 'staffId']: values.id,
        role: values.role,
        password: values.password
      })
      toast.success('Registration successful! Please login.')
      navigate('/login')
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <MarketingNavbar />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignupForm onSubmit={handleSubmit} loading={loading} />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  By signing up, you agree to our
                </span>
              </div>
            </div>

            <div className="mt-2 text-center">
              <Link 
                to="/terms" 
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link 
                to="/privacy" 
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup