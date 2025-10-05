import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const RecommendedPlan = () => {
  const { user } = useAuth()
  const [selectedGoal, setSelectedGoal] = useState('maintain')
  const [activityLevel, setActivityLevel] = useState('moderate')
  const [dietaryPreference, setDietaryPreference] = useState('balanced')
  const [recommendedPlan, setRecommendedPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const goals = {
    lose: { name: 'ลดน้ำหนัก', icon: '⬇️', color: 'text-red-600', bg: 'bg-red-100' },
    maintain: { name: 'รักษาน้ำหนัก', icon: '⚖️', color: 'text-green-600', bg: 'bg-green-100' },
    gain: { name: 'เพิ่มน้ำหนัก', icon: '⬆️', color: 'text-blue-600', bg: 'bg-blue-100' }
  }

  const activities = {
    sedentary: { name: 'นั่งทำงาน / ไม่ออกกำลังกาย', multiplier: 1.2 },
    light: { name: 'ออกกำลังกายเบา ๆ (1-3 วัน/สัปดาห์)', multiplier: 1.375 },
    moderate: { name: 'ออกกำลังกายปานกลาง (3-5 วัน/สัปดาห์)', multiplier: 1.55 },
    active: { name: 'ออกกำลังกายหนัก (6-7 วัน/สัปดาห์)', multiplier: 1.725 },
    very_active: { name: 'ออกกำลังกายหนักมาก / งานใช้แรงงาน', multiplier: 1.9 }
  }

  const dietTypes = {
    balanced: { name: 'สมดุล', description: 'คาร์บ 50% โปรตีน 20% ไขมัน 30%' },
    low_carb: { name: 'คาร์บน้อย', description: 'คาร์บ 30% โปรตีน 35% ไขมัน 35%' },
    high_protein: { name: 'โปรตีนสูง', description: 'คาร์บ 40% โปรตีน 35% ไขมัน 25%' },
    mediterranean: { name: 'เมดิเตอร์เรเนียน', description: 'เน้นผัก ผลไม้ ปลา น้ำมันมะกอก' }
  }

  const sampleMeals = {
    lose: {
      breakfast: [
        { name: 'ข้าวโอ๊ตผลไม้', calories: 320, items: ['ข้าวโอ๊ต 50g', 'กล้วย 1/2 ลูก', 'บลูเบอร์รี่ 50g', 'อัลมอนด์ 10g'] },
        { name: 'ไข่กับขนมปังโฮลวีท', calories: 280, items: ['ไข่ต้ม 1 ฟอง', 'ขนมปังโฮลวีท 1 แผ่น', 'อะโวคาโด 30g'] }
      ],
      lunch: [
        { name: 'สลัดไก่ย่าง', calories: 420, items: ['อกไก่ย่าง 120g', 'ผักสลัดผสม 100g', 'มะเขือเทศ 50g', 'น้ำสลัด 1 ช้อนโต๊ะ'] },
        { name: 'ข้าวกล้องปลาแซลมอน', calories: 450, items: ['ข้าวกล้อง 80g', 'ปลาแซลมอนย่าง 100g', 'ผักโขมลวก 100g'] }
      ],
      dinner: [
        { name: 'ซุปผักเต้าหู้', calories: 280, items: ['เต้าหู้แข็ง 80g', 'ผักคะน้า 100g', 'น้ำซุปใส 1 ถ้วย'] },
        { name: 'ปลาย่างกับผัก', calories: 320, items: ['ปลากะพง 100g', 'ผักรวมผัด 150g', 'น้ำมันมะกอก 1 ช้อนชา'] }
      ]
    },
    maintain: {
      breakfast: [
        { name: 'ข้าวโอ๊ตกล้วยถั่วอัลมอนด์', calories: 420, items: ['ข้าวโอ๊ต 60g', 'กล้วย 1 ลูก', 'อัลมอนด์ 20g', 'นมอัลมอนด์ 200ml'] },
        { name: 'ไข่เจียวขนมปัง', calories: 380, items: ['ไข่ไก่ 2 ฟอง', 'ขนมปังโฮลวีท 2 แผ่น', 'อะโวคาโด 50g'] }
      ],
      lunch: [
        { name: 'ข้าวกล้องไก่ผัดผัก', calories: 520, items: ['ข้าวกล้อง 100g', 'อกไก่ 120g', 'ผักรวม 120g', 'น้ำมันมะกอก 1 ช้อนโต๊ะ'] },
        { name: 'ก๋วยเตี๋ยวปลา', calories: 480, items: ['เส้นข้าวโฮลวีท 80g', 'ปลาสับ 100g', 'ผักกาดขาว 100g', 'น้ำซุป 1 ถ้วย'] }
      ],
      dinner: [
        { name: 'ปลาแซลมอนย่างกับข้าว', calories: 480, items: ['ปลาแซลมอน 120g', 'ข้าวกล้อง 80g', 'ผักสตีม 150g'] },
        { name: 'เต้าหู้ผัดผัก', calories: 420, items: ['เต้าหู้ 100g', 'ผักคะน้า 150g', 'ข้าวกล้อง 60g'] }
      ]
    },
    gain: {
      breakfast: [
        { name: 'สมูทตี้โปรตีน', calories: 550, items: ['กล้วย 1 ลูก', 'เวย์โปรตีน 30g', 'ข้าวโอ๊ต 60g', 'นมสด 300ml', 'น้ำผึ้ง 1 ช้อนโต๊ะ'] },
        { name: 'แพนเค้กโปรตีน', calories: 520, items: ['แป้งโอ๊ต 80g', 'ไข่ 2 ฟอง', 'กล้วย 1 ลูก', 'น้ำผึ้ง 2 ช้อนโต๊ะ'] }
      ],
      lunch: [
        { name: 'ข้าวหน้าเนื้อ', calories: 650, items: ['ข้าวกล้อง 120g', 'เนื้อย่าง 150g', 'ผักโขม 100g', 'น้ำมันมะกอก 1 ช้อนโต๊ะ'] },
        { name: 'ข้าวผัดไก่', calories: 620, items: ['ข้าวกล้อง 120g', 'ไก่สับ 130g', 'ไข่ 1 ฟอง', 'ผักกาดขาว 80g'] }
      ],
      dinner: [
        { name: 'พาสต้าไก่', calories: 580, items: ['พาสต้าโฮลวีท 100g', 'อกไก่ 130g', 'ผักโขม 100g', 'น้ำมันมะกอก 1 ช้อนโต๊ะ'] },
        { name: 'ข้าวปลาแซลมอน', calories: 620, items: ['ข้าวกล้อง 100g', 'ปลาแซลมอน 150g', 'ผักสตีม 120g', 'อะโวคาโด 50g'] }
      ]
    }
  }

  const generatePlan = () => {
    setIsLoading(true)
    
    // จำลองการสร้างแผน
    setTimeout(() => {
      const baseBMR = 1500 // จำลอง BMR
      const activityMultiplier = activities[activityLevel].multiplier
      const totalCalories = Math.round(baseBMR * activityMultiplier)
      
      let targetCalories
      switch (selectedGoal) {
        case 'lose':
          targetCalories = totalCalories - 500
          break
        case 'gain':
          targetCalories = totalCalories + 500
          break
        default:
          targetCalories = totalCalories
      }

      const macros = dietTypes[dietaryPreference]
      const plan = {
        goal: selectedGoal,
        targetCalories,
        macros,
        meals: sampleMeals[selectedGoal],
        tips: [
          'ดื่มน้ำ 8-10 แก้วต่อวัน',
          'รับประทานอาหารตรงเวลา',
          'เพิ่มผักและผลไม้ในทุกมื้อ',
          'หลีกเลี่ยงอาหารแปรรูป',
          'ออกกำลังกายสม่ำเสมอ'
        ]
      }
      
      setRecommendedPlan(plan)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full flex flex-col items-center justify-start pb-24">
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-y-6 sm:gap-y-8">
        {/* Header */}
        <div className="text-center mt-6 mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6 shadow-xl">
            <span className="text-3xl text-white">🍽️</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            แผนอาหารที่แนะนำ
          </h1>
          <p className="text-base sm:text-lg text-blue-700 max-w-2xl mx-auto leading-relaxed font-medium">
            รับแผนอาหารส่วนตัวที่เหมาะสมกับเป้าหมายและไลฟ์สไตล์ของคุณ
          </p>
        </div>

        {/* Settings */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 animate-slide-up max-w-5xl mx-auto">
          <div className="flex items-center mb-6 sm:mb-8">
            <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg mr-4">
              <span className="text-2xl text-white">⚙️</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-800">
              ตั้งค่าแผนอาหารของคุณ
            </h2>
          </div>
        
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Goal Selection */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg">
              <label className="flex items-center text-base font-bold text-blue-700 mb-4">
                <span className="mr-3 text-xl">🎯</span>
                เป้าหมายของคุณ
              </label>
              <div className="flex flex-col gap-3">
                {Object.entries(goals).map(([key, goal]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedGoal(key)}
                    className={`w-full p-3 rounded-2xl border-2 text-left transition-all shadow-md hover:shadow-lg transform hover:scale-102 focus:outline-none focus:ring-4 focus:ring-green-300
                      ${selectedGoal === key
                        ? key === 'lose'
                          ? 'border-red-400 bg-gradient-to-r from-red-100 to-red-200 text-red-700 shadow-lg scale-105'
                        : key === 'maintain'
                          ? 'border-green-400 bg-gradient-to-r from-green-100 to-green-200 text-green-700 shadow-lg scale-105'
                        : key === 'gain'
                          ? 'border-blue-400 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow-lg scale-105'
                        : ''
                      : key === 'lose'
                          ? 'border-gray-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100'
                        : key === 'maintain'
                          ? 'border-gray-200 bg-green-50 text-green-700 hover:border-green-300 hover:bg-green-100'
                        : key === 'gain'
                          ? 'border-gray-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/50 rounded-xl shadow-sm">
                        <span className="text-xl">{goal.icon}</span>
                      </div>
                      <span className="font-bold text-base">{goal.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Level */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-lg">
              <label className="flex items-center text-base font-bold text-green-700 mb-4">
                <span className="mr-3 text-xl">🏃‍♂️</span>
                ระดับการออกกำลังกาย
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full border-2 border-green-300 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-green-300 focus:border-green-500 bg-white text-green-700 text-base shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer font-medium"
              >
              {Object.entries(activities).map(([key, activity]) => (
                <option key={key} value={key}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>

            {/* Diet Preference */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 shadow-lg">
              <label className="flex items-center text-base font-bold text-purple-700 mb-4">
                <span className="mr-3 text-xl">🥗</span>
                รูปแบบการกิน
              </label>
              <select
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                className="w-full border-2 border-purple-300 rounded-2xl px-4 py-3 focus:ring-4 focus:ring-purple-300 focus:border-purple-500 bg-white text-purple-700 text-base shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer font-medium"
              >
              {Object.entries(dietTypes).map(([key, diet]) => (
                <option key={key} value={key}>
                  {diet.name} - {diet.description}
                </option>
              ))}
            </select>
          </div>
        </div>

          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <div className="flex justify-center">
              <button
                onClick={generatePlan}
                disabled={isLoading}
                className="px-16 py-5 bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-3xl hover:from-green-500 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-110 disabled:transform-none animate-pulse-slow"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-3 border-white"></div>
                    <span className="tracking-wide">กำลังสร้างแผน...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🍽️</span>
                    <span className="tracking-wide">สร้างแผนอาหาร</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Recommended Plan */}
        {recommendedPlan && (
          <div className="space-y-8 animate-fade-in">
            {/* Plan Summary */}
            <div className="bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-3xl p-8 shadow-2xl border border-green-300 hover:shadow-3xl transition-all duration-500">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className="p-4 bg-white/20 rounded-2xl mr-5 backdrop-blur-sm">
                      <span className="text-4xl">{goals[recommendedPlan.goal].icon}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-shadow-sm">
                      แผนอาหารของคุณ
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white/20 rounded-2xl p-5 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300">
                      <p className="text-green-100 text-sm mb-2 font-medium">เป้าหมาย</p>
                      <p className="text-2xl font-bold text-shadow-sm">{goals[recommendedPlan.goal].name}</p>
                    </div>
                    <div className="bg-white/20 rounded-2xl p-5 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300">
                      <p className="text-green-100 text-sm mb-2 font-medium">แคลอรี่ต่อวัน</p>
                      <p className="text-2xl font-bold text-shadow-sm">{recommendedPlan.targetCalories} แคลอรี่</p>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block text-8xl opacity-20 ml-6 animate-pulse">🎯</div>
              </div>
            </div>

            {/* Daily Meals */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl shadow-lg mr-4">
                  <span className="text-2xl text-white">🍽️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  ตัวอย่างมื้ออาหาร
                </h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Breakfast */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h4 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
                    <div className="p-2 bg-yellow-200 rounded-xl mr-3">
                      <span className="text-2xl">🌅</span>
                    </div>
                    อาหารเช้า
                  </h4>
                  <div className="space-y-4">
                    {recommendedPlan.meals.breakfast.map((meal, index) => (
                      <div key={index} className="bg-white p-4 rounded-2xl shadow-md border border-yellow-200 hover:shadow-lg transition-all duration-300">
                        <div className="font-bold text-gray-800 mb-2 text-lg">
                          {meal.name}
                        </div>
                        <div className="text-base font-bold text-yellow-600 mb-3 bg-yellow-100 px-3 py-1 rounded-full inline-block">
                          🔥 {meal.calories} แคลอรี่
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {meal.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-yellow-500 mr-2 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lunch */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h4 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
                    <div className="p-2 bg-orange-200 rounded-xl mr-3">
                      <span className="text-2xl">☀️</span>
                    </div>
                    อาหารกลางวัน
                  </h4>
                  <div className="space-y-4">
                    {recommendedPlan.meals.lunch.map((meal, index) => (
                      <div key={index} className="bg-white p-4 rounded-2xl shadow-md border border-orange-200 hover:shadow-lg transition-all duration-300">
                        <div className="font-bold text-gray-800 mb-2 text-lg">
                          {meal.name}
                        </div>
                        <div className="text-base font-bold text-orange-600 mb-3 bg-orange-100 px-3 py-1 rounded-full inline-block">
                          🔥 {meal.calories} แคลอรี่
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {meal.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-orange-500 mr-2 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dinner */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <h4 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
                    <div className="p-2 bg-purple-200 rounded-xl mr-3">
                      <span className="text-2xl">🌙</span>
                    </div>
                    อาหารเย็น
                  </h4>
                  <div className="space-y-4">
                    {recommendedPlan.meals.dinner.map((meal, index) => (
                      <div key={index} className="bg-white p-4 rounded-2xl shadow-md border border-purple-200 hover:shadow-lg transition-all duration-300">
                        <div className="font-bold text-gray-800 mb-2 text-lg">
                          {meal.name}
                        </div>
                        <div className="text-base font-bold text-purple-600 mb-3 bg-purple-100 px-3 py-1 rounded-full inline-block">
                          🔥 {meal.calories} แคลอรี่
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {meal.items.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-purple-500 mr-2 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg mr-4">
                  <span className="text-2xl text-white">💡</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  เคล็ดลับสำหรับความสำเร็จ
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedPlan.tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-4 p-5 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-md border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className="p-2 bg-green-500 rounded-full flex-shrink-0">
                      <span className="text-white font-bold text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 font-medium leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecommendedPlan
