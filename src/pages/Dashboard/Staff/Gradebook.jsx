import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import Sidebar from '../../../components/Auth/Dashboard/Sidebar'
import Navbar from '../../../components/Auth/Dashboard/Navbar'
import { getCourses, getStudents, getGrades, saveGrades } from '../../../utils/db'
import { toast } from 'react-toastify'

const Gradebook = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [students, setStudents] = useState([])
  const [grades, setGrades] = useState({})

  useEffect(() => {
    const staffCourses = getCourses().filter(course => course.instructor === user?.name)
    setCourses(staffCourses)
    setGrades(getGrades())
  }, [user])

  useEffect(() => {
    if (selectedCourse) {
      const enrolledStudents = getStudents().filter(student => 
        student.courses?.includes(selectedCourse.id)
      )
      setStudents(enrolledStudents)
    }
  }, [selectedCourse])

  const handleGradeChange = (studentId, grade) => {
    if (!selectedCourse) return
    
    setGrades(prev => ({
      ...prev,
      [`${selectedCourse.id}-${studentId}`]: grade
    }))
  }

  const handleSaveGrades = () => {
    if (!selectedCourse) return
    
    const gradesToSave = students.map(student => ({
      courseId: selectedCourse.id,
      studentId: student.id,
      grade: grades[`${selectedCourse.id}-${student.id}`] || '',
      instructor: user.name
    }))
    
    saveGrades(gradesToSave)
    toast.success('Grades saved successfully!')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="staff" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Gradebook</h1>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
            <select
              onChange={(e) => setSelectedCourse(courses.find(c => c.id === parseInt(e.target.value)))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
          
          {selectedCourse && (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">{selectedCourse.name}</h2>
                <p className="text-gray-600">{selectedCourse.code}</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map(student => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={grades[`${selectedCourse.id}-${student.id}`] || ''}
                            onChange={(e) => handleGradeChange(student.id, e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                          >
                            <option value="">Select grade</option>
                            <option value="A">A (90-100)</option>
                            <option value="B">B (80-89)</option>
                            <option value="C">C (70-79)</option>
                            <option value="D">D (60-69)</option>
                            <option value="F">F (Below 60)</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 text-right">
                <button
                  onClick={handleSaveGrades}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Grades
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Gradebook