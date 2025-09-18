import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const RegisterModal = ({ isOpen, onClose, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const { register, isLoading } = useAuth()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน')
      return
    }

    if (formData.password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
      return
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    })
    
    if (result.success) {
      onClose()
      setFormData({ name: '', email: '', password: '', confirmPassword: '' })
    } else {
      setError(result.error)
    }
  }

  if (!isOpen) return null

  return (
  <div className="fixed inset-0 bg-gradient-to-br from-green-900/80 via-green-600/80 to-green-200/80 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-blue-300/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-purple-300/15 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-14 h-14 bg-pink-300/20 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      
  <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-3xl w-full max-w-lg transform transition-all animate-scale-in border border-green-100 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-300 via-green-200 to-green-100 animate-pulse"></div>
        </div>
        <div className="bg-gradient-to-r from-green-400 via-green-200 to-green-100 text-white p-8 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/15 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-4 right-20 w-6 h-6 bg-green-200/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-20 w-4 h-4 bg-green-200/50 rounded-full animate-pulse"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/25 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg transform hover:scale-110 transition-transform">
                <span className="text-2xl animate-bounce">🌟</span>
              </div>
              <div>
                <h2 className="text-center-2xl font-bold mb-1">สมัครสมาชิก</h2>
                <p className="text-green-50 text-base">เริ่มต้นการดูแลสุขภาพกับเรา</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 hover:bg-green-400/30 rounded-2xl p-2 transition-all text-2xl transform hover:scale-110 shadow-lg hover:shadow-xl hover:rotate-90"
            >
              ×
            </button>
          </div>
        </div>

  <div className="p-8 relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="flex items-center text-base font-bold text-gray-700 mb-3">
                <span className="mr-2 text-xl animate-bounce">👤</span>
                ชื่อ-นามสกุล
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-base shadow-md hover:shadow-lg bg-white/90 backdrop-blur-sm transform hover:scale-[1.02]"
                  placeholder="กรอกชื่อ-นามสกุลของคุณ"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-pulse">👤</div>
              </div>
            </div>

            <div className="relative">
              <label className="flex items-center text-base font-bold text-gray-700 mb-3">
                <span className="mr-2 text-xl animate-bounce" style={{animationDelay: '0.1s'}}>📧</span>
                อีเมล
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-base shadow-md hover:shadow-lg bg-white/90 backdrop-blur-sm transform hover:scale-[1.02]"
                  placeholder="กรอกอีเมลของคุณ"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-pulse" style={{animationDelay: '0.2s'}}>✨</div>
              </div>
            </div>

            <div className="relative">
              <label className="flex items-center text-base font-bold text-gray-700 mb-3">
                <span className="mr-2 text-xl animate-bounce" style={{animationDelay: '0.2s'}}>🔑</span>
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-base shadow-md hover:shadow-lg bg-white/90 backdrop-blur-sm transform hover:scale-[1.02]"
                  placeholder="สร้างรหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-pulse" style={{animationDelay: '0.3s'}}>🔒</div>
              </div>
            </div>

            <div className="relative">
              <label className="flex items-center text-base font-bold text-gray-700 mb-3">
                <span className="mr-2 text-xl animate-bounce" style={{animationDelay: '0.3s'}}>🔐</span>
                ยืนยันรหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-base shadow-md hover:shadow-lg bg-white/90 backdrop-blur-sm transform hover:scale-[1.02]"
                  placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-pulse" style={{animationDelay: '0.4s'}}>🔐</div>
              </div>
            </div>

            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-5 py-3 rounded-2xl text-sm shadow-lg animate-shake relative overflow-hidden">
                <div className="absolute inset-0 bg-red-100/20 animate-pulse"></div>
                <div className="flex items-center relative">
                  <span className="mr-2 text-lg animate-bounce">⚠️</span>
                  {error}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-5 rounded-2xl font-bold text-base transition-all shadow-xl relative overflow-hidden ${
                isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-400 via-green-200 to-green-100 hover:from-green-500 hover:via-green-300 hover:to-green-200 text-white hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity ${!isLoading ? 'animate-pulse' : ''}`}></div>
              {isLoading ? (
                <div className="flex items-center justify-center relative">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  กำลังสมัครสมาชิก...
                </div>
              ) : (
                <div className="flex items-center justify-center relative">
                  <span className="mr-2 text-lg animate-bounce">✨</span>
                  สมัครสมาชิก
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-green-700 text-base">
              มีบัญชีอยู่แล้ว?{' '}
              <button
                onClick={switchToLogin}
                className="text-green-700 hover:text-green-800 font-bold text-base hover:underline transition-all transform hover:scale-105 animate-pulse"
              >
                  เข้าสู่ระบบ
              </button>
            </p>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-50 via-green-100 to-green-200 rounded-2xl p-5 border-2 border-green-200 shadow-lg relative overflow-hidden">
            <div className="absolute top-2 right-2 w-4 h-4 bg-green-200/40 rounded-full animate-ping"></div>
            <h3 className="flex items-center text-base font-bold text-gray-700 mb-3">
              <span className="mr-2 text-lg animate-bounce">🎁</span>
              สิทธิประโยชน์สมาชิก
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center p-2 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] border border-green-100">
                <span className="mr-2 text-base">📊</span>
                <span className="text-xs text-green-700 font-medium">บันทึกข้อมูลส่วนตัว</span>
              </div>
              <div className="flex items-center p-2 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] border border-green-100">
                <span className="mr-2 text-base">🍽️</span>
                <span className="text-xs text-green-700 font-medium">แผนอาหารเฉพาะบุคคล</span>
              </div>
              <div className="flex items-center p-2 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] border border-green-100">
                <span className="mr-2 text-base">📈</span>
                <span className="text-xs text-green-700 font-medium">ติดตามความคืบหน้า</span>
              </div>
              <div className="flex items-center p-2 bg-white/80 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] border border-green-100">
                <span className="mr-2 text-base">👨‍⚕️</span>
                <span className="text-xs text-green-700 font-medium">คำแนะนำผู้เชี่ยวชาญ</span>
              </div>
            </div>
            <p className="flex items-center justify-center text-xs text-gray-500 mt-3">
              <span className="mr-1 text-sm animate-pulse">💡</span>
              สมัครเพื่อรับสิทธิพิเศษทั้งหมด
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal
