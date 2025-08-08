import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import Sidebar from '../../../components/Auth/Dashboard/Sidebar'
import Navbar from '../../../components/Auth/Dashboard/Navbar'
import CourseCard from '../../../components/Auth/Dashboard/CourseCard'
import { getCourses, addCourse } from '../../../utils/db'
import { toast } from 'react-toastify'

const StaffCourses = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCourse, setNewCourse] = useState({
    name: '',
    code: '',
    credits: 3,
    instructor: user?.name || ''
  })

  useEffect(() => {
    const staffCourses = getCourses().filter(course => course.instructor === user?.name)
    setCourses(staffCourses)
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddCourse = () => {
    try {
      const addedCourse = addCourse(newCourse)
      setCourses(prev => [...prev, addedCourse])
      setNewCourse({
        name: '',
        code: '',
        credits: 3,
        instructor: user?.name || ''
      })
      setShowAddForm(false)
      toast.success('Course added successfully!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="staff" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add New Course
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCourse.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    name="code"
                    value={newCourse.code}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
                  <select
                    name="credits"
                    value={newCourse.credits}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {[1, 2, 3, 4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCourse}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Course
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default StaffCourses