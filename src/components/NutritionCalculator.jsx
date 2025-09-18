import React, { useState } from 'react'

const NutritionCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activity: 'sedentary',
    goal: 'maintain'
  })
  
  const [results, setResults] = useState(null)

  const activityLevels = {
    sedentary: { name: 'นั่งทำงาน/ออกกำลังกายน้อย', multiplier: 1.2 },
    light: { name: 'ออกกำลังกายเบา ๆ 1-3 วัน/สัปดาห์', multiplier: 1.375 },
    moderate: { name: 'ออกกำลังกายปานกลาง 3-5 วัน/สัปดาห์', multiplier: 1.55 },
    active: { name: 'ออกกำลังกายหนัก 6-7 วัน/สัปดาห์', multiplier: 1.725 },
    very_active: { name: 'ออกกำลังกายหนักมาก/งานใช้แรง', multiplier: 1.9 }
  }

  const goals = {
    lose: { name: 'ลดน้ำหนัก', adjustment: -500 },
    maintain: { name: 'รักษาน้ำหนัก', adjustment: 0 },
    gain: { name: 'เพิ่มน้ำหนัก', adjustment: 500 }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const calculateNutrition = () => {
    const { age, gender, weight, height, activity, goal } = formData
    
    if (!age || !weight || !height) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    // คำนวณ BMR (Basal Metabolic Rate)
    let bmr
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age))
    } else {
      bmr = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age))
    }

    // คำนวณ TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityLevels[activity].multiplier
    
    // ปรับตามเป้าหมาย
    const dailyCalories = tdee + goals[goal].adjustment

    // คำนวณ BMI
    const heightInMeters = parseFloat(height) / 100
    const bmi = parseFloat(weight) / (heightInMeters * heightInMeters)

    // แบ่งสัดส่วนสารอาหาร
    const protein = (dailyCalories * 0.25) / 4 // 25% จากโปรตีน (4 แคลอรี่/กรัม)
    const carbs = (dailyCalories * 0.45) / 4   // 45% จากคาร์โบไหเดรต (4 แคลอรี่/กรัม)
    const fats = (dailyCalories * 0.30) / 9    // 30% จากไขมัน (9 แคลอรี่/กรัม)

    // ความต้องการน้ำ
    const waterNeeds = parseFloat(weight) * 35 // 35ml ต่อกิโลกรัม

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      dailyCalories: Math.round(dailyCalories),
      bmi: bmi.toFixed(1),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
      water: Math.round(waterNeeds)
    })
  }

  const getBMIStatus = (bmi) => {
    if (bmi < 18.5) return { status: 'น้ำหนักน้อย', color: 'text-blue-600' }
    if (bmi < 25) return { status: 'น้ำหนักปกติ', color: 'text-green-600' }
    if (bmi < 30) return { status: 'น้ำหนักเกิน', color: 'text-yellow-600' }
    return { status: 'อ้วน', color: 'text-red-600' }
  }

  const ageGroups = [
    { label: 'เด็ก (2-12 ปี)', min: 2, max: 12 },
    { label: 'วัยรุ่น (13-19 ปี)', min: 13, max: 19 },
    { label: 'ผู้ใหญ่ (20-64 ปี)', min: 20, max: 64 },
    { label: 'ผู้สูงอายุ (65+ ปี)', min: 65, max: 120 }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🧮 คำนวณความต้องการสารอาหารรายวัน
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                อายุ (ปี)
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="กรอกอายุ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เพศ
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                น้ำหนัก (กิโลกรัม)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="กรอกน้ำหนัก"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ส่วนสูง (เซนติเมตร)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="กรอกส่วนสูง"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ระดับการออกกำลังกาย
              </label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Object.entries(activityLevels).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                เป้าหมาย
              </label>
              <select
                name="goal"
                value={formData.goal}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {Object.entries(goals).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={calculateNutrition}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              คำนวณ
            </button>
          </div>
        </div>
      </div>

      {results && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            📊 ผลการคำนวณ
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{results.dailyCalories}</div>
              <div className="text-sm text-gray-600">แคลอรี่/วัน</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className={`text-2xl font-bold ${getBMIStatus(results.bmi).color}`}>
                {results.bmi}
              </div>
              <div className="text-sm text-gray-600">BMI</div>
              <div className={`text-xs ${getBMIStatus(results.bmi).color}`}>
                {getBMIStatus(results.bmi).status}
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">{results.bmr}</div>
              <div className="text-sm text-gray-600">BMR</div>
            </div>
            
            <div className="bg-cyan-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-cyan-600">{results.water}</div>
              <div className="text-sm text-gray-600">มล. น้ำ/วัน</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">โปรตีน</span>
                <span className="text-lg font-bold text-red-600">{results.protein}g</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">25% ของแคลอรี่รวม</div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">คาร์โบไหเดรต</span>
                <span className="text-lg font-bold text-orange-600">{results.carbs}g</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">45% ของแคลอรี่รวม</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">ไขมัน</span>
                <span className="text-lg font-bold text-purple-600">{results.fats}g</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">30% ของแคลอรี่รวม</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">💡 คำแนะนำเพิ่มเติม</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• ดื่มน้ำอย่างน้อย {Math.round(results.water/250)} แก้ว ต่อวัน</li>
              <li>• แบ่งมื้ออาหารเป็น 3 มื้อหลัก และ 2 มื้อว่าง</li>
              <li>• เลือกโปรตีนจากแหล่งที่หลากหลาย</li>
              <li>• รับประทานผักและผลไม้อย่างน้อยวันละ 5 ส่วน</li>
              <li>• หลีกเลี่ยงน้ำตาลและไขมันทรานส์</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NutritionCalculator
