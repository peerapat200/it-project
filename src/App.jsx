import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import WelcomeBanner from './components/WelcomeBanner'
import HealthyFoods from './components/HealthyFoods'
import MealPlanner from './components/MealPlanner'
import Dashboard from './components/Dashboard'
import BMRCalculator from './pages/BMRCalculator'
import TDEECalculator from './pages/TDEECalculator'
import GoalPage from './pages/GoalPage'
import FoodDiary from './components/FoodDiary'
import RecommendedPlan from './components/RecommendedPlan'
import NutritionSummary from './components/NutritionSummary'
import AdminPanel from './components/AdminPanel'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <WelcomeBanner />
      case 'dashboard':
        return <Dashboard onSelect={handleDashboardSelect} />
      case 'foods':
        return <HealthyFoods />
      case 'meal-planner':
        return <MealPlanner />
      case 'food-diary':
        return <FoodDiary />
      case 'recommended-plan':
        return <RecommendedPlan />
      case 'nutrition-summary':
        return <NutritionSummary />
      case 'admin':
        return <AdminPanel />
      case 'bmr':
        return <BMRCalculator goToDashboard={() => setActiveTab('dashboard')} />
      case 'tdee':
        return <TDEECalculator goToDashboard={() => setActiveTab('dashboard')} />
      case 'goal':
        return <GoalPage />
      default:
        return <WelcomeBanner />
    }
  }

  function handleDashboardSelect(key) {
    setActiveTab(key)
  }

  return (
    <AuthProvider>
      <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 w-full flex items-start justify-center px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
          <div className="fade-in w-full max-w-8xl mx-auto">
            {renderContent()}
          </div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
