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
    <div className="w-full max-w-none mx-auto p-2 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          แผนอาหารที่แนะนำ
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          รับแผนอาหารส่วนตัวที่เหมาะสมกับเป้าหมายและไลฟ์สไตล์ของคุณ
        </p>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">
          ตั้งค่าแผนอาหารของคุณ
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Goal Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              เป้าหมายของคุณ
            </label>
            <div className="flex flex-col gap-3">
              {Object.entries(goals).map(([key, goal]) => (
                <button
                  key={key}
                  onClick={() => setSelectedGoal(key)}
                  className={`w-full p-3 rounded-xl border-2 text-left transition-all shadow-sm focus:outline-green-500
                    ${selectedGoal === key
                      ? key === 'lose'
                        ? 'border-red-400 bg-gradient-to-r from-red-100 to-red-200 text-red-700'
                      : key === 'maintain'
                        ? 'border-green-400 bg-gradient-to-r from-green-100 to-green-200 text-green-700'
                      : key === 'gain'
                        ? 'border-blue-400 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700'
                      : ''
                    : key === 'lose'
                        ? 'border-gray-200 bg-red-50 text-red-700 hover:border-red-300'
                      : key === 'maintain'
                        ? 'border-gray-200 bg-green-50 text-green-700 hover:border-green-300'
                      : key === 'gain'
                        ? 'border-gray-200 bg-blue-50 text-blue-700 hover:border-blue-300'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{goal.icon}</span>
                    <span className="font-medium">{goal.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ระดับการออกกำลังกาย
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-green-900 placeholder:text-green-700"
            >
              {Object.entries(activities).map(([key, activity]) => (
                <option key={key} value={key}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>

          {/* Diet Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              รูปแบบการกิน
            </label>
            <select
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-green-900 placeholder:text-green-700"
            >
              {Object.entries(dietTypes).map(([key, diet]) => (
                <option key={key} value={key}>
                  {diet.name} - {diet.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={generatePlan}
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl hover:from-green-500 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>กำลังสร้างแผน...</span>
              </div>
            ) : (
              'สร้างแผนอาหาร'
            )}
          </button>
        </div>
      </div>

      {/* Recommended Plan */}
      {recommendedPlan && (
        <div className="space-y-6">
          {/* Plan Summary */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  แผนอาหารของคุณ {goals[recommendedPlan.goal].icon}
                </h3>
                <p className="text-green-100">
                  เป้าหมาย: {goals[recommendedPlan.goal].name}
                </p>
                <p className="text-green-100">
                  แคลอรี่ต่อวัน: {recommendedPlan.targetCalories} แคลอรี่
                </p>
              </div>
              <div className="text-6xl opacity-50">🎯</div>
            </div>
          </div>

          {/* Daily Meals */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              ตัวอย่างมื้ออาหาร
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Breakfast */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  🌅 อาหารเช้า
                </h4>
                <div className="space-y-3">
                  {recommendedPlan.meals.breakfast.map((meal, index) => (
                    <div key={index} className="bg-yellow-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-800 mb-1">
                        {meal.name}
                      </div>
                      <div className="text-sm text-yellow-600 mb-2">
                        {meal.calories} แคลอรี่
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {meal.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lunch */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  ☀️ อาหารกลางวัน
                </h4>
                <div className="space-y-3">
                  {recommendedPlan.meals.lunch.map((meal, index) => (
                    <div key={index} className="bg-orange-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-800 mb-1">
                        {meal.name}
                      </div>
                      <div className="text-sm text-orange-600 mb-2">
                        {meal.calories} แคลอรี่
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {meal.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dinner */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  🌙 อาหารเย็น
                </h4>
                <div className="space-y-3">
                  {recommendedPlan.meals.dinner.map((meal, index) => (
                    <div key={index} className="bg-purple-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-800 mb-1">
                        {meal.name}
                      </div>
                      <div className="text-sm text-purple-600 mb-2">
                        {meal.calories} แคลอรี่
                      </div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {meal.items.map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              💡 เคล็ดลับสำหรับความสำเร็จ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedPlan.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecommendedPlan
