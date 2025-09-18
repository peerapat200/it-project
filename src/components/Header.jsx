import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import UserProfile from './UserProfile'

const Header = ({ activeTab, setActiveTab }) => {
  const { user, isAuthenticated, isAdmin } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)

  const tabs = [
    { 
      id: 'home', 
      name: 'หน้าหลัก', 
      icon: 'หน้าหลัก', 
      requireAuth: false,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'dashboard', 
      name: 'แดชบอร์ด', 
      icon: 'แดชบอร์ด', 
      requireAuth: false,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'food-diary', 
      name: 'บันทึกอาหารรายวัน', 
      icon: 'บันทึกอาหาร', 
      requireAuth: false,
      color: 'from-purple-500 to-violet-500'
    },
    { 
      id: 'recommended-plan', 
      name: 'แผนอาหารที่แนะนำ', 
      icon: 'แผนอาหาร', 
      requireAuth: false,
      color: 'from-orange-500 to-amber-500'
    },
    { 
      id: 'nutrition-summary', 
      name: 'สรุปโภชนาการ', 
      icon: 'สรุปโภชนาการ', 
      requireAuth: false,
      color: 'from-pink-500 to-rose-500'
    },
    ...(isAdmin ? [{ 
      id: 'admin', 
      name: 'จัดการระบบ', 
      icon: 'จัดการระบบ', 
      requireAuth: true,
      color: 'from-red-500 to-pink-500'
    }] : [])
  ]

  const switchToRegister = () => {
    setShowLoginModal(false)
    setShowRegisterModal(true)
  }

  const switchToLogin = () => {
    setShowRegisterModal(false)
    setShowLoginModal(true)
  }

  const handleTabClick = (tab) => {
    if (tab.requireAuth && !isAuthenticated) {
      setShowLoginModal(true)
      return
    }
    setActiveTab(tab.id)
  }

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-100 w-full">
        <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <span className="text-2xl sm:text-4xl">🍃</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  HealthyFood Hub
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  โภชนาการที่ดีคือกุญแจสู่ชีวิตที่แข็งแรงโดยนักโภชนาการประจำระบบ
                </p>
              </div>
            </div>
            
            {/* User Auth Section */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="hidden lg:block text-right">
                    <div className="text-sm font-medium text-gray-800">
                      สวัสดี, {user?.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {isAdmin ? '👑 ผู้ดูแลระบบ' : '👤 สมาชิก'}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="relative group"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg hover:shadow-lg transform hover:scale-105 transition-all">
                      {user?.avatar || '👤'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center gap-6 ml-4">
                    <button
                      onClick={() => setShowRegisterModal(true)}
                      className="group relative px-4 py-2 bg-gradient-to-r from-green-400 via-green-300 to-green-500 text-white font-bold flex items-center rounded-xl border-2 border-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 mr-10"
                      style={{ minWidth: '120px' }}
                    >
                      <span className="hidden sm:inline text-sm sm:text-base">สมัครสมาชิก</span>
                    </button>
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="group relative px-4 py-2 bg-gradient-to-r from-green-200 via-green-100 to-green-300 text-green-900 font-bold flex items-center rounded-xl border-2 border-green-300 hover:bg-green-300 hover:text-green-900 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 ml-2"
                      style={{ minWidth: '120px', marginLeft: '32px' }}
                    >
                      <span className="hidden sm:inline text-sm sm:text-base">เข้าสู่ระบบ</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {isAuthenticated && (
            <nav className="border-t border-green-100 w-full bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex space-x-10 sm:space-x-12 lg:space-x-16 overflow-x-auto scrollbar-hide py-8 sm:py-10 lg:py-12 w-full px-6 sm:px-8 lg:px-12">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id
                  const isDisabled = tab.requireAuth && !isAuthenticated
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabClick(tab)}
                      disabled={isDisabled && tab.id !== 'login'}
                      className={`group relative flex items-center space-x-4 sm:space-x-5 lg:space-x-6 py-5 sm:py-6 lg:py-7 px-8 sm:px-10 lg:px-12 rounded-3xl border-3 transition-all duration-300 whitespace-nowrap min-w-fit text-base sm:text-lg lg:text-xl font-bold shadow-xl hover:shadow-2xl ${
                        isActive
                          ? 'border-white text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-emerald-400 transform scale-110 shadow-2xl'
                          : isDisabled
                          ? 'border-gray-300 text-gray-500 bg-gray-100 cursor-not-allowed opacity-60'
                          : 'border-emerald-300 text-emerald-800 bg-gradient-to-r from-white to-emerald-50 hover:border-emerald-400 hover:text-emerald-900 hover:from-emerald-50 hover:to-emerald-100 hover:shadow-emerald-200 hover:transform hover:scale-105'
                      }`}
                    >
                      <span className={`text-base sm:text-lg transition-transform duration-300 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'}`}>
                        {tab.icon}
                      </span>
                      <span className="hidden xs:block font-semibold">
                        {tab.name}
                      </span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg animate-pulse"></div>
                      )}
                      
                      {/* Admin badge */}
                      {tab.id === 'admin' && (
                        <span className="ml-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs sm:text-sm rounded-full font-bold shadow-lg animate-pulse">
                          ADMIN
                        </span>
                      )}
                      
                      {/* Lock indicator */}
                      {tab.requireAuth && !isAuthenticated && (
                        <span className="ml-3 px-3 py-1.5 bg-red-100 text-red-600 text-xs rounded-full border border-red-200 shadow-sm">
                          🔒
                        </span>
                      )}
                      
                      {/* Hover effect overlay */}
                      {!isActive && !isDisabled && (
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-green-200 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                      )}
                    </button>
                  )
                })}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToRegister={switchToRegister}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        switchToLogin={switchToLogin}
      />
      <UserProfile
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  )
}

export default Header
