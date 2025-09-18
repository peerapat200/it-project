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
    <div className="w-full max-w-none mx-auto p-2 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          สรุปโภชนาการ
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          วิเคราะห์และติดตามความคืบหน้าของโภชนาการในแต่ละช่วงเวลา
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            ช่วงเวลาที่ต้องการดู
          </h2>
          <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
            <button
              onClick={() => setTimeRange('week')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
                timeRange === 'week'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              สัปดาห์
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-md transition-all text-sm sm:text-base ${
                timeRange === 'month'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              เดือน
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {summaryData.avgCalories}
            </div>
            <div className="text-green-100">แคลอรี่เฉลี่ย/วัน</div>
            <div className="text-sm text-green-200">
              เป้าหมาย: {summaryData.targetCalories}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {summaryData.totalDays}
            </div>
            <div className="text-green-100">วันที่บันทึก</div>
            <div className="text-sm text-green-200">
              {summaryData.period}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">
              {Math.round((summaryData.avgCalories / summaryData.targetCalories) * 100)}%
            </div>
            <div className="text-green-100">ความสำเร็จ</div>
            <div className="text-sm text-green-200">
              ของเป้าหมาย
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          สรุปโภชนาการเฉลี่ย
        </h3>
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
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{icons[key]}</span>
                    <span className="font-medium text-gray-800">
                      {names[key]}
                    </span>
                  </div>
                  <span className={`font-bold ${getScoreColor(nutrient.avg, nutrient.target)}`}>
                    {nutrient.avg} {nutrient.unit}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>เป้าหมาย: {nutrient.target} {nutrient.unit}</span>
                    <span>
                      {Math.round((nutrient.avg / nutrient.target) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
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
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          กราฟแสดงแนวโน้ม
        </h3>
        
        {timeRange === 'week' ? (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-700">
              แคลอรี่รายวัน
            </h4>
            <div className="flex items-end justify-between h-64 space-x-2">
              {summaryData.dailyData.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="relative w-full bg-gray-200 rounded-t-lg overflow-hidden" style={{ height: '200px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-green-400 to-green-600 rounded-t-lg transition-all duration-1000"
                      style={{ height: `${(day.calories / 2500) * 100}%` }}
                    ></div>
                    <div className="absolute top-2 left-0 right-0 text-center">
                      <span className="text-xs font-medium text-gray-600">
                        {day.calories}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-700">
                    {day.day.slice(0, 2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h4 className="text-lg font-medium text-gray-700">
              แคลอรี่รายสัปดาห์
            </h4>
            <div className="flex items-end justify-between h-64 space-x-4">
              {summaryData.weeklyData.map((week, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="relative w-full bg-gray-200 rounded-t-lg overflow-hidden" style={{ height: '200px' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg transition-all duration-1000"
                      style={{ height: `${(week.calories / 2500) * 100}%` }}
                    ></div>
                    <div className="absolute top-2 left-0 right-0 text-center">
                      <span className="text-xs font-medium text-gray-600">
                        {week.calories}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm font-medium text-gray-700">
                    {week.week}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          ความสำเร็จ ({summaryData.period})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryData.achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                achievement.achieved
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 bg-gray-50 text-gray-500'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <div className="font-medium">{achievement.name}</div>
              <div className="text-sm mt-1">
                {achievement.achieved ? '✅ สำเร็จ' : '⏳ ยังไม่สำเร็จ'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          💡 คำแนะนำสำหรับสัปดาห์หน้า
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">จุดที่ควรปรับปรุง:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• เพิ่มการดื่มน้ำให้ครบ 8 แก้วต่อวัน</li>
              <li>• เพิ่มไฟเบอร์จากผักและผลไม้</li>
              <li>• ควบคุมแคลอรี่ให้ใกล้เคียงเป้าหมาย</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">จุดเด่นที่ควรรักษา:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• ปริมาณโปรตีนที่เหมาะสม</li>
              <li>• การบันทึกอาหารที่สม่ำเสมอ</li>
              <li>• สัดส่วนมหาลโภชนาการที่สมดุล</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutritionSummary
