import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, RotateCcw, Wrench } from 'lucide-react'
import { moonFallPhases, survivalTools } from '../data/moonFallData'
import './MoonFallGame.css'

function MoonFallGame() {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showSurvival, setShowSurvival] = useState(false)
  const [selectedTools, setSelectedTools] = useState([])
  const [survivalChance, setSurvivalChance] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current
        const maxScroll = scrollHeight - clientHeight
        const progress = Math.min(scrollTop / maxScroll, 1)
        setScrollProgress(progress)

        // Calculate current phase based on scroll progress
        const phaseIndex = Math.floor(progress * (moonFallPhases.length - 1))
        setCurrentPhase(Math.min(phaseIndex, moonFallPhases.length - 1))
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const totalEffectiveness = selectedTools.reduce((sum, toolId) => {
      const tool = survivalTools.find(t => t.id === toolId)
      return sum + (tool ? tool.effectiveness : 0)
    }, 0)
    setSurvivalChance(Math.min(totalEffectiveness, 100))
  }, [selectedTools])

  const resetSimulation = () => {
    setCurrentPhase(0)
    setScrollProgress(0)
    setShowSurvival(false)
    setSelectedTools([])
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

  const toggleTool = (toolId) => {
    setSelectedTools(prev =>
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    )
  }

  const phase = moonFallPhases[currentPhase]

  return (
    <div className="moon-fall-game">
      {/* Fixed header */}
      <div className="moon-header">
        <div className="phase-info">
          <h2>{phase.title}</h2>
          <div className="phase-details">
            <span>Time Remaining: {phase.timeRemaining}</span>
            <span>Moon Distance: {phase.moonDistance}</span>
          </div>
        </div>
        <div className="controls">
          <button
            onClick={() => setShowSurvival(!showSurvival)}
            className="survival-button"
          >
            <Wrench size={20} />
            Survival Mode
          </button>
          <button onClick={resetSimulation} className="reset-button">
            <RotateCcw size={20} />
            Reset
          </button>
        </div>
      </div>

      {/* Instructions Banner */}
      <div className="instructions-banner">
        <p>📜 Scroll down to watch the Moon's catastrophic journey to Earth! Use Survival Mode to prepare for the disaster.</p>
      </div>

      {/* Progress indicator */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Main scrollable content */}
      <div
        ref={containerRef}
        className="moon-content"
        style={{ backgroundColor: phase.bgColor }}
      >
        {/* Sky with moon */}
        <div className="sky-container">
          <motion.div
            className="moon"
            style={{
              width: `${phase.moonSize}px`,
              height: `${phase.moonSize}px`
            }}
            animate={{
              scale: [1, 1.05, 1],
              rotate: scrollProgress * 360
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity },
              rotate: { duration: 0 }
            }}
          >
            🌙
          </motion.div>

          {/* Debris effect for later phases */}
          {currentPhase >= 5 && (
            <div className="debris">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="debris-piece"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: -50,
                    rotate: 0
                  }}
                  animate={{
                    y: window.innerHeight + 50,
                    rotate: 360
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                >
                  🌑
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Phase content */}
        <div className="phase-content">
          <motion.div
            className="phase-card"
            key={currentPhase}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>{phase.title}</h3>
            <p className="phase-description">{phase.description}</p>

            <div className="effects-section">
              <h4>Current Effects:</h4>
              <ul className="effects-list">
                {phase.effects.map((effect, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {effect}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="science-section">
              <h4>🔬 Science Fact:</h4>
              <p>{phase.scienceFact}</p>
            </div>

            <div className="humor-section">
              <h4>😄 Meanwhile on Earth:</h4>
              <p>{phase.humorNote}</p>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          {currentPhase < moonFallPhases.length - 1 && (
            <motion.div
              className="scroll-indicator"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown size={32} />
              <span>Scroll to continue the disaster</span>
            </motion.div>
          )}
        </div>

        {/* Create enough content to scroll through all phases */}
        <div style={{ height: `${moonFallPhases.length * 100}vh` }} />
      </div>

      {/* Survival mode overlay */}
      <AnimatePresence>
        {showSurvival && (
          <motion.div
            className="survival-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="survival-panel"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3>🛠️ Survival Tools</h3>
              <p>Choose your weapons against the falling Moon:</p>

              <div className="survival-chance">
                <div className="chance-bar">
                  <div
                    className="chance-fill"
                    style={{ width: `${survivalChance}%` }}
                  />
                </div>
                <span>Survival Chance: {survivalChance}%</span>
              </div>

              <div className="tools-grid">
                {survivalTools.map(tool => (
                  <div
                    key={tool.id}
                    className={`tool-card ${selectedTools.includes(tool.id) ? 'selected' : ''}`}
                    onClick={() => toggleTool(tool.id)}
                  >
                    <h4>{tool.name}</h4>
                    <p>{tool.description}</p>
                    <div className="tool-stats">
                      <span>Effectiveness: {tool.effectiveness}%</span>
                      <span>Cost: {tool.cost}</span>
                    </div>
                    <p className="tool-humor">{tool.humor}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowSurvival(false)}
                className="close-survival"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MoonFallGame
