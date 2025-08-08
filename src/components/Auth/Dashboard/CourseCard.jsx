import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const CourseCard = ({ course }) => {
  const { user } = useAuth()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
            <p className="text-gray-600 mt-1">{course.code}</p>
          </div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
            {course.credits} Credits
          </span>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-700">
            <span className="font-medium">Instructor:</span> {course.instructor}
          </p>
        </div>
        
        <div className="mt-6">
          {user?.role === 'student' ? (
            <Link
              to={`/dashboard/student/courses/${course.id}`}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View Course Details →
            </Link>
          ) : (
            <Link
              to={`/dashboard/staff/courses/${course.id}`}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Manage Course →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCard
