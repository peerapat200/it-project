import { useState } from "react";

function BMICalculator({ goToDashboard }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    if (!weight || !height) return;
    const h = height / 100; // แปลง cm เป็น m
    const result = weight / (h * h);
    const roundedBMI = result.toFixed(2);
    setBmi(roundedBMI);

    // กำหนดเกณฑ์
    if (roundedBMI < 18.5) {
      setCategory("น้ำหนักต่ำกว่ามาตรฐาน");
    } else if (roundedBMI >= 18.5 && roundedBMI < 24.9) {
      setCategory("น้ำหนักปกติ");
    } else if (roundedBMI >= 25 && roundedBMI < 29.9) {
      setCategory("น้ำหนักเกิน");
    } else {
      setCategory("อ้วน");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-100 via-lime-50 to-yellow-50 py-12 px-2 relative overflow-hidden" style={{ fontFamily: 'Prompt, Kanit, sans-serif' }}>
      {/* Floating icons */}
      <div className="absolute top-10 left-20 text-5xl opacity-20 animate-bounce-slow">🥦</div>
      <div className="absolute top-1/2 right-32 text-4xl opacity-20 animate-bounce-slow2">🍅</div>
      <div className="absolute bottom-24 left-1/3 text-4xl opacity-20 animate-bounce-slow3">🥑</div>
      <div className="absolute bottom-10 right-1/4 text-5xl opacity-20 animate-bounce-slow">🍋</div>
      {/* Glow effect */}
      <div className="absolute w-96 h-96 bg-gradient-to-r from-green-300 via-lime-200 to-yellow-200 rounded-full opacity-20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center border-4 border-gradient-to-r from-green-400 to-lime-400 animate-fade-in">
        <button
          type="button"
          className="mb-4 px-4 py-2 bg-gradient-to-r from-green-200 to-green-400 text-green-900 font-bold rounded-xl shadow hover:from-green-300 hover:to-green-500 transition-all self-start"
          onClick={() => goToDashboard && goToDashboard()}
        >
          ← ย้อนกลับไปแดชบอร์ด
        </button>
        <div className="mb-6 flex flex-col items-center">
          <span className="text-6xl mb-2 animate-bounce">⚖️</span>
          <h2 className="text-4xl font-extrabold text-green-900 mb-2 drop-shadow animate-fade-in">BMI Calculator</h2>
          <p className="text-gray-600 text-base animate-fade-in">คำนวณดัชนีมวลกายของคุณเพื่อประเมินสุขภาพ</p>
        </div>
        <div className="flex flex-col gap-4 w-full mb-6">
          <label className="block text-green-900 font-semibold mb-1" htmlFor="weight-input">น้ำหนัก (kg)</label>
          <input
            id="weight-input"
            type="number"
            placeholder="กรอกน้ำหนักของคุณ"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border-2 border-green-300 focus:border-green-500 p-3 rounded-xl w-full text-lg shadow-md focus:outline-none transition-all bg-gradient-to-r from-green-50 to-lime-50 text-green-900 placeholder:text-green-700"
          />
          <label className="block text-green-900 font-semibold mb-1" htmlFor="height-input">ส่วนสูง (cm)</label>
          <input
            id="height-input"
            type="number"
            placeholder="กรอกส่วนสูงของคุณ"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border-2 border-green-300 focus:border-green-500 p-3 rounded-xl w-full text-lg shadow-md focus:outline-none transition-all bg-gradient-to-r from-green-50 to-lime-50 text-green-900 placeholder:text-green-700"
          />
        </div>
        <button
          onClick={calculateBMI}
          className="bg-gradient-to-r from-green-400 to-lime-400 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-110 hover:shadow-green-400/50 transition-all flex items-center gap-2 animate-fade-in"
        >
          <span className="mr-2 animate-bounce">🧮</span> คำนวณ
        </button>

        {bmi && (
          <div className="mt-8 w-full text-center animate-fade-in">
            <span className={`text-5xl mb-2 block animate-bounce ${bmi < 18.5 ? 'text-green-400' : bmi < 25 ? 'text-lime-500' : bmi < 30 ? 'text-orange-400' : 'text-red-500'}`}>{bmi < 18.5 ? '🍃' : bmi < 25 ? '💪' : bmi < 30 ? '🍔' : '⚠️'}</span>
            <p className="text-3xl font-bold text-green-700 mb-2 animate-fade-in">BMI ของคุณ: {bmi}</p>
            <p className="text-lg font-semibold text-gray-700 animate-fade-in">{category}</p>
            <div className="mt-4 flex justify-center gap-4">
              {bmi < 18.5 && <span className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-bold animate-fade-in">แนะนำ: เพิ่มน้ำหนัก</span>}
              {bmi >= 18.5 && bmi < 25 && <span className="px-4 py-2 rounded-xl bg-lime-100 text-lime-700 font-bold animate-fade-in">สุขภาพดี!</span>}
              {bmi >= 25 && bmi < 30 && <span className="px-4 py-2 rounded-xl bg-orange-100 text-orange-700 font-bold animate-fade-in">แนะนำ: ควบคุมน้ำหนัก</span>}
              {bmi >= 30 && <span className="px-4 py-2 rounded-xl bg-red-100 text-red-700 font-bold animate-fade-in">แนะนำ: ลดน้ำหนัก</span>}
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-20px);}
        }
        @keyframes bounce-slow2 {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-30px);}
        }
        @keyframes bounce-slow3 {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-15px);}
        }
        .animate-bounce-slow { animation: bounce-slow 5s infinite; }
        .animate-bounce-slow2 { animation: bounce-slow2 7s infinite; }
        .animate-bounce-slow3 { animation: bounce-slow3 6s infinite; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.8s both; }
        .animate-bounce { animation: bounce 1.2s infinite; }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export default BMICalculator;
