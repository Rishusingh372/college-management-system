// Initialize database
export const initializeDB = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]))
  }
  if (!localStorage.getItem('courses')) {
    localStorage.setItem('courses', JSON.stringify([
      { id: 1, name: 'Mathematics', code: 'MATH101', credits: 3, instructor: 'Dr. Smith' },
      { id: 2, name: 'Computer Science', code: 'CS101', credits: 4, instructor: 'Prof. Johnson' },
      { id: 3, name: 'Physics', code: 'PHY101', credits: 3, instructor: 'Dr. Williams' },
    ]))
  }
  if (!localStorage.getItem('grades')) {
    localStorage.setItem('grades', JSON.stringify([]))
  }
  if (!localStorage.getItem('attendance')) {
    localStorage.setItem('attendance', JSON.stringify([]))
  }
  if (!localStorage.getItem('library')) {
    localStorage.setItem('library', JSON.stringify({
      books: [
        { id: 1, title: 'Introduction to Algorithms', author: 'Cormen', available: true },
        { id: 2, title: 'Clean Code', author: 'Robert Martin', available: true },
      ],
      issuedBooks: []
    }))
  }
}

// User operations
export const getUsers = () => JSON.parse(localStorage.getItem('users')) || []

// Course operations
export const getCourses = () => JSON.parse(localStorage.getItem('courses')) || []
export const getCourseById = (id) => getCourses().find(course => course.id === id)

// Grade operations
export const getGrades = () => JSON.parse(localStorage.getItem('grades')) || []
export const saveGrades = (newGrades) => {
  const existingGrades = getGrades()
  const updatedGrades = [...existingGrades, ...newGrades]
  localStorage.setItem('grades', JSON.stringify(updatedGrades))
}

// Student operations
export const getStudents = () => {
  const users = getUsers()
  return users.filter(user => user.role === 'student')
}

// Course operations
export const addCourse = (course) => {
  const courses = getCourses()
  const newCourse = {
    id: Math.max(...courses.map(c => c.id), 0) + 1,
    ...course
  }
  courses.push(newCourse)
  localStorage.setItem('courses', JSON.stringify(courses))
  return newCourse
}

// Attendance operations
export const getAttendance = () => JSON.parse(localStorage.getItem('attendance')) || []

export const markAttendance = (attendanceData) => {
  const attendance = getAttendance()
  const newAttendance = {
    id: Date.now(),
    ...attendanceData,
    date: new Date().toISOString()
  }
  attendance.push(newAttendance)
  localStorage.setItem('attendance', JSON.stringify(attendance))
  return newAttendance
}

// Library operations
export const getLibraryBooks = () => JSON.parse(localStorage.getItem('library')) || { books: [], issuedBooks: [] }
export const issueBook = (bookId, studentEmail, staffName) => {
  const library = getLibraryBooks()
  const book = library.books.find(b => b.id === bookId)
  
  if (!book || !book.available) {
    throw new Error('Book not available')
  }

  book.available = false
  library.issuedBooks.push({
    id: Date.now(),
    bookId,
    bookTitle: book.title,
    studentEmail,
    staffName,
    issueDate: new Date().toISOString()
  })

  localStorage.setItem('library', JSON.stringify(library))
}

export const returnBook = (issueId) => {
  const library = getLibraryBooks()
  const issueIndex = library.issuedBooks.findIndex(i => i.id === issueId)
  
  if (issueIndex === -1) {
    throw new Error('Issue record not found')
  }

  const bookId = library.issuedBooks[issueIndex].bookId
  const book = library.books.find(b => b.id === bookId)
  if (book) {
    book.available = true
  }

  library.issuedBooks.splice(issueIndex, 1)
  localStorage.setItem('library', JSON.stringify(library))
}