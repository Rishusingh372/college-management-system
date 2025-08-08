import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import StudentProfile from './pages/Dashboard/Student/Profile'
import StudentCourses from './pages/Dashboard/Student/Courses'
import StaffGradebook from './pages/Dashboard/Staff/Gradebook'
import StaffAttendance from './pages/Dashboard/Staff/Attendance'
import StaffCourses from './pages/Dashboard/Staff/Courses'
import NotFound from './pages/NotFound'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Footer from './components/Auth/Footer' // Import the Footer component

// Layout component that includes the footer
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes with Footer */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/signup" element={<Layout><Signup /></Layout>} />
        
        {/* Student Routes with Footer */}
        <Route path="/dashboard/student" element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route index element={<Layout><StudentProfile /></Layout>} />
          <Route path="profile" element={<Layout><StudentProfile /></Layout>} />
          <Route path="courses" element={<Layout><StudentCourses /></Layout>} />
        </Route>
        
        {/* Staff Routes with Footer */}
        <Route path="/dashboard/staff" element={<ProtectedRoute allowedRoles={['staff']} />}>
          <Route index element={<Layout><StaffCourses /></Layout>} />
          <Route path="courses" element={<Layout><StaffCourses /></Layout>} />
          <Route path="gradebook" element={<Layout><StaffGradebook /></Layout>} />
          <Route path="attendance" element={<Layout><StaffAttendance /></Layout>} />
        </Route>
        
        {/* 404 Page with Footer */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </AuthProvider>
  )
}

export default App