import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const particlesData = Array.from({ length: 30 }, (_, i) => ({
  icon: ["🍃","🥑","🥦","🍏","🥗","🌰","🥜"][i % 7],
  size: 20 + Math.floor(Math.random() * 30),
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 5
}));

const Dashboard = ({ onSelect }) => {
  const [particles, setParticles] = useState(particlesData);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        top: (parseFloat(p.top) + 0.2) % 100
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-screen min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-tr from-green-200 via-lime-100 to-yellow-50"
      style={{ fontFamily: 'Prompt, Kanit, sans-serif' }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[url('/plant.jpg')] bg-cover bg-center opacity-30 animate-pulse"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent)]"></div>

      {/* Particles */}
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: p.size,
            zIndex: 0,
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4 + Math.random() * 4, delay: p.delay }}
        >
          {p.icon}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col gap-12 pt-20 pb-20">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-green-900 text-center mb-12 drop-shadow-2xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          แดชบอร์ดโภชนาการ
        </motion.h1>

        <div className="flex flex-col gap-8">
          {[
            { key: 'bmr', label: 'คำนวณ BMR (Basal Metabolic Rate)', icon: '🧮' },
            { key: 'tdee', label: 'คำนวณ TDEE', icon: '🔥' },
            { key: 'goal', label: 'เป้าหมายพลังงานต่อวัน', icon: '🎯' },
          ].map((btn) => (
              <motion.button
                key={btn.key}
                className="bg-gradient-to-r from-green-100 via-green-200 to-green-300 border border-green-200 text-green-900 font-bold text-xl rounded-3xl py-5 px-8 shadow-2xl transition-all flex items-center justify-center gap-4 hover:from-green-200 hover:to-green-400 hover:text-green-800 hover:scale-105 hover:rotate-1 hover:shadow-emerald-400/60"
                onClick={() => onSelect && onSelect(btn.key)}
                whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0], transition: { duration: 0.5 } }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-3xl">{btn.icon}</span>
                {btn.label}
              </motion.button>
          ))}
        </div>
      </div>

      {/* Floating Glowing Circles */}
      <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-green-300 opacity-30 blur-3xl animate-ping-slow"></div>
      <div className="absolute -bottom-20 -right-10 w-96 h-96 rounded-full bg-yellow-300 opacity-20 blur-3xl animate-ping-slower"></div>
    </div>
  );
};

export default Dashboard;
