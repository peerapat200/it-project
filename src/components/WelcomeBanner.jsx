import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const createParticles = () =>
  Array.from({ length: 40 }, (_, i) => ({
    icon: ["🍃", "🥑", "🥦", "🍏", "🥗", "🌰", "🥜"][i % 7],
    size: 20 + Math.random() * 30,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: 6 + Math.random() * 6,
    delay: Math.random() * 5,
  }));

const featureCards = [
  {
    icon: "🧮",
    title: "การคำนวณที่แม่นยำ",
    desc: "อัลกอริทึมขั้นสูงสำหรับการคำนวณ BMR และ TDEE พร้อมการวิเคราะห์โภชนาการเฉพาะบุคคล",
  },
  {
    icon: "🍏",
    title: "ฐานข้อมูลอาหารอัจฉริยะ",
    desc: "ฐานข้อมูลโภชนาการครบถ้วน ระบบจดจำอาหารด้วย AI และการวิเคราะห์สารอาหารหลัก",
  },
  {
    icon: "🥗",
    title: "การวางแผนแบบปรับตัว",
    desc: "ระบบวางแผนอาหารอัจฉริยะ ปรับแต่งโภชนาการตามช่วงวัยและความต้องการเฉพาะ",
  },
];

const WelcomeBanner = () => {
  const [particles, setParticles] = useState(createParticles());
  const [confetti, setConfetti] = useState([]);

  // Particle ลอย
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          top: (p.top + 0.15) % 100,
          left: (p.left + (Math.random() - 0.5) * 0.1) % 100,
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Trigger confetti
  const triggerConfetti = (cardIndex) => {
    const colors = ["#A7F3D0", "#86EFAC", "#FACC15", "#FBBF24", "#34D399"];
    const newConfetti = Array.from({ length: 20 }, () => ({
      id: Math.random(),
      color: colors[Math.floor(Math.random() * colors.length)],
      x: 0,
      y: 0,
      rotate: Math.random() * 360,
      size: 8 + Math.random() * 8,
      duration: 1 + Math.random(),
    }));
    setConfetti((prev) => [...prev, ...newConfetti]);

    // ลบ confetti หลัง animation
    setTimeout(() => {
      setConfetti((prev) => prev.slice(newConfetti.length));
    }, 1500);
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center items-center"
      style={{ fontFamily: "Prompt, Kanit, sans-serif" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-green-200 via-lime-100 to-yellow-50 animate-pulse-slow"></div>
  <div className="absolute inset-0 w-full h-full bg-[url('/plant.jpg')] bg-cover bg-center opacity-30 animate-fade-in"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.3),_transparent)]"></div>

      {/* Glow shapes */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-green-300 via-lime-200 to-yellow-200 rounded-full opacity-20 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 20, -20, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-gradient-to-tr from-green-200 to-yellow-100 rounded-full opacity-30 blur-2xl top-20 left-1/4"
        animate={{ y: [0, 20, 0], x: [0, -10, 10, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-80 h-80 bg-gradient-to-b from-lime-200 to-green-300 rounded-full opacity-15 blur-3xl top-1/2 left-2/3"
        animate={{ y: [0, -25, 0], x: [0, 15, -15, 0] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none opacity-25"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
          }}
          animate={{ y: [0, -40, 0], rotate: [0, 15, -15, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          {p.icon}
        </motion.div>
      ))}

      {/* Confetti */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full"
          style={{
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            top: "50%",
            left: "50%",
          }}
          initial={{ y: 0, x: 0, rotate: c.rotate, opacity: 1 }}
          animate={{
            y: -100 - Math.random() * 100,
            x: -50 + Math.random() * 100,
            rotate: c.rotate + 720,
            opacity: 0,
          }}
          transition={{ duration: c.duration }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-[90rem] px-4 sm:px-6 md:px-12 flex flex-col items-center">
        {/* Title */}
        <motion.div
          className="text-center mt-24 mb-12"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-700 via-lime-600 to-yellow-500 animate-text-shimmer">
            ยินดีต้อนรับสู่
          </motion.h1>
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mt-4 text-green-900 drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            ระบบโภชนาการสำหรับทุกเพศทุกวัย
          </motion.h2>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 mb-20 w-full">
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              className="rounded-3xl shadow-2xl flex flex-col items-center border border-green-100 bg-white/80 backdrop-blur-md p-8 text-black overflow-hidden relative cursor-pointer"
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.3 }}
              whileHover={{
                y: -25,
                scale: 1.08,
                rotate: [0, 2, -2, 0],
                boxShadow: "0 40px 70px rgba(34,79,30,0.35)",
              }}
              onClick={() => triggerConfetti(i)}
            >
              <div className="w-full text-center font-bold text-2xl mb-4 flex items-center justify-center gap-3">
                <span className="text-5xl">{card.icon}</span> {card.title}
              </div>
              <p className="text-center text-base leading-relaxed">
                {card.desc}
              </p>
              <span className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-yellow-100/20 opacity-0 hover:opacity-50 transition-all rounded-3xl"></span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
