import React, { useState, useEffect } from 'react'

const NutritionSummary = () => {
  const [timeRange, setTimeRange] = useState('week')
  const [summaryData, setSummaryData] = useState(null)

  useEffect(() => {
    // จำลองข้อมูลสรุปโภชนาการ
    const mockData = {
      week: {
        period: 'สัปดาห์นี้',
        avgCalories: 1875,
        targetCalories: 2000,
        totalDays: 7,
        nutrition: {
          protein: { avg: 85, target: 80, unit: 'g' },
          carbs: { avg: 225, target: 250, unit: 'g' },
          fat: { avg: 65, target: 67, unit: 'g' },
          fiber: { avg: 25, target: 30, unit: 'g' },
          water: { avg: 7, target: 8, unit: 'แก้ว' }
        },
        dailyData: [
          { day: 'จันทร์', calories: 1950, protein: 90, carbs: 240, fat: 70, water: 8 },
          { day: 'อังคาร', calories: 1750, protein: 75, carbs: 210, fat: 55, water: 6 },
          { day: 'พุธ', calories: 2100, protein: 95, carbs: 250, fat: 75, water: 7 },
          { day: 'พฤหัสบดี', calories: 1850, protein: 80, carbs: 220, fat: 65, water: 8 },
          { day: 'ศุกร์', calories: 1950, protein: 88, carbs: 235, fat: 68, water: 7 },
          { day: 'เสาร์', calories: 1800, protein: 82, carbs: 215, fat: 60, water: 6 },
          { day: 'อาทิตย์', calories: 1850, protein: 85, carbs: 225, fat: 62, water: 7 }
        ],
        achievements: [
          { name: 'ดื่มน้ำครบ 5 วัน', icon: '💧', achieved: true },
          { name: 'โปรตีนเกินเป้า', icon: '🥩', achieved: true },
          { name: 'แคลอรี่ไม่เกิน', icon: '⚖️', achieved: false },
          { name: 'ไฟเบอร์ครบ', icon: '🥬', achieved: false }
        ]
      },
      month: {
        period: 'เดือนนี้',
        avgCalories: 1920,
        targetCalories: 2000,
        totalDays: 30,
        nutrition: {
          protein: { avg: 82, target: 80, unit: 'g' },
          carbs: { avg: 235, target: 250, unit: 'g' },
          fat: { avg: 68, target: 67, unit: 'g' },
          fiber: { avg: 22, target: 30, unit: 'g' },
          water: { avg: 6.8, target: 8, unit: 'แก้ว' }
        },
        weeklyData: [
          { week: 'สัปดาห์ 1', calories: 1890, protein: 85, carbs: 230, fat: 65 },
          { week: 'สัปดาห์ 2', calories: 1980, protein: 88, carbs: 245, fat: 72 },
          { week: 'สัปดาห์ 3', calories: 1850, protein: 78, carbs: 225, fat: 62 },
          { week: 'สัปดาห์ 4', calories: 1960, protein: 87, carbs: 240, fat: 71 }
        ],
        achievements: [
          { name: 'ลดน้ำหนัก 1.5 กก.', icon: '📉', achieved: true },
          { name: 'BMI ดีขึ้น', icon: '📊', achieved: true },
          { name: 'โปรตีนสม่ำเสมอ', icon: '🎯', achieved: true },
          { name: 'ออกกำลังกาย 20 วัน', icon: '💪', achieved: true }
        ]
      }
    }

    setSummaryData(mockData[timeRange])
  }, [timeRange])

  const getScoreColor = (current, target) => {
    const percentage = (current / target) * 100
    if (percentage >= 90 && percentage <= 110) return 'text-green-600'
    if (percentage >= 80 && percentage <= 120) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressWidth = (current, target) => {
    return Math.min((current / target) * 100, 100)
  }

  if (!summaryData) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full flex flex-col items-center justify-start pb-24">
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-y-6 sm:gap-y-8">
        {/* Header */}
        <div className="text-center mt-6 mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6 shadow-xl">
            <span className="text-3xl text-white">📊</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            สรุปโภชนาการ
          </h1>
          <p className="text-base sm:text-lg text-blue-700 max-w-2xl mx-auto leading-relaxed font-medium">
            วิเคราะห์และติดตามความคืบหน้าของโภชนาการในแต่ละช่วงเวลา
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg mr-4">
                <span className="text-2xl text-white">📅</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-blue-800">
                ช่วงเวลาที่ต้องการดู
              </h2>
            </div>
            <div className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-1 shadow-md">
              <button
                onClick={() => setTimeRange('week')}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl transition-all font-medium ${
                  timeRange === 'week'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                สัปดาห์
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl transition-all font-medium ${
                  timeRange === 'month'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                เดือน
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-3xl p-8 shadow-2xl border border-green-300 hover:shadow-3xl transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30">
              <div className="text-4xl font-bold mb-2">
                {summaryData.avgCalories}
              </div>
              <div className="text-green-100 font-medium">แคลอรี่เฉลี่ย/วัน</div>
              <div className="text-sm text-green-200 mt-1">
                เป้าหมาย: {summaryData.targetCalories}
              </div>
            </div>
            <div className="text-center bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30">
              <div className="text-4xl font-bold mb-2">
                {summaryData.totalDays}
              </div>
              <div className="text-green-100 font-medium">วันที่บันทึก</div>
              <div className="text-sm text-green-200 mt-1">
                {summaryData.period}
              </div>
            </div>
            <div className="text-center bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30">
              <div className="text-4xl font-bold mb-2">
                {Math.round((summaryData.avgCalories / summaryData.targetCalories) * 100)}%
              </div>
              <div className="text-green-100 font-medium">ความสำเร็จ</div>
              <div className="text-sm text-green-200 mt-1">
                ของเป้าหมาย
              </div>
            </div>
          </div>
        </div>

        {/* Nutrition Breakdown */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl shadow-lg mr-4">
              <span className="text-2xl text-white">🍽️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              สรุปโภชนาการเฉลี่ย
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(summaryData.nutrition).map(([key, nutrient]) => {
              const icons = {
                protein: '🥩',
                carbs: '🍞',
                fat: '🥑',
                fiber: '🥬',
                water: '💧'
              }
              
              const names = {
                protein: 'โปรตีน',
                carbs: 'คาร์โบไhydrate',
                fat: 'ไขมัน',
                fiber: 'ไฟเบอร์',
                water: 'น้ำ'
              }

              return (
                <div key={key} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white rounded-xl shadow-sm">
                        <span className="text-2xl">{icons[key]}</span>
                      </div>
                      <span className="font-bold text-gray-800">
                        {names[key]}
                      </span>
                    </div>
                    <span className={`font-bold text-lg ${getScoreColor(nutrient.avg, nutrient.target)}`}>
                      {nutrient.avg} {nutrient.unit}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>เป้าหมาย: {nutrient.target} {nutrient.unit}</span>
                      <span className="font-medium">
                        {Math.round((nutrient.avg / nutrient.target) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000 shadow-sm"
                        style={{ width: `${getProgressWidth(nutrient.avg, nutrient.target)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Charts */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl shadow-lg mr-4">
              <span className="text-2xl text-white">📈</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              กราหแสดงแนวโน้ม
            </h3>
          </div>
          
          {timeRange === 'week' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-600">
                  แคลอรี่รายวัน
                </h4>
                <div className="text-sm text-gray-500">
                  เป้าหมาย: {summaryData.targetCalories} kcal
                </div>
              </div>
              
              <div className="relative">
                {/* Target line */}
                <div 
                  className="absolute w-full border-t-2 border-dashed border-red-300 z-10"
                  style={{ top: `${100 - (summaryData.targetCalories / 2500) * 100}%` }}
                >
                  <span className="absolute right-0 -top-6 text-xs text-red-500 font-medium bg-red-50 px-2 py-1 rounded">
                    เป้าหมาย
                  </span>
                </div>
                
                <div className="flex items-end justify-between h-72 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  {summaryData.dailyData.map((day, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 max-w-16">
                      <div className="relative w-full h-60 flex items-end">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-700 ease-out ${
                            day.calories > summaryData.targetCalories 
                              ? 'bg-gradient-to-t from-orange-400 to-orange-500' 
                              : 'bg-gradient-to-t from-green-400 to-green-500'
                          }`}
                          style={{ 
                            height: `${Math.min((day.calories / 2500) * 100, 100)}%`,
                            minHeight: '8px'
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow-sm border whitespace-nowrap">
                            {day.calories}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-xs font-medium text-gray-600 text-center">
                        {day.day.slice(0, 3)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-600">
                  แคลอรี่รายสัปดาห์
                </h4>
                <div className="text-sm text-gray-500">
                  เป้าหมาย: {summaryData.targetCalories} kcal
                </div>
              </div>
              
              <div className="relative">
                {/* Target line */}
                <div 
                  className="absolute w-full border-t-2 border-dashed border-red-300 z-10"
                  style={{ top: `${100 - (summaryData.targetCalories / 2500) * 100}%` }}
                >
                  <span className="absolute right-0 -top-6 text-xs text-red-500 font-medium bg-red-50 px-2 py-1 rounded">
                    เป้าหมาย
                  </span>
                </div>
                
                <div className="flex items-end justify-between h-72 bg-gray-50 rounded-2xl p-6 border border-gray-200 space-x-4">
                  {summaryData.weeklyData.map((week, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="relative w-full h-60 flex items-end">
                        <div 
                          className={`w-full rounded-t-lg transition-all duration-700 ease-out ${
                            week.calories > summaryData.targetCalories 
                              ? 'bg-gradient-to-t from-orange-400 to-orange-500' 
                              : 'bg-gradient-to-t from-blue-400 to-blue-500'
                          }`}
                          style={{ 
                            height: `${Math.min((week.calories / 2500) * 100, 100)}%`,
                            minHeight: '8px'
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow-sm border whitespace-nowrap">
                            {week.calories}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 text-xs font-medium text-gray-600 text-center">
                        {week.week}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Achievements */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center mb-8">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg mr-4">
              <span className="text-2xl text-white">🏆</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              ความสำเร็จ ({summaryData.period})
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryData.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  achievement.achieved
                    ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100 text-green-700 shadow-green-200/50'
                    : 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-500 shadow-gray-200/50'
                }`}
              >
                <div className={`text-4xl mb-3 ${achievement.achieved ? 'animate-pulse' : ''}`}>
                  {achievement.icon}
                </div>
                <div className="font-bold text-base mb-2">{achievement.name}</div>
                <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                  achievement.achieved 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {achievement.achieved ? '✅ สำเร็จ' : '⏳ ยังไม่สำเร็จ'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-blue-200 shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl shadow-lg mr-4">
              <span className="text-2xl text-white">💡</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              คำแนะนำสำหรับสัปดาห์หน้า
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-200">
              <h4 className="font-bold text-lg text-red-700 mb-4 flex items-center">
                <span className="mr-2">⚠️</span>
                จุดที่ควรปรับปรุง:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <span className="text-red-500 mr-3 mt-1">•</span>
                  <span>เพิ่มการดื่มน้ำให้ครบ 8 แก้วต่อวัน</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-red-500 mr-3 mt-1">•</span>
                  <span>เพิ่มไฟเบอร์จากผักและผลไม้</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-red-500 mr-3 mt-1">•</span>
                  <span>ควบคุมแคลอรี่ให้ใกล้เคียงเป้าหมาย</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
              <h4 className="font-bold text-lg text-green-700 mb-4 flex items-center">
                <span className="mr-2">✅</span>
                จุดเด่นที่ควรรักษา:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>ปริมาณโปรตีนที่เหมาะสม</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>การบันทึกอาหารที่สม่ำเสมอ</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-green-500 mr-3 mt-1">•</span>
                  <span>สัดส่วนมหาลโภชนาการที่สมดุล</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutritionSummary
