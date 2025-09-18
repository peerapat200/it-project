import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock users database
  const mockUsers = [
    {
      id: 1,
      email: 'admin@healthyfood.com',
      password: 'admin123',
      name: 'Admin User',
      role: 'admin',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      email: 'user@healthyfood.com',
      password: 'user123',
      name: 'นายสมชาย ใจดี',
      role: 'user',
      avatar: '👤'
    },
    {
      id: 3,
      email: 'demo@healthyfood.com',
      password: 'demo123',
      name: 'นางสาวสมหญิง สุขใจ',
      role: 'user',
      avatar: '👩'
    }
  ]

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('healthyfood_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser }
      delete userWithoutPassword.password
      
      setUser(userWithoutPassword)
      localStorage.setItem('healthyfood_user', JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return { success: true, user: userWithoutPassword }
    } else {
      setIsLoading(false)
      return { success: false, error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' }
    }
  }

  const register = async (userData) => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: 'อีเมลนี้มีการใช้งานแล้ว' }
    }
    
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      role: 'user',
      avatar: '👤'
    }
    
    mockUsers.push(newUser)
    const userWithoutPassword = { ...newUser }
    delete userWithoutPassword.password
    
    setUser(userWithoutPassword)
    localStorage.setItem('healthyfood_user', JSON.stringify(userWithoutPassword))
    setIsLoading(false)
    return { success: true, user: userWithoutPassword }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('healthyfood_user')
  }

  const updateProfile = async (updatedData) => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('healthyfood_user', JSON.stringify(updatedUser))
    setIsLoading(false)
    return { success: true, user: updatedUser }
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAdmin: user?.role === 'admin',
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
