import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Sidebar from '../../../components/Auth/Dashboard/Sidebar';
import Navbar from '../../../components/Auth/Dashboard/Navbar';
import { getCourses, getGrades, getAttendance } from '../../../utils/db';

const StudentProfile = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = () => {
      if (!user?.studentId) return;

      setIsLoading(true);
      
      try {
        // Fetch courses the student is enrolled in
        const studentCourses = getCourses().filter(course => 
          user.courses?.includes(course.id)
        );
        
        // Fetch student's grades
        const studentGrades = getGrades().filter(grade => 
          grade.studentId === user.studentId
        );
        
        // Calculate attendance statistics
        const studentAttendance = getAttendance().filter(record => 
          record.studentId === user.studentId
        );
        
        const attendanceByCourse = calculateAttendance(studentAttendance);
        
        setCourses(studentCourses);
        setGrades(studentGrades);
        setAttendance(attendanceByCourse);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [user]);

  const calculateAttendance = (attendanceRecords) => {
    return attendanceRecords.reduce((acc, record) => {
      if (!acc[record.courseId]) {
        acc[record.courseId] = { present: 0, total: 0 };
      }
      acc[record.courseId].total++;
      if (record.status === 'present') acc[record.courseId].present++;
      return acc;
    }, {});
  };

  const calculateGPA = () => {
    if (grades.length === 0) return 'N/A';
    
    const gradePoints = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
    const total = grades.reduce((sum, grade) => sum + (gradePoints[grade.grade] || 0), 0);
    return (total / grades.length).toFixed(2);
  };

  const calculateOverallAttendance = () => {
    const attendanceValues = Object.values(attendance);
    if (attendanceValues.length === 0) return 'N/A';
    
    const totalPercentage = attendanceValues.reduce(
      (sum, {present, total}) => sum + (present / total), 0
    );
    return Math.round((totalPercentage / attendanceValues.length) * 100) + '%';
  };

  const getGradeColor = (grade) => {
    const gradeColors = {
      'A': 'bg-green-100 text-green-800',
      'B': 'bg-blue-100 text-blue-800',
      'C': 'bg-yellow-100 text-yellow-800',
      'D': 'bg-orange-100 text-orange-800',
      'F': 'bg-red-100 text-red-800',
      'default': 'bg-gray-100 text-gray-800'
    };
    return grade ? gradeColors[grade] || gradeColors.default : gradeColors.default;
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar role="student" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
            <div className="text-xl font-medium">Loading profile data...</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Student Profile</h1>
          
          {/* Profile Header Section */}
          <ProfileHeader 
            user={user} 
            coursesCount={courses.length}
            gpa={calculateGPA()}
            overallAttendance={calculateOverallAttendance()}
          />
          
          {/* Course Performance Table */}
          <CoursePerformanceTable 
            courses={courses} 
            grades={grades} 
            attendance={attendance} 
            getGradeColor={getGradeColor}
          />
        </main>
      </div>
    </div>
  );
};

// Extracted Profile Header Component
const ProfileHeader = ({ user, coursesCount, gpa, overallAttendance }) => (
  <div className="bg-white shadow rounded-lg p-6 mb-6">
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="h-24 w-24 bg-indigo-100 rounded-full flex items-center justify-center">
        <span className="text-3xl text-indigo-600">
          {user?.name?.charAt(0).toUpperCase()}
        </span>
      </div>
      
      <div className="flex-1 space-y-2">
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <p className="text-gray-600">{user?.email}</p>
        <p className="text-gray-600">{user?.mobile}</p>
      </div>
      
      <div className="bg-indigo-50 p-4 rounded-lg min-w-[180px]">
        <h3 className="font-semibold text-indigo-800">Student ID</h3>
        <p className="text-gray-700">{user?.studentId}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <StatCard 
        title="Enrolled Courses" 
        value={coursesCount} 
        bgColor="bg-green-50" 
        textColor="text-green-800"
      />
      <StatCard 
        title="Current GPA" 
        value={gpa} 
        bgColor="bg-purple-50" 
        textColor="text-purple-800"
      />
      <StatCard 
        title="Overall Attendance" 
        value={overallAttendance} 
        bgColor="bg-blue-50" 
        textColor="text-blue-800"
      />
    </div>
  </div>
);

// Extracted Stat Card Component
const StatCard = ({ title, value, bgColor, textColor }) => (
  <div className={`${bgColor} p-4 rounded-lg`}>
    <h3 className={`font-semibold ${textColor}`}>{title}</h3>
    <p className="text-2xl font-bold text-gray-700">{value}</p>
  </div>
);

// Extracted Course Performance Table Component
const CoursePerformanceTable = ({ courses, grades, attendance, getGradeColor }) => (
  <div className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl font-semibold mb-4">Course Performance</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.length > 0 ? (
            courses.map(course => {
              const grade = grades.find(g => g.courseId === course.id)?.grade;
              const courseAttendance = attendance[course.id];
              const attendancePercentage = courseAttendance 
                ? Math.round((courseAttendance.present / courseAttendance.total) * 100) 
                : null;

              return (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.name}</div>
                    <div className="text-sm text-gray-500">{course.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGradeColor(grade)}`}>
                      {grade || 'Not graded'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {attendancePercentage !== null ? (
                      <span className="text-sm text-gray-900">{attendancePercentage}%</span>
                    ) : (
                      <span className="text-sm text-gray-500">No records</span>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                No courses enrolled
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default StudentProfile;