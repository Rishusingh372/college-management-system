// Format date to readable string
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Calculate student GPA
export const calculateGPA = (grades) => {
  if (!grades || grades.length === 0) return 'N/A'
  
  const gradePoints = {
    'A': 4,
    'B': 3,
    'C': 2,
    'D': 1,
    'F': 0
  }
  
  const total = grades.reduce((sum, grade) => {
    return sum + (gradePoints[grade.grade] || 0)
  }, 0)
  
  return (total / grades.length).toFixed(2)
}