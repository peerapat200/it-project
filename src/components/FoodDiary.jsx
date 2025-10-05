import React, { useState, useEffect } from 'react'

const FoodDiary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [meals, setMeals] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState('')
  const [searchFood, setSearchFood] = useState('')
  const [selectedFood, setSelectedFood] = useState(null)
  const [quantity, setQuantity] = useState(1)

  const mealTypes = {
    breakfast: { name: 'อาหารเช้า', icon: '🌅', color: 'from-yellow-400 to-orange-500' },
    lunch: { name: 'อาหารกลางวัน', icon: '☀️', color: 'from-orange-400 to-red-500' },
    dinner: { name: 'อาหารเย็น', icon: '🌙', color: 'from-purple-400 to-indigo-500' },
    snacks: { name: 'ขนมและของว่าง', icon: '🍿', color: 'from-pink-400 to-rose-500' }
  }

  const foodDatabase = [
    { id: 1, name: 'ข้าวกล้อง', calories: 112, protein: 2.6, carbs: 22, fat: 0.9, unit: '100g' },
    { id: 2, name: 'ไก่ย่าง', calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: '100g' },
    { id: 3, name: 'ผักโขมลวก', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, unit: '100g' },
    { id: 4, name: 'ไข่ต้ม', calories: 155, protein: 13, carbs: 1.1, fat: 11, unit: '1 ฟอง' },
    { id: 5, name: 'กล้วยหอม', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, unit: '1 ลูก' },
    { id: 6, name: 'นมถั่วเหลือง', calories: 54, protein: 3.3, carbs: 6.3, fat: 1.8, unit: '100ml' },
    { id: 7, name: 'ปลาแซลมอนย่าง', calories: 208, protein: 25, carbs: 0, fat: 12, unit: '100g' },
    { id: 8, name: 'ข้าวโอ๊ต', calories: 68, protein: 2.4, carbs: 12, fat: 1.4, unit: '100g' },
    { id: 9, name: 'อกไก่ย่าง', calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: '100g' },
    { id: 10, name: 'แอปเปิ้ล', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, unit: '1 ลูก' }
  ]

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchFood.toLowerCase())
  )

  const addFoodToMeal = () => {
    if (!selectedFood || !selectedMeal) return

    const newFoodEntry = {
      ...selectedFood,
      quantity,
      id: Date.now(),
      totalCalories: selectedFood.calories * quantity,
      totalProtein: selectedFood.protein * quantity,
      totalCarbs: selectedFood.carbs * quantity,
      totalFat: selectedFood.fat * quantity
    }

    setMeals(prev => ({
      ...prev,
      [selectedMeal]: [...prev[selectedMeal], newFoodEntry]
    }))

    setShowAddModal(false)
    setSelectedFood(null)
    setQuantity(1)
    setSearchFood('')
  }

  const removeFoodFromMeal = (mealType, foodId) => {
    setMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter(food => food.id !== foodId)
    }))
  }

  const getTotalNutrition = () => {
    let total = { calories: 0, protein: 0, carbs: 0, fat: 0 }
    
    Object.values(meals).flat().forEach(food => {
      total.calories += food.totalCalories || 0
      total.protein += food.totalProtein || 0
      total.carbs += food.totalCarbs || 0
      total.fat += food.totalFat || 0
    })
    
    return total
  }

  const totalNutrition = getTotalNutrition()
  const targetCalories = 2000

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 w-full flex flex-col items-center justify-start pb-24">
      <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-y-6 sm:gap-y-8">
        {/* Header */}
        <div className="text-center mt-6 mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6 shadow-xl">
            <span className="text-3xl text-white">📊</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            บันทึกอาหารประจำวัน
          </h1>
          <p className="text-base sm:text-lg text-blue-700 max-w-2xl mx-auto leading-relaxed font-medium">
            ติดตามอาหารและโภชนาการที่คุณได้รับในแต่ละวัน เพื่อสุขภาพที่ดีกว่า
          </p>
        </div>

        {/* Date Selector */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 animate-slide-up max-w-5xl mx-auto">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-8">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 xl:flex-1">
              <div className="p-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl shadow-lg">
                <span className="text-2xl sm:text-3xl">📅</span>
              </div>
              <div className="text-center sm:text-left flex-1">
                <label className="block text-lg font-bold text-blue-700 mb-3">
                  เลือกวันที่
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border-2 border-gray-200 rounded-2xl px-6 py-4 text-lg focus:ring-3 focus:ring-green-300 focus:border-green-500 w-full transition-all duration-300 hover:border-green-300 shadow-md bg-white/90 backdrop-blur-sm font-medium text-center sm:text-left text-blue-700 cursor-pointer"
                />
              </div>
            </div>
            
            {/* Daily Summary */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4 w-full xl:w-auto">
              <div className="text-center p-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl border border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white">
                <div className="text-xl sm:text-3xl font-bold mb-1">
                  {Math.round(totalNutrition.calories)}
                </div>
                <div className="text-xs sm:text-sm font-semibold opacity-90">แคลอรี่</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl border border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white">
                <div className="text-xl sm:text-3xl font-bold mb-1">
                  {Math.round(totalNutrition.protein)}g
                </div>
                <div className="text-xs sm:text-sm font-semibold opacity-90">โปรตีน</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl border border-orange-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white">
                <div className="text-xl sm:text-3xl font-bold mb-1">
                  {Math.round(totalNutrition.carbs)}g
                </div>
                <div className="text-xs sm:text-sm font-semibold opacity-90">คาร์บ</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl border border-red-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white">
                <div className="text-xl sm:text-3xl font-bold mb-1">
                  {Math.round(totalNutrition.fat)}g
                </div>
                <div className="text-xs sm:text-sm font-semibold opacity-90">ไขมัน</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-base font-bold text-blue-700 mb-4 space-y-2 sm:space-y-0">
              <span className="flex items-center justify-center sm:justify-start">
                <span className="mr-3 text-3xl">🎯</span>
                ความคืบหน้าแคลอรี่ประจำวัน
              </span>
              <span className="text-green-700 bg-green-50 px-6 py-3 rounded-full shadow-lg text-center font-bold">
                {Math.round(totalNutrition.calories)} / {targetCalories}
              </span>
            </div>
            <div className="relative w-full bg-blue-100 rounded-full h-8 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 h-8 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
                style={{ width: `${Math.min((totalNutrition.calories / targetCalories) * 100, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white bg-opacity-30 rounded-full animate-shimmer"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
              </div>
            </div>
            <div className="text-base text-blue-700 mt-4 text-center bg-blue-50 rounded-xl py-3 px-6 font-medium">
              <span className="font-bold text-green-700">{Math.round((totalNutrition.calories / targetCalories) * 100)}%</span> 
              ของเป้าหมายประจำวัน
            </div>
          </div>
        </div>

        {/* Meals */}
        <div className="max-w-6xl mx-auto my-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {Object.entries(mealTypes).map(([mealType, mealInfo], index) => (
              <div key={mealType} className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-102 animate-slide-up h-fit" style={{animationDelay: `${index * 100}ms`}}>
                <div className={`bg-gradient-to-r ${mealInfo.color} p-4 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-blue-900 bg-opacity-15"></div>
                  <div className="absolute -right-6 -top-6 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
                  <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
                  <div className="relative flex items-center justify-between z-10">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white bg-opacity-30 rounded-xl backdrop-blur-sm shadow-lg flex-shrink-0">
                        <span className="text-lg">{mealInfo.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1 text-shadow-sm">{mealInfo.name}</h3>
                        <p className="text-xs opacity-90 font-medium">
                          {meals[mealType].length} รายการ
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedMeal(mealType)
                        setShowAddModal(true)
                      }}
                      className="group bg-green-300 hover:bg-green-400 text-green-900 rounded-lg px-3 py-2 text-xs font-bold transition-all duration-300 border border-green-400 shadow-md"
                    >
                      <span className="group-hover:animate-bounce inline-block mr-1">+</span> 
                      <span className="tracking-wide">เพิ่ม</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  {meals[mealType].length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-purple-200 rounded-full flex items-center justify-center shadow-inner">
                        <span className="text-2xl opacity-70">🍽️</span>
                      </div>
                      <p className="text-base font-bold text-blue-700 mb-1">ยังไม่มีรายการอาหาร</p>
                      <p className="text-xs text-blue-600 font-medium">คลิก "เพิ่ม" เพื่อเริ่มบันทึก</p>
                    </div>
                  ) : (
                    <div className="space-y-0">
                      {meals[mealType].map((food, foodIndex) => (
                          <div key={food.id} className="group flex items-start justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 hover:from-green-50 hover:to-emerald-50 hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md animate-slide-up mb-3" style={{animationDelay: `${foodIndex * 50}ms`}}>
                          <div className="flex-1 min-w-0 pr-3">
                            <div className="font-bold text-blue-700 text-sm mb-2">
                              {food.name} x {food.quantity} {food.unit}
                            </div>
                            <div className="text-xs text-blue-700 flex flex-wrap gap-2">
                              <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full font-bold text-xs shadow-sm">
                                🔥 {Math.round(food.totalCalories)}
                              </span>
                              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-3 py-1 rounded-full font-bold text-xs shadow-sm">
                                💪 {Math.round(food.totalProtein)}g
                              </span>
                              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full font-bold text-xs shadow-sm">
                                🌾 {Math.round(food.totalCarbs)}g
                              </span>
                              <span className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-3 py-1 rounded-full font-bold text-xs shadow-sm">
                                🥑 {Math.round(food.totalFat)}g
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFoodFromMeal(mealType, food.id)}
                            className="flex-shrink-0 p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                          >
                            <span className="text-sm font-bold">🗑️</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Food Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 bg-opacity-75 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 w-full max-w-md sm:max-w-3xl mx-4 max-h-[90vh] overflow-y-auto shadow-3xl border border-white/30 animate-scale-in">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-5 justify-center sm:justify-start">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl flex items-center justify-center shadow-xl">
                    <span className="text-white text-3xl">➕</span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl sm:text-3xl font-bold text-blue-700">
                      เพิ่มอาหารใน{mealTypes[selectedMeal]?.name}
                    </h3>
                    <p className="text-blue-700 text-base mt-2 font-medium">เลือกอาหารและระบุจำนวน</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-4 text-blue-400 hover:text-white hover:bg-red-500 rounded-3xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl mx-auto sm:mx-0"
                >
                  <span className="text-4xl">×</span>
                </button>
              </div>

              {/* Search Food */}
              <div className="mb-10">
                <label className="flex items-center justify-center sm:justify-start text-xl font-bold text-blue-700 mb-6">
                  <span className="mr-4 text-3xl">🔍</span> 
                  ค้นหาอาหาร
                </label>
                <input
                  type="text"
                  value={searchFood}
                  onChange={(e) => setSearchFood(e.target.value)}
                  placeholder="พิมพ์ชื่ออาหารที่ต้องการ..."
                  className="w-full border-2 border-gray-200 rounded-3xl px-8 py-5 text-lg sm:text-xl focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all duration-300 hover:border-green-300 shadow-xl bg-white/80 backdrop-blur-sm font-medium text-center sm:text-left text-blue-700"
                />
              </div>

              {/* Food List */}
              <div className="mb-10 max-h-80 overflow-y-auto space-y-4 bg-blue-50/50 rounded-3xl p-6">
                {filteredFoods.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 transform hover:scale-102 ${
                      selectedFood?.id === food.id
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-2 border-green-500 shadow-2xl scale-105'
                        : 'bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl'
                    } mt-2 mb-2`}
                  >
                    <div className={`font-bold text-base sm:text-lg mb-2 text-center sm:text-left ${selectedFood?.id === food.id ? 'text-white' : 'text-blue-700'}`}>
                      {food.name}
                    </div>
                    <div className="flex items-center justify-center sm:justify-start space-x-3">
                      <span className={`px-3 py-2 rounded-full text-sm font-bold ${
                        selectedFood?.id === food.id 
                          ? 'bg-white bg-opacity-30 text-white' 
                          : 'bg-gradient-to-r from-orange-400 to-red-400 text-white'
                      }`}>
                        🔥 {food.calories} แคลอรี่
                      </span>
                      <span className={`text-sm font-medium ${selectedFood?.id === food.id ? 'text-white opacity-90' : 'text-blue-700'}`}>
                        / {food.unit}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quantity */}
              {selectedFood && (
                <>
                  <div className="mb-8">
                    <label className="flex items-center justify-center sm:justify-start text-xl font-bold text-blue-700 mb-6">
                      <span className="mr-4 text-3xl">📏</span> 
                      จำนวน
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                      min="0.1"
                      step="0.1"
                      className="w-full border-2 border-gray-200 rounded-3xl px-8 py-5 text-lg sm:text-xl focus:ring-4 focus:ring-green-300 focus:border-green-500 transition-all duration-300 shadow-xl bg-white/80 backdrop-blur-sm font-medium text-center text-blue-700"
                    />
                  </div>

                  {/* Preview */}
                  <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 mb-10 border-2 border-blue-200 shadow-xl">
                    <div className="text-xl font-bold text-blue-700 mb-6 flex items-center justify-center sm:justify-start">
                      <span className="mr-4 text-3xl">✨</span>
                      ตัวอย่างโภชนาการ
                    </div>
                    <div className="font-bold text-2xl text-blue-800 mb-6 text-center">
                      {selectedFood.name} x {quantity} {selectedFood.unit}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-5 py-4 rounded-3xl text-lg font-bold text-center shadow-xl">
                        🔥 {Math.round(selectedFood.calories * quantity)} แคลอรี่
                      </span>
                      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-5 py-4 rounded-3xl text-lg font-bold text-center shadow-xl">
                        💪 {Math.round(selectedFood.protein * quantity)}g โปรตีน
                      </span>
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-5 py-4 rounded-3xl text-lg font-bold text-center shadow-xl">
                        🌾 {Math.round(selectedFood.carbs * quantity)}g คาร์บ
                      </span>
                      <span className="bg-gradient-to-r from-green-400 to-emerald-400 text-white px-5 py-4 rounded-3xl text-lg font-bold text-center shadow-xl">
                        🥑 {Math.round(selectedFood.fat * quantity)}g ไขมัน
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mt-8 mb-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-4 border-2 border-blue-300 text-blue-700 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 text-base sm:text-lg font-bold shadow-md hover:shadow-xl transform hover:scale-105"
                >
                  ❌ ยกเลิก
                </button>
                <button
                  onClick={addFoodToMeal}
                  disabled={!selectedFood}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl hover:from-green-500 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                >
                  ✅ <span className="tracking-wide">บันทึกอาหาร</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDiary
