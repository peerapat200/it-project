import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <span className="text-3xl">🍃</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  HealthyFood Hub
                </h3>
                <p className="text-gray-400 text-sm">Your Health, Our Priority</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              แพลตฟอร์มที่รวบรวมข้อมูลอาหารเพื่อสุขภาพ 
              และเครื่องมือคำนวณความต้องการสารอาหาร
              สำหรับทุกเพศทุกวัย พร้อมระบบการจัดการที่ทันสมัย
            </p>
            <div className="flex space-x-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105">
                📱 ดาวน์โหลดแอป
              </button>
              <button className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg transition-all">
                📧 ติดต่อเรา
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-green-400">🚀 ฟีเจอร์หลัก</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                🔑 เข้าสู่ระบบ
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                📊 แดชบอร์ด
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                � บันทึกอาหารรายวัน
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                🍽️ แผนอาหารที่แนะนำ
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                � สรุปโภชนาการ
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-green-400">📋 ข้อมูลสำคัญ</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                ⚖️ การคำนวณ BMI และ BMR
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                💧 ความต้องการน้ำรายวัน
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                🎯 เป้าหมายสุขภาพส่วนบุคคล
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                📊 รายงานสุขภาพ
              </li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">
                🔒 ความปลอดภัยข้อมูล
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div>
              <p className="text-gray-400 text-sm">
                &copy; 2025 HealthyFood Hub. สร้างขึ้นเพื่อส่งเสริมการกินอาหารเพื่อสุขภาพ
              </p>
              <p className="text-gray-500 text-xs mt-1">
                ⚠️ ข้อมูลในเว็บไซต์นี้เป็นเพียงคำแนะนำทั่วไป ควรปรึกษาแพทย์หรือนักโภชนาการสำหรับคำแนะนำเฉพาะบุคคล
              </p>
            </div>
            
            <div className="flex justify-start md:justify-end space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>เซิร์ฟเวอร์ออนไลน์</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>👥</span>
                <span>ผู้ใช้งาน: 1,234+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
        
        {/* Floating shapes */}
        <div className="absolute top-10 right-10 opacity-10">
          <div className="w-20 h-20 bg-green-400 rounded-full float-animation"></div>
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <div className="w-16 h-16 bg-green-300 rounded-full float-animation" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
