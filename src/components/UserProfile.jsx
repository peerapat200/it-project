import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const UserProfile = ({ isOpen, onClose }) => {
  const { user, logout, updateProfile, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    gender: user?.gender || '',
    age: user?.age || '',
    weight: user?.weight || '',
    height: user?.height || '',
    avatar: user?.avatar || ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    const result = await updateProfile(formData)
    if (result.success) {
      setIsEditing(false)
    }
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{user.avatar}</div>
              <div>
                <h2 className="text-xl font-bold">โปรไฟล์</h2>
                <p className="text-green-100 text-sm">
                  {user.role === 'admin' ? '👑 ผู้ดูแลระบบ' : '👤 สมาชิก'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ชื่อ-นามสกุล
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                  {user.name}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">เพศ</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">เลือกเพศ</option>
                  <option value="male">ชาย</option>
                  <option value="female">หญิง</option>
                  <option value="other">อื่นๆ</option>
                </select>
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                  {user.gender === 'male' ? 'ชาย' : user.gender === 'female' ? 'หญิง' : user.gender || '-'}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">อายุ (ปี)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user.age || '-'}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">น้ำหนัก (กก.)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user.weight || '-'}</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ส่วนสูง (ซม.)</label>
              {isEditing ? (
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user.height || '-'}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">{user.email}</div>
              )}
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-800 mb-2">📊 สถิติการใช้งาน</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-lg font-bold text-green-600">12</div>
                  <div className="text-xs text-gray-600">ครั้งที่คำนวณ</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-lg font-bold text-green-600">5</div>
                  <div className="text-xs text-gray-600">วันที่ใช้งาน</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {isEditing ? (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  {isLoading ? 'กำลังบันทึก...' : 'บันทึก'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setFormData({
                      name: user.name || '',
                      email: user.email || '',
                      gender: user.gender || '',
                      age: user.age || '',
                      weight: user.weight || '',
                      height: user.height || '',
                      avatar: user.avatar || ''
                    })
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  ยกเลิก
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                แก้ไขข้อมูล
              </button>
            )}

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
