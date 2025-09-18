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
  <div className="fixed inset-0 bg-gradient-to-br from-green-200 via-green-100 to-green-50 backdrop-blur-lg flex items-center justify-center z-50 p-4">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-blue-300/20 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-purple-300/15 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-14 h-14 bg-pink-300/20 rounded-full"></div>
      </div>
      
  <div className="bg-gradient-to-r from-green-100 via-green-50 to-green-200 backdrop-blur-xl rounded-3xl shadow-3xl w-full max-w-lg border border-green-100 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-100 via-green-50 to-green-200"></div>
        </div>
        <div className="bg-gradient-to-r from-green-200 via-green-100 to-green-50 text-green-700 p-8 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-green-50 to-green-200"></div>
          <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/15 rounded-full"></div>
          <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="absolute top-4 right-20 w-6 h-6 bg-green-200/40 rounded-full"></div>
          <div className="absolute bottom-4 left-20 w-4 h-4 bg-green-200/50 rounded-full"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/25 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                <span className="text-2xl">🌟</span>
              </div>
              <div>
                <h2 className="text-center-2xl font-bold mb-1 text-green-700">สมัครสมาชิก</h2>
                <p className="text-green-700 text-base">เริ่มต้นการดูแลสุขภาพกับเรา</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-green-700 hover:text-green-900 bg-white rounded-2xl p-2 transition-all text-2xl shadow-lg"
            >
              ×
            </button>
          </div>
        </div>

  <div className="p-8 relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="flex items-center text-base font-bold text-gray-700 mb-3">
                <span className="mr-2 text-xl">👤</span>
                ชื่อ-นามสกุล
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-base shadow-md hover:shadow-lg bg-white/90 backdrop-blur-sm transform hover:scale-[1.02] text-green-900 placeholder:text-green-700"
                  placeholder="กรอกชื่อ-นามสกุลของคุณ"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">👤</div>
              </div>
            </div>

            <div className="relative">
              <label className="flex items-center text-base font-bold text-gray-700 mb-3">
                <span className="mr-2 text-xl">📧</span>
                อีเมล
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-base shadow-md hover:shadow-lg bg-white/90 backdrop-blur-sm transform hover:scale-[1.02] text-green-900 placeholder:text-green-700"
                  placeholder="กรอกอีเมลของคุณ"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">✨</div>
              </div>
            </div>

            <div className="relative">
              <label className="flex items-center text-base font-bold text-gray-700 mb-3">
                <span className="mr-2 text-xl">🔑</span>
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-base shadow-md hover:shadow-lg bg-white/90 backdrop-blur-sm transform hover:scale-[1.02] text-green-900 placeholder:text-green-700"
                  placeholder="สร้างรหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</div>
              </div>
            </div>

            <div className="relative">
              <label className="flex items-center text-base font-bold text-gray-700 mb-3">
                <span className="mr-2 text-xl">🔐</span>
                ยืนยันรหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all text-base shadow-md hover:shadow-lg bg-white/90 backdrop-blur-sm transform hover:scale-[1.02] text-green-900 placeholder:text-green-700"
                  placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔐</div>
              </div>
            </div>

            {error && (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-700 px-5 py-3 rounded-2xl text-sm shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-red-100/20"></div>
                <div className="flex items-center relative">
                  <span className="mr-2 text-lg">⚠️</span>
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
                  : 'bg-gradient-to-r from-green-200 via-green-100 to-green-50 text-green-900 border border-green-200 hover:from-green-300 hover:via-green-200 hover:to-green-100 hover:shadow-2xl'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity`}></div>
              {isLoading ? (
                <div className="flex items-center justify-center relative">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  กำลังสมัครสมาชิก...
                </div>
              ) : (
                <div className="flex items-center justify-center relative">
                  <span className="mr-2 text-lg">✨</span>
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
                className="text-green-700 hover:text-green-800 font-bold text-base hover:underline transition-all"
              >
                  เข้าสู่ระบบ
              </button>
            </p>
          </div>

          <div className="mt-6 bg-gradient-to-r from-green-100 via-green-50 to-green-200 rounded-2xl p-5 border-2 border-green-200 shadow-lg relative overflow-hidden">
            <div className="absolute top-2 right-2 w-4 h-4 bg-green-200/40 rounded-full"></div>
            <h3 className="flex items-center text-base font-bold text-gray-700 mb-3">
              <span className="mr-2 text-lg">🎁</span>
              สิทธิประโยชน์สมาชิก
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center p-2 bg-gradient-to-r from-green-50 via-green-100 to-green-200 rounded-xl shadow-md border border-green-100">
                <span className="mr-2 text-base">📊</span>
                <span className="text-xs text-green-700 font-medium">บันทึกข้อมูลส่วนตัว</span>
              </div>
              <div className="flex items-center p-2 bg-white rounded-xl shadow-md border border-green-100">
                <span className="mr-2 text-base">🍽️</span>
                <span className="text-xs text-green-700 font-medium">แผนอาหารเฉพาะบุคคล</span>
              </div>
              <div className="flex items-center p-2 bg-white rounded-xl shadow-md border border-green-100">
                <span className="mr-2 text-base">📈</span>
                <span className="text-xs text-green-700 font-medium">ติดตามความคืบหน้า</span>
              </div>
              <div className="flex items-center p-2 bg-white rounded-xl shadow-md border border-green-100">
                <span className="mr-2 text-base">👨‍⚕️</span>
                <span className="text-xs text-green-700 font-medium">คำแนะนำผู้เชี่ยวชาญ</span>
              </div>
            </div>
            <p className="flex items-center justify-center text-xs text-gray-500 mt-3">
              <span className="mr-1 text-sm">💡</span>
              สมัครเพื่อรับสิทธิพิเศษทั้งหมด
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal
