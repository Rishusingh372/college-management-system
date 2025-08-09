import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import MarketingNavbar from '../components/MarketingNavbar'

const Home = () => {
  const { user } = useAuth()

  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="relative min-h-screen">
        <MarketingNavbar />
        <div 
          className="absolute inset-0 bg-gray-900 opacity-50"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4">
          <div className="max-w-2xl text-center p-8 bg-white bg-opacity-90 rounded-lg shadow-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Institution with Our College Management System
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              A comprehensive platform that streamlines academic processes, enhances communication, 
              and improves the overall educational experience for students and staff.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              {user ? (
                <Link
                  to={user.role === 'student' ? '/dashboard/student' : '/dashboard/staff'}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 text-lg font-medium"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300 text-lg font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors duration-300 text-lg font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              About Our Platform
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Students learning" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Empowering Educational Institutions
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Our College Management System is designed to revolutionize how educational institutions 
                operate. We provide a seamless digital environment that connects students, faculty, and 
                administration in one unified platform.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Automated attendance tracking</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Real-time grade management</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Comprehensive course management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed to meet all your institutional needs
            </p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Student Dashboard",
                description: "Personalized dashboard for students to track courses, grades, and attendance",
                icon: "👨‍🎓"
              },
              {
                title: "Staff Portal",
                description: "Comprehensive tools for faculty to manage classes and student performance",
                icon: "👩‍🏫"
              },
              {
                title: "Attendance System",
                description: "Automated attendance tracking with real-time reporting",
                icon: "📅"
              },
              {
                title: "Grade Management",
                description: "Easy grade entry and analysis for instructors",
                icon: "📊"
              },
              {
                title: "Course Catalog",
                description: "Complete course management with enrollment tracking",
                icon: "📚"
              },
              {
                title: "Communication Hub",
                description: "Integrated messaging system for students and faculty",
                icon: "💬"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Placement Partners Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Our Placement Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by leading companies worldwide
            </p>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
            {[
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Google_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/4/4d/Microsoft_logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/9/96/Tata_Consultancy_Services_Logo.svg",
              "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
            ].map((logo, index) => (
              <div key={index} className="flex justify-center p-4 bg-gray-50 rounded-lg">
                <img 
                  src={logo} 
                  alt="Company logo" 
                  className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-indigo-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Get In Touch
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Have questions? We're here to help
            </p>
            <div className="w-20 h-1 bg-white mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-300 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-300 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@collegems.com</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-6 w-6 text-indigo-300 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Education Street, Campus City, CC 12345</span>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">Name</label>
                  <input type="text" id="name" className="mt-1 block w-full bg-indigo-800 border-indigo-600 rounded-md text-white placeholder-indigo-300 focus:ring-white focus:border-white" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input type="email" id="email" className="mt-1 block w-full bg-indigo-800 border-indigo-600 rounded-md text-white placeholder-indigo-300 focus:ring-white focus:border-white" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium">Message</label>
                  <textarea id="message" rows={4} className="mt-1 block w-full bg-indigo-800 border-indigo-600 rounded-md text-white placeholder-indigo-300 focus:ring-white focus:border-white" placeholder="Your message"></textarea>
                </div>
                <div>
                  <button type="submit" className="px-6 py-3 bg-white text-indigo-700 rounded-md hover:bg-gray-100 transition-colors duration-300 text-lg font-medium">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home