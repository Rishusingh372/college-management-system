import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/AuthContext'
import Sidebar from '../../../components/Auth/Dashboard/Sidebar'
import Navbar from '../../../components/Auth/Dashboard/Navbar'
import CourseCard from '../../../components/Auth/Dashboard/CourseCard'
import { getCourses, getGrades } from '../../../utils/db'

const StudentCourses = () => {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [grades, setGrades] = useState({})

  useEffect(() => {
    if (user?.studentId) {
      const allCourses = getCourses()
      const studentGrades = getGrades().filter(grade => 
        grade.studentId === user.studentId
      )
      
      const gradeMap = {}
      studentGrades.forEach(grade => {
        gradeMap[grade.courseId] = grade.grade
      })
      setGrades(gradeMap)
      
      setCourses(allCourses.filter(course => 
        user.courses?.includes(course.id)
      ))
    }
  }, [user])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Courses</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="relative">
                <CourseCard course={course} />
                {grades[course.id] && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Grade: {grades[course.id]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentCourses