import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const LoginModal = ({ isOpen, onClose, switchToRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    const result = await login(formData.email, formData.password)
    if (result.success) {
      onClose()
      setFormData({ email: '', password: '' })
    } else {
      setError(result.error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-3xl overflow-hidden transition-all duration-300">
        
        {/* Left: Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center bg-green-200 p-6 w-1/2 border-r border-green-300">
          <img
            src="/people.jpg"
            alt="login-illustration"
            className="w-64 h-64 object-contain rounded-xl shadow-lg"
          />
          <h3 className="mt-4 text-lg font-semibold text-green-800 text-center">ยินดีต้อนรับ</h3>
          <p className="text-green-700 text-sm text-center mt-1">ล๊อคอินเพื่อดำเนินการต่อ</p>
        </div>

        {/* Right: Login Form */}
        <div className="flex-1 flex flex-col justify-center p-8 relative">
          <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 text-2xl font-bold transition-colors rounded-lg px-2 py-1"
          >
            ×
          </button>

          <h2 className="text-center text-3xl font-extrabold text-green-800 mb-6">ล๊อคอิน</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 text-base shadow-sm"
                  placeholder="Email"
                  autoComplete="username"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">✉️</span>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white-700 font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 text-base shadow-sm"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm mt-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember Me
              </label>
                <button type="button" className="text-green-700 hover:text-green-900 hover:underline font-medium">Forgot Password?</button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
                className="w-full bg-green-300 hover:bg-green-400 text-green-900 font-semibold py-2 rounded-lg transition-all disabled:bg-green-100 text-sm shadow-sm mt-4 mb-2"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="mx-2 text-gray-400 text-sm font-medium">Or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              className="w-full flex items-center justify-center border border-green-300 rounded-lg py-2 bg-green-50 hover:bg-green-100 transition-all text-green-900 font-medium text-sm shadow-sm mt-2 mb-2"
            >
              <img src="/google2.jpg" alt="Google" className="w-4 h-4 mr-2" />
              Sign up with Google
            </button>
          </form>

          {/* Switch to Register */}
          <div className="flex items-center justify-center mt-6 gap-2">
            <span className="text-gray-600 text-sm">Don’t have an account?</span>
              <button
                onClick={switchToRegister}
                className="bg-green-300 hover:bg-green-400 text-green-900 font-semibold px-4 py-1.5 rounded-lg text-xs transition-all shadow-sm mt-2"
              >
                Register
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal