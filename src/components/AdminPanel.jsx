import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const AdminPanel = () => {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')

  // Mock data for admin panel
  const [users] = useState([
    { id: 1, name: 'นายสมชาย ใจดี', email: 'user@healthyfood.com', role: 'user', status: 'active', joinDate: '2025-01-15' },
    { id: 2, name: 'นางสาวสมหญิง สุขใจ', email: 'demo@healthyfood.com', role: 'user', status: 'active', joinDate: '2025-01-20' },
    { id: 3, name: 'นายทดสอบ ระบบ', email: 'test@healthyfood.com', role: 'user', status: 'inactive', joinDate: '2025-01-25' }
  ])

  const [statistics] = useState({
    totalUsers: 156,
    activeUsers: 142,
    totalCalculations: 1234,
    dailyActiveUsers: 45
  })

  const sections = [
    { id: 'dashboard', name: 'แดชบอร์ด', icon: '📊' },
    { id: 'users', name: 'จัดการสมาชิก', icon: '👥' },
    { id: 'content', name: 'จัดการเนื้อหา', icon: '📝' },
    { id: 'reports', name: 'รายงาน', icon: '📈' },
    { id: 'settings', name: 'ตั้งค่าระบบ', icon: '⚙️' }
  ]

  const DashboardContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">แดชบอร์ดผู้ดูแลระบบ</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{statistics.totalUsers}</div>
              <div className="text-blue-100">สมาชิกทั้งหมด</div>
            </div>
            <div className="text-3xl opacity-80">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{statistics.activeUsers}</div>
              <div className="text-green-100">สมาชิกที่ใช้งาน</div>
            </div>
            <div className="text-3xl opacity-80">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{statistics.totalCalculations}</div>
              <div className="text-purple-100">การคำนวณทั้งหมด</div>
            </div>
            <div className="text-3xl opacity-80">🧮</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{statistics.dailyActiveUsers}</div>
              <div className="text-orange-100">ใช้งานวันนี้</div>
            </div>
            <div className="text-3xl opacity-80">📅</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">📈 การใช้งานรายสัปดาห์</h3>
          <div className="space-y-3">
            {['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'].map((day, index) => (
              <div key={day} className="flex items-center">
                <div className="w-16 text-sm">{day}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 ml-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">🚀 กิจกรรมล่าสุด</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-600 mr-3">👤</div>
              <div className="flex-1">
                <div className="text-sm font-medium">สมาชิกใหม่เข้าร่วม</div>
                <div className="text-xs text-gray-500">5 นาทีที่แล้ว</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600 mr-3">🧮</div>
              <div className="flex-1">
                <div className="text-sm font-medium">การคำนวณใหม่ 12 ครั้ง</div>
                <div className="text-xs text-gray-500">15 นาทีที่แล้ว</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <div className="text-purple-600 mr-3">📊</div>
              <div className="flex-1">
                <div className="text-sm font-medium">รายงานรายวันสร้างแล้ว</div>
                <div className="text-xs text-gray-500">1 ชั่วโมงที่แล้ว</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const UsersContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">จัดการสมาชิก</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          + เพิ่มสมาชิกใหม่
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">อีเมล</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่เข้าร่วม</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">👤</div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">แก้ไข</button>
                      <button className="text-red-600 hover:text-red-800">ลบ</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />
      case 'users':
        return <UsersContent />
      case 'content':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">จัดการเนื้อหา</h2>
            <p className="text-gray-600">ฟีเจอร์นี้อยู่ในระหว่างการพัฒนา</p>
          </div>
        )
      case 'reports':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📈</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">รายงาน</h2>
            <p className="text-gray-600">ฟีเจอร์นี้อยู่ในระหว่างการพัฒนา</p>
          </div>
        )
      case 'settings':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚙️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">ตั้งค่าระบบ</h2>
            <p className="text-gray-600">ฟีเจอร์นี้อยู่ในระหว่างการพัฒนา</p>
          </div>
        )
      default:
        return <DashboardContent />
    }
  }

  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">ไม่มีสิทธิ์เข้าถึง</h2>
        <p className="text-gray-600">คุณต้องเป็นผู้ดูแลระบบเพื่อเข้าถึงหน้านี้</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg mb-8">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">👑</div>
          <div>
            <h1 className="text-2xl font-bold">แผงควบคุมผู้ดูแลระบบ</h1>
            <p className="text-green-100">ยินดีต้อนรับ, {user?.name}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeSection === section.id
                      ? 'bg-green-100 text-green-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{section.icon}</span>
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6 min-h-[600px]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
