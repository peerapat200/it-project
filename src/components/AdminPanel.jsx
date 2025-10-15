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
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg mr-4">
          <span className="text-2xl text-white">📊</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">แดชบอร์ดผู้ดูแลระบบ</h2>
      </div>

  {/* Statistic Cards - visually grouped and spaced */}
  <div className="flex flex-col md:flex-row md:justify-between gap-12 mt-8 mb-16">
        {/* Left group */}
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-7 rounded-xl shadow-2xl border-2 border-blue-300 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold mb-2 drop-shadow-lg">{statistics.totalUsers}</div>
                <div className="text-base font-semibold text-blue-100">สมาชิกทั้งหมด</div>
              </div>
              <div className="p-4 bg-white/30 rounded-2xl backdrop-blur-sm">
                <span className="text-3xl">👥</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-7 rounded-xl shadow-2xl border-2 border-green-300 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold mb-2 drop-shadow-lg">{statistics.activeUsers}</div>
                <div className="text-base font-semibold text-green-100">สมาชิกที่ใช้งาน</div>
              </div>
              <div className="p-4 bg-white/30 rounded-2xl backdrop-blur-sm">
                <span className="text-3xl">✅</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right group */}
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-7 rounded-xl shadow-2xl border-2 border-purple-300 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold mb-2 drop-shadow-lg">{statistics.totalCalculations}</div>
                <div className="text-base font-semibold text-purple-100">การคำนวณทั้งหมด</div>
              </div>
              <div className="p-4 bg-white/30 rounded-2xl backdrop-blur-sm">
                <span className="text-3xl">🧮</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-7 rounded-xl shadow-2xl border-2 border-orange-300 hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold mb-2 drop-shadow-lg">{statistics.dailyActiveUsers}</div>
                <div className="text-base font-semibold text-orange-100">ใช้งานวันนี้</div>
              </div>
              <div className="p-4 bg-white/30 rounded-2xl backdrop-blur-sm">
                <span className="text-3xl">📅</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  {/* Weekly Usage & Recent Activity */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-5">
            <div className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-lg mr-3">
              <span className="text-xl text-white">📈</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">การใช้งานรายสัปดาห์</h3>
          </div>
          <div className="space-y-4">
            {['จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์', 'อาทิตย์'].map((day, index) => (
              <div key={day} className="flex items-center">
                <div className="w-20 text-sm font-bold text-gray-700">{day}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 ml-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-1000 shadow-sm"
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-5">
            <div className="p-2 bg-gradient-to-r from-green-400 to-green-600 rounded-xl shadow-lg mr-3">
              <span className="text-xl text-white">🚀</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800">กิจกรรมล่าสุด</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-green-200 hover:shadow-lg transition-all">
              <div className="p-2 bg-green-100 rounded-xl mr-3">
                <span className="text-green-600 text-lg">👤</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-800">สมาชิกใหม่เข้าร่วม</div>
                <div className="text-xs text-gray-500 mt-1">5 นาทีที่แล้ว</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-blue-200 hover:shadow-lg transition-all">
              <div className="p-2 bg-blue-100 rounded-xl mr-3">
                <span className="text-blue-600 text-lg">🧮</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-800">การคำนวณใหม่ 12 ครั้ง</div>
                <div className="text-xs text-gray-500 mt-1">15 นาทีที่แล้ว</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-purple-200 hover:shadow-lg transition-all">
              <div className="p-2 bg-purple-100 rounded-xl mr-3">
                <span className="text-purple-600 text-lg">📊</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-800">รายงานรายวันสร้างแล้ว</div>
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl shadow-lg mr-4">
            <span className="text-2xl text-white">👥</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">จัดการสมาชิก</h2>
        </div>
        <button
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          onClick={handleAddUser}
        >
          <span className="mr-2">+</span>
          เพิ่มสมาชิกใหม่
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-green-400 to-blue-500">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wide">ชื่อ</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wide">อีเมล</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wide">สถานะ</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wide">วันที่เข้าร่วม</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wide">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id} className={`${idx % 2 === 0 ? 'bg-white/90' : 'bg-blue-50/90'} hover:bg-blue-100/90 transition-all duration-200`}>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-xl mr-3">
                        <span className="text-purple-600 text-xl">👤</span>
                      </div>
                      <div className="text-base font-bold text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-base text-blue-700 font-medium">
                    {user.email}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-2xl shadow-lg ${
                      user.status === 'active' 
                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' 
                        : 'bg-gradient-to-r from-red-400 to-red-500 text-white'
                    }`}>
                      {user.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-base text-gray-600 font-medium">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-base">
                    <div className="flex gap-3">
                      <button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
                        onClick={() => handleEditUser(user)}
                      >แก้ไข</button>
                      <button
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105"
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg mr-4">
                <span className="text-2xl text-white">{modalType === 'add' ? '➕' : '✏️'}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {modalType === 'add' ? 'เพิ่มสมาชิกใหม่' : 'แก้ไขข้อมูลสมาชิก'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">ชื่อ</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-green-300 focus:border-green-500 bg-white text-gray-900 font-medium shadow-sm hover:shadow-md transition-all"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">อีเมล</label>
                <input
                  type="email"
                  className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-green-300 focus:border-green-500 bg-white text-gray-900 font-medium shadow-sm hover:shadow-md transition-all"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">สถานะ</label>
                <select
                  className="w-full border-2 border-gray-300 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-green-300 focus:border-green-500 bg-white text-gray-900 font-medium shadow-sm hover:shadow-md transition-all cursor-pointer"
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">ใช้งาน</option>
                  <option value="inactive">ไม่ใช้งาน</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  className="px-6 py-3 rounded-2xl bg-gray-200 text-gray-700 hover:bg-gray-300 font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  onClick={() => { setShowModal(false); setEditUser(null); }}
                >ยกเลิก</button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
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
      <div className="min-h-screen bg-gradient-to-br from-[#eaf0fa] via-[#f3eaff] to-[#fbeff5] w-full flex flex-col items-center justify-start pb-24">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - theme refined */}
            <div className="lg:col-span-1">
              <div className="bg-[#23304A] rounded-[2.5rem] shadow-2xl border border-[#4db54f] p-0 sticky top-4 flex flex-col gap-0 min-h-[600px] w-full max-w-xs mx-auto">
                {/* Sidebar Header */}
                <div className="flex flex-col items-center justify-center py-8 border-b border-[#1B2236]">
                  <div className="w-16 h-16 flex items-center justify-center bg-[#1B2236] rounded-full shadow-lg mb-2">
                    <span className="text-4xl text-white">👤</span>
                  </div>
                  <div className="text-white text-xl font-bold mt-2">{user?.name || 'Admin User'}</div>
                  <div className="text-blue-200 text-base font-medium mt-1">ผู้ดูแลระบบ</div>
                </div>
                {/* Sidebar Menu */}
                <nav className="flex flex-col gap-4 px-8 py-10">
                  <button
                    onClick={() => setActiveSection('dashboard')}
                    className={`flex items-center gap-3 w-full px-5 py-4 rounded-2xl text-left font-bold text-lg transition-all duration-200 border-2
                      ${activeSection === 'dashboard'
                        ? 'bg-[#3B82F6] text-white border-white shadow-lg'
                        : 'bg-[#1B2236] text-white hover:bg-[#3B82F6] hover:text-white border-transparent'}
                    `}
                  >
                    <span className="text-2xl">🏠</span>
                    <span>แดชบอร์ด</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('users')}
                    className={`flex items-center gap-3 w-full px-5 py-4 rounded-2xl text-left font-bold text-lg transition-all duration-200 border-2
                      ${activeSection === 'users'
                        ? 'bg-[#1B2236] text-white border-white shadow-lg'
                        : 'bg-[#1B2236] text-[#A78BFA] hover:bg-[#6D28D9] hover:text-white border-transparent'}
                    `}
                  >
                    <span className="text-2xl text-[#A78BFA]">👥</span>
                    <span>จัดการสมาชิก</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content - theme refined */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-[#e0e7ef] p-12 min-h-[600px] flex flex-col justify-center">
                {/* Header above main content */}
                <div className="text-center mt-8 mb-16 animate-fade-in">
                  <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 mb-4 drop-shadow-lg">
                    แผงควบคุมผู้ดูแลระบบ
                  </h1>
                  <p className="text-lg text-blue-600 max-w-2xl mx-auto leading-relaxed font-medium mt-4">
                    ยินดีต้อนรับ, {user?.name}
                  </p>
                </div>
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AdminPanel
