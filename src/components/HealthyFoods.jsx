import React, { useState } from 'react'

const HealthyFoods = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const foodCategories = {
    all: 'ทั้งหมด',
    protein: 'โปรตีน',
    carbs: 'คาร์โบไหเดรต',
    vegetables: 'ผักใบเขียว',
    fruits: 'ผลไม้',
    dairy: 'นม & ผลิตภัณฑ์',
    nuts: 'ถั่วและเมล็ด',
    whole_grains: 'ธัญพืชเต็มเมล็ด'
  }

  const healthyFoods = [
    // โปรตีน
    {
      id: 1,
      name: 'ไก่ (เนื้อขาว)',
      category: 'protein',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      benefits: ['สร้างกล้ามเนื้อ', 'ซ่อมแซมเซลล์', 'ไขมันต่ำ'],
      serving: '100 กรัม',
      tips: 'เลือกเนื้อไก่ไม่มีหนัง และหลีกเลี่ยงการทอด'
    },
    {
      id: 2,
      name: 'ปลาแซลมอน',
      category: 'protein',
      calories: 208,
      protein: 25,
      carbs: 0,
      fat: 12,
      benefits: ['โอเมก้า 3', 'บำรุงสมอง', 'ลดการอักเสบ'],
      serving: '100 กรัม',
      tips: 'ปิ้งหรือนึ่งจะดีกว่าทอด'
    },
    {
      id: 3,
      name: 'เต้าหู้',
      category: 'protein',
      calories: 144,
      protein: 15,
      carbs: 3,
      fat: 9,
      benefits: ['โปรตีนพืช', 'ไอโซฟลาโวน', 'เหมาะสำหรับมังสวิรัติ'],
      serving: '100 กรัม',
      tips: 'เลือกเต้าหู้แข็งสำหรับโปรตีนมากกว่า'
    },
    
    // คาร์โบไหเดรต
    {
      id: 4,
      name: 'ข้าวกล้อง',
      category: 'carbs',
      calories: 112,
      protein: 2.6,
      carbs: 22,
      fat: 0.9,
      benefits: ['ใยอาหารสูง', 'วิตามิน B', 'ให้พลังงานยาวนาน'],
      serving: '100 กรัม (สุก)',
      tips: 'แช่ข้าวก่อนหุงจะช่วยลดเวลาในการปรุง'
    },
    {
      id: 5,
      name: 'มันเทศ',
      category: 'carbs',
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      benefits: ['เบต้าแคโรทีน', 'วิตามิน A', 'โพแทสเซียม'],
      serving: '100 กรัม',
      tips: 'อบหรือต้มดีกว่าทอด'
    },
    {
      id: 6,
      name: 'ข้าวโอ๊ต',
      category: 'whole_grains',
      calories: 68,
      protein: 2.4,
      carbs: 12,
      fat: 1.4,
      benefits: ['ลดคอเลสเตอรอล', 'ใยอาหารสูง', 'ควบคุมน้ำตาล'],
      serving: '100 กรัม (สุก)',
      tips: 'เลือกโอ๊ตแบบ Steel-cut หรือ Rolled oats'
    },

    // ผักใบเขียว
    {
      id: 7,
      name: 'ผักโขม',
      category: 'vegetables',
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      benefits: ['เหล็ก', 'โฟเลต', 'วิตามิน K'],
      serving: '100 กรัม',
      tips: 'ผัดเบา ๆ หรือเป็นสลัด'
    },
    {
      id: 8,
      name: 'บร็อกโคลี',
      category: 'vegetables',
      calories: 34,
      protein: 2.8,
      carbs: 7,
      fat: 0.4,
      benefits: ['วิตามิน C', 'ไฟเบอร์', 'สารต้านอนุมูลอิสระ'],
      serving: '100 กรัม',
      tips: 'นึ่งหรือลวกสั้น ๆ เพื่อรักษาสารอาหาร'
    },

    // ผลไม้
    {
      id: 9,
      name: 'บลูเบอร์รี่',
      category: 'fruits',
      calories: 57,
      protein: 0.7,
      carbs: 14,
      fat: 0.3,
      benefits: ['แอนโทไซยานิน', 'บำรุงสมอง', 'ต้านอนุมูลอิสระ'],
      serving: '100 กรัม',
      tips: 'กินสดหรือใส่โยเกิร์ต'
    },
    {
      id: 10,
      name: 'อาโวคาโด',
      category: 'fruits',
      calories: 160,
      protein: 2,
      carbs: 9,
      fat: 15,
      benefits: ['ไขมันดี', 'วิตามิน E', 'โฟเลต'],
      serving: '100 กรัม',
      tips: 'ไขมันดีช่วยดูดซึมวิตามินที่ละลายในไขมัน'
    },

    // นมและผลิตภัณฑ์
    {
      id: 11,
      name: 'โยเกิร์ตกรีก',
      category: 'dairy',
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      benefits: ['โปรไบโอติก', 'แคลเซียม', 'โปรตีนสูง'],
      serving: '100 กรัม',
      tips: 'เลือกแบบไม่มีน้ำตาลเติม'
    },

    // ถั่วและเมล็ด
    {
      id: 12,
      name: 'อัลมอนด์',
      category: 'nuts',
      calories: 576,
      protein: 21,
      carbs: 22,
      fat: 49,
      benefits: ['วิตามิน E', 'แมกนีเซียม', 'ไขมันดี'],
      serving: '100 กรัม',
      tips: 'กินประมาณ 20-25 เม็ดต่อวัน'
    },
    {
      id: 13,
      name: 'เมล็ดเจีย',
      category: 'nuts',
      calories: 486,
      protein: 17,
      carbs: 42,
      fat: 31,
      benefits: ['โอเมก้า 3', 'ใยอาหาร', 'แคลเซียม'],
      serving: '100 กรัม',
      tips: 'แช่น้ำก่อนกินจะขยายตัวและอิ่มท้องมากขึ้น'
    }
  ]

  const filteredFoods = healthyFoods.filter(food => {
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const FoodCard = ({ food }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          {foodCategories[food.category]}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-sm text-gray-600">แคลอรี่</div>
          <div className="text-lg font-bold text-blue-600">{food.calories}</div>
          <div className="text-xs text-gray-500">ต่อ {food.serving}</div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">โปรตีน:</span>
            <span className="font-medium">{food.protein}g</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">คาร์บ:</span>
            <span className="font-medium">{food.carbs}g</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">ไขมัน:</span>
            <span className="font-medium">{food.fat}g</span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">ประโยชน์:</h4>
        <div className="flex flex-wrap gap-1">
          {food.benefits.map((benefit, index) => (
            <span key={index} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
              {benefit}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t pt-3">
        <h4 className="text-sm font-medium text-gray-700 mb-1">💡 เคล็ดลับ:</h4>
        <p className="text-sm text-gray-600">{food.tips}</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          🥗 อาหารเพื่อสุขภาพ
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          รวมอาหารที่มีประโยชน์สำหรับทุกเพศทุกวัย พร้อมข้อมูลโภชนาการและเคล็ดลับการเลือกซื้อ
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              หมวดหมู่อาหาร
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {Object.entries(foodCategories).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ค้นหาอาหาร
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="พิมพ์ชื่ออาหารที่ต้องการหา..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map(food => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">ไม่พบอาหารที่ค้นหา</h3>
          <p className="text-gray-500">ลองเปลี่ยนหมวดหมู่หรือคำค้นหาใหม่</p>
        </div>
      )}

      {/* Nutritional Tips */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          📋 หลักการเลือกอาหารเพื่อสุขภาพ
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl mb-2">🌈</div>
            <h4 className="font-medium mb-2">หลากสี หลากชนิด</h4>
            <p className="text-sm text-gray-600">
              เลือกผักผลไม้หลากสีเพื่อได้สารอาหารครบถ้วน
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl mb-2">🥄</div>
            <h4 className="font-medium mb-2">ปริมาณที่เหมาะสม</h4>
            <p className="text-sm text-gray-600">
              ควบคุมขนาดหรือปริมาณการกินในแต่ละมื้อ
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl mb-2">⏰</div>
            <h4 className="font-medium mb-2">กินตรงเวลา</h4>
            <p className="text-sm text-gray-600">
              รับประทานอาหารเป็นเวลาสม่ำเสมอ
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl mb-2">💧</div>
            <h4 className="font-medium mb-2">ดื่มน้ำเพียงพอ</h4>
            <p className="text-sm text-gray-600">
              ดื่มน้ำสะอาดอย่างน้อยวันละ 8-10 แก้ว
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthyFoods
