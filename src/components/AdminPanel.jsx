import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const AdminPanel = () => {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')

  // Mock data for admin panel
  const [users, setUsers] = useState([
    { id: 1, name: 'นายสมชาย ใจดี', email: 'user@healthyfood.com', role: 'user', status: 'active', joinDate: '2025-01-15' },
    { id: 2, name: 'นางสาวสมหญิง สุขใจ', email: 'demo@healthyfood.com', role: 'user', status: 'active', joinDate: '2025-01-20' },
    { id: 3, name: 'นายทดสอบ ระบบ', email: 'test@healthyfood.com', role: 'user', status: 'inactive', joinDate: '2025-01-25' }
  ])

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('add') // 'add' or 'edit'
  const [editUser, setEditUser] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', status: 'active' })

  // Add user
  const handleAddUser = () => {
    setModalType('add')
    setForm({ name: '', email: '', status: 'active' })
    setShowModal(true)
  }

  // Edit user
  const handleEditUser = (user) => {
    setModalType('edit')
    setEditUser(user)
    setForm({ name: user.name, email: user.email, status: user.status })
    setShowModal(true)
  }

  // Delete user
  const handleDeleteUser = (id) => {
    if (window.confirm('คุณต้องการลบสมาชิกนี้ใช่หรือไม่?')) {
      setUsers(users.filter(u => u.id !== id))
    }
  }

  // Submit modal
  const handleSubmit = (e) => {
    e.preventDefault()
    if (modalType === 'add') {
      const newUser = {
        id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: form.name,
        email: form.email,
        status: form.status,
        role: 'user',
        joinDate: new Date().toISOString().slice(0, 10)
      }
      setUsers([...users, newUser])
    } else if (modalType === 'edit' && editUser) {
      setUsers(users.map(u => u.id === editUser.id ? { ...u, ...form } : u))
    }
    setShowModal(false)
    setEditUser(null)
  }

  const [statistics] = useState({
    totalUsers: 156,
    activeUsers: 142,
    totalCalculations: 1234,
    dailyActiveUsers: 45
  })

  const sections = [
    { id: 'dashboard', name: 'แดชบอร์ด', icon: '📊' },
    { id: 'users', name: 'จัดการสมาชิก', icon: '👥' }
  ]

  const DashboardContent = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-green-900 mb-2">แดชบอร์ดผู้ดูแลระบบ</h2>

      {/* Statistic Cards */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-4xl font-extrabold tracking-tight drop-shadow">{statistics.totalUsers}</div>
              <div className="text-base font-medium text-blue-100 mt-1">สมาชิกทั้งหมด</div>
            </div>
            <div className="text-4xl opacity-80">👥</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-4xl font-extrabold tracking-tight drop-shadow">{statistics.activeUsers}</div>
              <div className="text-base font-medium text-green-100 mt-1">สมาชิกที่ใช้งาน</div>
            </div>
            <div className="text-4xl opacity-80">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-4xl font-extrabold tracking-tight drop-shadow">{statistics.totalCalculations}</div>
              <div className="text-base font-medium text-purple-100 mt-1">การคำนวณทั้งหมด</div>
            </div>
            <div className="text-4xl opacity-80">🧮</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between min-h-[120px]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-4xl font-extrabold tracking-tight drop-shadow">{statistics.dailyActiveUsers}</div>
              <div className="text-base font-medium text-orange-100 mt-1">ใช้งานวันนี้</div>
            </div>
            <div className="text-4xl opacity-80">📅</div>
          </div>
        </div>
      </div>

      {/* Weekly Usage & Recent Activity */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">📈 <span>การใช้งานรายสัปดาห์</span></h3>
          <div className="space-y-4">
            {['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'].map((day, index) => (
              <div key={day} className="flex items-center">
                <div className="w-20 text-base font-semibold text-green-900">{day}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4 ml-3">
                  <div 
                    className="bg-green-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">🚀 <span>กิจกรรมล่าสุด</span></h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-green-50 rounded-xl">
              <div className="text-green-600 mr-3 text-2xl">👤</div>
              <div className="flex-1">
                <div className="text-base font-semibold text-green-900">สมาชิกใหม่เข้าร่วม</div>
                <div className="text-xs text-gray-500 mt-1">5 นาทีที่แล้ว</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-blue-50 rounded-xl">
              <div className="text-blue-600 mr-3 text-2xl">🧮</div>
              <div className="flex-1">
                <div className="text-base font-semibold text-blue-900">การคำนวณใหม่ 12 ครั้ง</div>
                <div className="text-xs text-gray-500 mt-1">15 นาทีที่แล้ว</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-purple-50 rounded-xl">
              <div className="text-purple-600 mr-3 text-2xl">📊</div>
              <div className="flex-1">
                <div className="text-base font-semibold text-purple-900">รายงานรายวันสร้างแล้ว</div>
                <div className="text-xs text-gray-500 mt-1">1 ชั่วโมงที่แล้ว</div>
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
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          onClick={handleAddUser}
        >
          + เพิ่มสมาชิกใหม่
        </button>
      </div>

  <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 rounded-2xl shadow-xl overflow-hidden border border-green-100 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase">ชื่อ</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase">อีเมล</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase">สถานะ</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase">วันที่เข้าร่วม</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-green-900 uppercase">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3 text-purple-600">👤</div>
                      <div className="text-base font-semibold text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-blue-700 font-medium">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-sm font-bold rounded-full shadow-sm ${
                      user.status === 'active' 
                        ? 'bg-green-200 text-green-900' 
                        : 'bg-red-200 text-red-900'
                    }`}>
                      {user.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-600 font-medium">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base">
                    <div className="flex gap-4">
                      <button
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-1 rounded-lg font-semibold shadow hover:from-blue-500 hover:to-blue-700 transition"
                        onClick={() => handleEditUser(user)}
                      >แก้ไข</button>
                      <button
                        className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-1 rounded-lg font-semibold shadow hover:from-red-500 hover:to-red-700 transition"
                        onClick={() => handleDeleteUser(user.id)}
                      >ลบ</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for add/edit user */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-green-900">
              {modalType === 'add' ? 'เพิ่มสมาชิกใหม่' : 'แก้ไขข้อมูลสมาชิก'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-green-900"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-green-900"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-green-900"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">ใช้งาน</option>
                  <option value="inactive">ไม่ใช้งาน</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => { setShowModal(false); setEditUser(null); }}
                >ยกเลิก</button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
                >{modalType === 'add' ? 'เพิ่ม' : 'บันทึก'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
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
            <nav className="flex flex-col gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 shadow-sm focus:outline-green-500
                    ${activeSection === section.id
                      ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700 font-semibold border border-green-300'
                      : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200'
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
