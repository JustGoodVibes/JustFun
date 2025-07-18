import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomePage from './pages/HomePage'
import GameLayout from './components/GameLayout'
import SpendBillionGame from './games/SpendBillionGame'
import MoonFallGame from './games/MoonFallGame'
import TimeShoppingGame from './games/TimeShoppingGame'
import HumanStackGame from './games/HumanStackGame'
import WorldIfGame from './games/WorldIfGame'
import InternetPastGame from './games/InternetPastGame'
import PlanetBuilderGame from './games/PlanetBuilderGame'
import PopulationPyramidGame from './games/PopulationPyramidGame'
import PeriodicTableGame from './games/PeriodicTableGame'
import TimelineTravelerGame from './games/TimelineTravelerGame'
import ScaleUniverseGame from './games/ScaleUniverseGame'
import './App.css'

function App() {
  return (
    <Router basename="/JustFun">
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spend-billion" element={
            <GameLayout title="Spend a Billion Like a Pharaoh">
              <SpendBillionGame />
            </GameLayout>
          } />
          <Route path="/moon-fall" element={
            <GameLayout title="What If the Moon Fell?">
              <MoonFallGame />
            </GameLayout>
          } />
          <Route path="/time-shopping" element={
            <GameLayout title="Time Travel Shopping Mall">
              <TimeShoppingGame />
            </GameLayout>
          } />
          <Route path="/human-stack" element={
            <GameLayout title="Human Stack">
              <HumanStackGame />
            </GameLayout>
          } />
          <Route path="/world-if" element={
            <GameLayout title="The World If...">
              <WorldIfGame />
            </GameLayout>
          } />
          <Route path="/internet-past" element={
            <GameLayout title="Internet of the Past">
              <InternetPastGame />
            </GameLayout>
          } />
          <Route path="/planet-builder" element={
            <GameLayout title="Planet Builder">
              <PlanetBuilderGame />
            </GameLayout>
          } />
          <Route path="/population-pyramid" element={
            <GameLayout title="Population Pyramid Builder">
              <PopulationPyramidGame />
            </GameLayout>
          } />
          <Route path="/periodic-table" element={
            <GameLayout title="Periodic Table Playground">
              <PeriodicTableGame />
            </GameLayout>
          } />
          <Route path="/timeline-traveler" element={
            <GameLayout title="Timeline Traveler">
              <TimelineTravelerGame />
            </GameLayout>
          } />
          <Route path="/scale-universe" element={
            <GameLayout title="Scale of the Universe Explorer">
              <ScaleUniverseGame />
            </GameLayout>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
