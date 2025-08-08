// Mock authentication functions - replace with actual API calls
const STORAGE_KEY = 'cms_user'

export const loginUser = async (email, password, role) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const user = {
          id: '1',
          email,
          role: role || 'student',
          name: email.split('@')[0],
          token: 'mock-jwt-token'
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
        resolve(user)
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 500)
  })
}

export const registerUser = async (userData) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userData.email && userData.password) {
        resolve({ message: 'User registered successfully' })
      } else {
        reject(new Error('Registration failed'))
      }
    }, 500)
  })
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userStr = localStorage.getItem(STORAGE_KEY)
      if (userStr) {
        try {
          const user = JSON.parse(userStr)
          resolve(user)
        } catch (error) {
          reject(new Error('Invalid user data'))
        }
      } else {
        resolve(null)
      }
    }, 100)
  })
}

export const logoutUser = () => {
  localStorage.removeItem(STORAGE_KEY)
}

export const isAuthenticated = () => {
  return !!localStorage.getItem(STORAGE_KEY)
}
