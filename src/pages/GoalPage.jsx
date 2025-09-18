import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const particlesData = Array.from({ length: 30 }, (_, i) => ({
  icon: ["🍃","🥑","🥦","🍏","🥗","🌰","🥜"][i % 7],
  size: 22 + Math.floor(Math.random() * 28),
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5
}));

const GoalPage = () => {
  const [particles, setParticles] = useState(particlesData);
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activity, setActivity] = useState(1.2);
  const [tdee, setTDEE] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        top: (parseFloat(p.top) + 0.18) % 100
      })));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const calculateTDEE = () => {
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    setTDEE(Math.round(bmr * activity));
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-tr from-green-200 via-lime-100 to-yellow-50 p-4">
      {/* Particles */}
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute pointer-events-none select-none"
          style={{ left: `${p.left}%`, top: `${p.top}%`, fontSize: p.size, zIndex: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4 + Math.random() * 4, delay: p.delay }}
        >
          {p.icon}
        </motion.div>
      ))}

      {/* Form */}
      <div className="relative z-10 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-900 mb-6 text-center drop-shadow-sm">เป้าหมายพลังงานต่อวัน</h1>

        <form className="flex flex-col gap-5" onSubmit={e => { e.preventDefault(); calculateTDEE(); }}>
          <div>
            <label className="font-semibold text-green-800 mb-1 block" htmlFor="gender">เพศ:</label>
            <select id="gender" className="w-full p-2 rounded-xl border border-green-200 focus:outline-green-400 bg-white text-green-900" value={gender} onChange={e => setGender(e.target.value)}>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-green-800 mb-1 block" htmlFor="age">อายุ (ปี):</label>
            <input id="age" type="number" min={1} max={120} className="w-full p-2 rounded-xl border border-green-200 focus:outline-green-400 bg-white text-green-900 placeholder:text-green-700" value={age} onChange={e => setAge(Number(e.target.value))} placeholder="กรอกอายุ" />
          </div>

          <div>
            <label className="font-semibold text-green-800 mb-1 block" htmlFor="weight">น้ำหนัก (kg):</label>
            <input id="weight" type="number" min={1} max={300} className="w-full p-2 rounded-xl border border-green-200 focus:outline-green-400 bg-white text-green-900 placeholder:text-green-700" value={weight} onChange={e => setWeight(Number(e.target.value))} placeholder="กรอกน้ำหนัก" />
          </div>

          <div>
            <label className="font-semibold text-green-800 mb-1 block" htmlFor="height">ส่วนสูง (cm):</label>
            <input id="height" type="number" min={50} max={250} className="w-full p-2 rounded-xl border border-green-200 focus:outline-green-400 bg-white text-green-900 placeholder:text-green-700" value={height} onChange={e => setHeight(Number(e.target.value))} placeholder="กรอกส่วนสูง" />
          </div>

          <div>
            <label className="font-semibold text-green-800 mb-1 block" htmlFor="activity">ระดับกิจกรรม:</label>
            <select id="activity" className="w-full p-2 rounded-xl border border-green-200 focus:outline-green-400 bg-white text-green-900" value={activity} onChange={e => setActivity(Number(e.target.value))}>
              <option value={1.2}>นั่งทำงาน (น้อย)</option>
              <option value={1.375}>ออกกำลังกายเบา</option>
              <option value={1.55}>ออกกำลังกายปานกลาง</option>
              <option value={1.725}>ออกกำลังกายหนัก</option>
            </select>
          </div>

          <motion.button
            type="submit"
            className="bg-green-200 text-green-900 font-bold rounded-2xl py-3 mt-2 shadow-lg hover:bg-green-300 transition-all focus:outline-green-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            คำนวณพลังงานเป้าหมาย
          </motion.button>

          {tdee && (
            <div className="mt-4 text-center animate-fade-in">
              <p className="text-xl font-semibold text-green-900">พลังงานเป้าหมายต่อวัน:</p>
              <p className="text-3xl font-bold text-green-800 drop-shadow">{tdee} kcal</p>
              <p className="text-green-700 mt-2">คุณควรบริโภคพลังงานนี้เพื่อรักษาน้ำหนัก</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default GoalPage;
