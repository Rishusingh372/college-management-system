import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const StudentCard = ({ student }) => {
  const { user } = useAuth()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 p-6">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-indigo-600 font-medium">
            {student.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
          <p className="text-gray-600">{student.email}</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm text-gray-500">Student ID</p>
          <p className="font-medium">{student.id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Enrolled Courses</p>
          <p className="font-medium">{student.courses?.length || 0}</p>
        </div>
      </div>
      
      {user?.role === 'staff' && (
        <div className="mt-4 flex space-x-2">
          <Link
            to={`/dashboard/staff/students/${student.id}/grades`}
            className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
          >
            Grades
          </Link>
          <Link
            to={`/dashboard/staff/students/${student.id}/attendance`}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            Attendance
          </Link>
        </div>
      )}
    </div>
  )
}

export default StudentCard