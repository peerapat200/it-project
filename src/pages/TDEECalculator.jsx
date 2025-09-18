import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Confetti from "react-confetti";

const TDEECalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState(1.2);
  const [tdee, setTdee] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showButtonParticles, setShowButtonParticles] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const cardControls = useAnimation();

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activityLevels = [
    { label: "น้อย / ไม่ออกกำลังกาย", value: 1.2 },
    { label: "ออกกำลังกายเบา 1-3 วัน/สัปดาห์", value: 1.375 },
    { label: "ออกกำลังกายปานกลาง 3-5 วัน/สัปดาห์", value: 1.55 },
    { label: "ออกกำลังกายหนัก 6-7 วัน/สัปดาห์", value: 1.725 },
    { label: "ออกกำลังกายหนักมาก / งานกายภาพหนัก", value: 1.9 },
  ];

  const calculateTDEE = () => {
    if (!weight || !height || !age) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    let bmr = gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    const result = Math.round(bmr * activity);
    setTdee(result);

    // Trigger Confetti and button particles
    setShowConfetti(true);
    setShowButtonParticles(true);

    // Start card glow & pulse animation
    cardControls.start({
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 10px rgba(72,187,120,0.3)",
        "0 0 25px rgba(72,187,120,0.6)",
        "0 0 10px rgba(72,187,120,0.3)"
      ],
      transition: { duration: 1 }
    });

    setTimeout(() => setShowConfetti(false), 4000);
    setTimeout(() => setShowButtonParticles(false), 600);
  };

  const particleEmojis = ["💚", "✨", "🌿", "🌟", "🍀"];

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-green-50 via-lime-100 to-yellow-50 p-6 overflow-hidden relative font-sans">

      {/* Confetti */}
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />}

      <button
        type="button"
        className="mb-4 px-4 py-2 bg-gradient-to-r from-green-200 to-green-400 text-green-900 font-bold rounded-xl shadow hover:from-green-300 hover:to-green-500 transition-all self-start"
        onClick={() => typeof goToDashboard === 'function' && goToDashboard()}
      >
        ← ย้อนกลับไปแดชบอร์ด
      </button>
      <motion.h1 
        initial={{ y: -40, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-extrabold text-green-900 mb-10 text-center"
      >
        คำนวณ <span className="text-green-700">TDEE</span> ของคุณ
      </motion.h1>

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-lg w-full max-w-md flex flex-col gap-5 border border-green-200 relative"
      >

        <label className="block text-green-900 font-semibold mb-1" htmlFor="weight-input">น้ำหนัก (kg)</label>
        <input
          id="weight-input"
          type="number"
          placeholder="กรอกน้ำหนักของคุณ"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          className="border border-green-200 rounded-xl p-4 focus:ring-2 focus:ring-green-300 outline-none transition text-green-900 placeholder:text-green-700"
        />
        <label className="block text-green-900 font-semibold mb-1" htmlFor="height-input">ส่วนสูง (cm)</label>
        <input
          id="height-input"
          type="number"
          placeholder="กรอกส่วนสูงของคุณ"
          value={height}
          onChange={e => setHeight(e.target.value)}
          className="border border-green-200 rounded-xl p-4 focus:ring-2 focus:ring-green-300 outline-none transition text-green-900 placeholder:text-green-700"
        />
        <label className="block text-green-900 font-semibold mb-1" htmlFor="age-input">อายุ (ปี)</label>
        <input
          id="age-input"
          type="number"
          placeholder="กรอกอายุของคุณ"
          value={age}
          onChange={e => setAge(e.target.value)}
          className="border border-green-200 rounded-xl p-4 focus:ring-2 focus:ring-green-300 outline-none transition text-green-900 placeholder:text-green-700"
        />

        <label className="block text-green-900 font-semibold mb-1" htmlFor="gender-select">เพศ</label>
        <select
          id="gender-select"
          value={gender}
          onChange={e => setGender(e.target.value)}
          className="border border-green-200 rounded-xl p-4 focus:ring-2 focus:ring-green-300 outline-none transition text-green-900"
        >
          <option value="male">ชาย</option>
          <option value="female">หญิง</option>
        </select>

        <label className="block text-green-900 font-semibold mb-1" htmlFor="activity-select">กิจกรรมในชีวิตประจำวัน</label>
        <select
          id="activity-select"
          value={activity}
          onChange={e => setActivity(parseFloat(e.target.value))}
          className="border border-green-200 rounded-xl p-4 focus:ring-2 focus:ring-green-300 outline-none transition text-green-900"
        >
          {activityLevels.map(level => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>

        <motion.div className="relative">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={calculateTDEE}
            className="bg-white text-green-700 font-bold py-4 rounded-2xl shadow-md w-full border border-green-200 transition-colors relative z-10"
          >
            คำนวณ
          </motion.button>

          {/* Button Explosion Particles */}
          {showButtonParticles && particleEmojis.map((emoji, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              animate={{ 
                x: (Math.random() - 0.5) * 150,
                y: -Math.random() * 120,
                opacity: 0,
                scale: 0.5 + Math.random() * 0.5
              }}
              transition={{ duration: 0.6 }}
              className="absolute top-1/2 left-1/2 text-xl pointer-events-none"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {tdee && (
          <motion.div 
            animate={cardControls}
            className="mt-4 p-5 bg-gradient-to-r from-green-100 via-lime-200 to-yellow-100 rounded-xl text-center text-green-900 font-semibold text-xl shadow-inner border border-green-200"
          >
            🎯 ค่า TDEE ของคุณคือ: <span className="text-2xl font-bold">{tdee}</span> แคลอรี/วัน
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TDEECalculator;
