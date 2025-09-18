import React, { useState } from 'react'

const MealPlanner = () => {
  const [selectedDay, setSelectedDay] = useState('monday')
  const [ageGroup, setAgeGroup] = useState('adult')
  
  const days = {
    monday: 'วันจันทร์',
    tuesday: 'วันอังคาร', 
    wednesday: 'วันพุธ',
    thursday: 'วันพฤหัสบดี',
    friday: 'วันศุกร์',
    saturday: 'วันเสาร์',
    sunday: 'วันอาทิตย์'
  }

  const ageGroups = {
    child: 'เด็ก (2-12 ปี)',
    teen: 'วัยรุ่น (13-19 ปี)',
    adult: 'ผู้ใหญ่ (20-64 ปี)',
    elderly: 'ผู้สูงอายุ (65+ ปี)'
  }

  const mealPlans = {
    child: {
      monday: {
        breakfast: {
          menu: 'โจ๊กไก่ผักรวม + นมสด',
          calories: 350,
          description: 'โจ๊กข้าวกล้องต้มกับไก่สับ ผักแครอท บร็อกโคลี'
        },
        lunch: {
          menu: 'ข้าวกล้อง + ปลานึ่งซีอิ๊ว + ผัดผักรวม',
          calories: 450,
          description: 'ปลากะพงนึ่งซีอิ๊ว ผัดผักคะน้า แครอท'
        },
        snack: {
          menu: 'ผลไม้รวม + โยเกิร์ต',
          calories: 150,
          description: 'กล้วย แอปเปิ้ล กับโยเกิร์ตไม่มีน้ำตาล'
        },
        dinner: {
          menu: 'ซุปผัก + ขนมปังโฮลวีท',
          calories: 300,
          description: 'ซุปผักใส่เต้าหู้ กับขนมปังโฮลวีท'
        }
      }
    },
    teen: {
      monday: {
        breakfast: {
          menu: 'ข้าวโอ๊ต + กล้วย + อัลมอนด์',
          calories: 400,
          description: 'ข้าวโอ๊ตหุงนม ใส่กล้วยหั่น และอัลมอนด์สับ'
        },
        lunch: {
          menu: 'ข้าวกล้อง + ไก่ย่าง + สลัดผัก',
          calories: 600,
          description: 'ไก่ย่างเครื่องเทศ สลัดผักใส่น้ำสลัดน้อย'
        },
        snack: {
          menu: 'สมูทตี้ผักผลไม้',
          calories: 200,
          description: 'ผสมผักโขม กล้วย มะม่วง น้ำมะเลือง'
        },
        dinner: {
          menu: 'ควินัว + ปลาแซลมอน + ผักนึ่ง',
          calories: 550,
          description: 'ปลาแซลมอนปิ้ง ควินัวต้ม บร็อกโคลีนึ่ง'
        }
      }
    },
    adult: {
      monday: {
        breakfast: {
          menu: 'โอ๊ตมีล + เบอร์รี่ + เมล็ดเจีย',
          calories: 350,
          description: 'โอ๊ตมีลหุงนมอัลมอนด์ ใส่บลูเบอร์รี่ เมล็ดเจีย'
        },
        lunch: {
          menu: 'สลัดโปรตีน + อาโวคาโด',
          calories: 500,
          description: 'ไก่ย่าง ผักใบเขียว อาโวคาโด ถั่วชิคพี น้ำสลัดโยเกิร์ต'
        },
        snack: {
          menu: 'กรีกโยเกิร์ต + ถั่วผสม',
          calories: 180,
          description: 'โยเกิร์ตกรีกไม่มีน้ำตาล ถั่วรวมคั่ว'
        },
        dinner: {
          menu: 'ปลานึ่ง + ผักโขมผัด + มันเทศย่าง',
          calories: 450,
          description: 'ปลากะพงนึ่งมะนาว ผักโขมผัดกระเทียม มันเทศย่าง'
        }
      },
      tuesday: {
        breakfast: {
          menu: 'ไข่ตุ๋น + ขนมปังโฮลวีท + อาโวคาโด',
          calories: 380,
          description: 'ไข่ตุ๋นใส่ผักรวม ขนมปังโฮลวีท อาโวคาโดแมช'
        },
        lunch: {
          menu: 'ข้าวกล้อง + แกงเจือฉ่าย',
          calories: 480,
          description: 'ข้าวกล้อง แกงเจือฉ่ายใส่เต้าหู้ กุ้ง'
        },
        snack: {
          menu: 'ผลไม้ตามฤดูกาล',
          calories: 120,
          description: 'แอปเปิ้ล หรือ ส้ม หรือ มะละกอ'
        },
        dinner: {
          menu: 'ซุปมิโซะ + ปลาย่าง + ผักต้ม',
          calories: 420,
          description: 'ซุปมิโซะใส่เต้าหู้ ปลาย่างเครื่องเทศ ผักรวมต้ม'
        }
      }
    },
    elderly: {
      monday: {
        breakfast: {
          menu: 'โจ๊กปลา + ผักต้ม',
          calories: 280,
          description: 'โจ๊กข้าวกล้องต้มปลาสับ ผักโขม แครอท'
        },
        lunch: {
          menu: 'ข้าวนิ่ม + ไก่ต้ม + แกงผัก',
          calories: 400,
          description: 'ข้าวหุงนิ่ม ไก่ต้มยำ แกงผักรวมใส่เต้าหู้'
        },
        snack: {
          menu: 'นมถั่วเหลือง + บิสกิตไฟเบอร์',
          calories: 150,
          description: 'นมถั่วเหลืองไม่มีน้ำตาล บิสกิตโฮลวีท'
        },
        dinner: {
          menu: 'ปลานึ่ง + ผักต้มอ่อน',
          calories: 320,
          description: 'ปลานึ่งซีอิ๊วขาว ผักต้มอ่อน ๆ'
        }
      }
    }
  }

  // สร้างข้อมูลสำหรับวันอื่น ๆ (สำหรับ demo)
  const generateWeekPlan = (basePlan) => {
    const variations = [
      { breakfast: 'ผลไม้รวม + โยเกิร์ต', lunch: 'สลัดทูน่า', dinner: 'แกงส้มผัก' },
      { breakfast: 'ขนมปัง + ไข่ลวก', lunch: 'ข้าวผัดผัก', dinner: 'ผัดผักรวม' },
      { breakfast: 'กล้วยหอม + นม', lunch: 'ต้มยำปลา', dinner: 'ปลาปิ้ง' },
      { breakfast: 'เซเรียล + ผลไม้', lunch: 'ข้าวกะเพรา', dinner: 'แกงเขียวหวาน' },
      { breakfast: 'ไข่ดาว + ข้าว', lunch: 'ผัดซีอิ๊ว', dinner: 'ลาบปลา' },
      { breakfast: 'โอ๊ต + เบอร์รี่', lunch: 'สลัดไก่', dinner: 'ซุปผัก' }
    ]
    
    const weekPlan = { monday: basePlan }
    const dayKeys = Object.keys(days).slice(1)
    
    dayKeys.forEach((day, index) => {
      weekPlan[day] = {
        breakfast: { ...basePlan.breakfast, menu: variations[index].breakfast },
        lunch: { ...basePlan.lunch, menu: variations[index].lunch },
        snack: basePlan.snack,
        dinner: { ...basePlan.dinner, menu: variations[index].dinner }
      }
    })
    
    return weekPlan
  }

  const currentPlan = mealPlans[ageGroup] || { monday: mealPlans.adult.monday }
  const weekPlan = generateWeekPlan(currentPlan.monday)
  const todayMeals = weekPlan[selectedDay] || weekPlan.monday

  const MealCard = ({ mealType, meal, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <span className="text-xl mr-2">{icon}</span>
          {mealType}
        </h3>
        <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
          {meal.calories} cal
        </span>
      </div>
      <h4 className="font-medium text-gray-700 mb-2">{meal.menu}</h4>
      <p className="text-sm text-gray-600">{meal.description}</p>
    </div>
  )

  const totalCalories = todayMeals.breakfast?.calories + todayMeals.lunch?.calories + todayMeals.snack?.calories + todayMeals.dinner?.calories

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          📅 วางแผนมื้ออาหาร
        </h2>
        <p className="text-gray-600">
          แผนการกินอาหารเพื่อสุขภาพที่เหมาะสมสำหรับแต่ละช่วงวัย
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ช่วงวัย
            </label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-green-900 placeholder:text-green-700"
            >
              {Object.entries(ageGroups).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              วันที่เลือก
            </label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-green-900 placeholder:text-green-700"
            >
              {Object.entries(days).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mb-8">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {days[selectedDay]} - {ageGroups[ageGroup]}
          </h3>
          <div className="text-3xl font-bold text-green-600">
            {totalCalories} แคลอรี่
          </div>
          <p className="text-sm text-gray-600 mt-2">รวมแคลอรี่ทั้งวัน</p>
        </div>
      </div>

      {/* Meal Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <MealCard
          mealType="มื้อเช้า"
          meal={todayMeals.breakfast}
          icon="🌅"
        />
        <MealCard
          mealType="มื้อกลางวัน"
          meal={todayMeals.lunch}
          icon="☀️"
        />
        <MealCard
          mealType="มื้อว่าง"
          meal={todayMeals.snack}
          icon="🍎"
        />
        <MealCard
          mealType="มื้อเย็น" 
          meal={todayMeals.dinner} 
          icon="🌙"
        />
      </div>

      {/* Weekly Overview */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          📊 ภาพรวมสัปดาห์
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(days).map(([dayKey, dayName]) => (
            <button
              key={dayKey}
              onClick={() => setSelectedDay(dayKey)}
              className={`p-3 rounded-lg text-center transition-colors ${
                selectedDay === dayKey
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="text-xs font-medium">{dayName}</div>
              <div className="text-sm mt-1">
                {weekPlan[dayKey]?.breakfast?.calories + weekPlan[dayKey]?.lunch?.calories + 
                 weekPlan[dayKey]?.snack?.calories + weekPlan[dayKey]?.dinner?.calories || totalCalories}
              </div>
              <div className="text-xs text-gray-500">cal</div>
            </button>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          💡 เคล็ดลับการวางแผนมื้อออาหาร
        </h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl mb-2">⏰</div>
            <h4 className="font-medium mb-2">กินตรงเวลา</h4>
            <p className="text-sm text-gray-600">
              รับประทานอาหารเป็นเวลา ห่างกัน 3-4 ชั่วโมง
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl mb-2">🍽️</div>
            <h4 className="font-medium mb-2">สัดส่วนที่เหมาะสม</h4>
            <p className="text-sm text-gray-600">
              ครึ่งจาน = ผัก, ¼ = โปรตีน, ¼ = คาร์โบไหเดรต
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl mb-2">🥤</div>
            <h4 className="font-medium mb-2">ดื่มน้ำเพียงพอ</h4>
            <p className="text-sm text-gray-600">
              ดื่มน้ำระหว่างมื้อ หลีกเลี่ยงเครื่องดื่มหวาน
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">🎯 แนวทางสำหรับแต่ละช่วงวัย:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><strong>เด็ก:</strong> ต้องการแคลเซียมและโปรตีนสำหรับการเจริญเติบโต</li>
            <li><strong>วัยรุ่น:</strong> ต้องการพลังงานสูงสำหรับกิจกรรมและการเรียน</li>
            <li><strong>ผู้ใหญ่:</strong> ควบคุมน้ำหนักและป้องกันโรคเรื้อรัง</li>
            <li><strong>ผู้สูงอายุ:</strong> เน้นอาหารนุ่ม ย่อยง่าย และมีสารอาหารครบถ้วน</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MealPlanner
