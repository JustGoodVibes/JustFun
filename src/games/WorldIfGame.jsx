import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, AlertTriangle, Info } from 'lucide-react'
import { worldEvents, visualEffects, chainReactionEvents } from '../data/worldIfData'
import './WorldIfGame.css'

function WorldIfGame() {
  const [activeEvents, setActiveEvents] = useState(new Set())
  const [chainReactions, setChainReactions] = useState(new Set())
  const [earthState, setEarthState] = useState({
    temperature: 15, // celsius
    seaLevel: 0, // meters above current
    population: 8000000000,
    atmosphere: 100, // percentage
    ecosystem: 100 // percentage
  })
  const [showInfo, setShowInfo] = useState(null)

  const toggleEvent = (eventId) => {
    const newActiveEvents = new Set(activeEvents)
    if (newActiveEvents.has(eventId)) {
      newActiveEvents.delete(eventId)
    } else {
      newActiveEvents.add(eventId)
    }
    setActiveEvents(newActiveEvents)
  }

  const resetWorld = () => {
    setActiveEvents(new Set())
    setChainReactions(new Set())
    setEarthState({
      temperature: 15,
      seaLevel: 0,
      population: 8000000000,
      atmosphere: 100,
      ecosystem: 100
    })
  }

  useEffect(() => {
    // Calculate combined effects
    let newState = {
      temperature: 15,
      seaLevel: 0,
      population: 8000000000,
      atmosphere: 100,
      ecosystem: 100
    }

    let newChainReactions = new Set()

    activeEvents.forEach(eventId => {
      const event = worldEvents.find(e => e.id === eventId)
      if (event) {
        // Apply effects
        Object.keys(event.effects).forEach(key => {
          if (key in newState) {
            newState[key] += event.effects[key]
          }
        })

        // Add chain reactions
        event.chainReactions.forEach(reaction => {
          newChainReactions.add(reaction)
        })
      }
    })

    // Ensure values stay within reasonable bounds
    newState.population = Math.max(0, newState.population)
    newState.atmosphere = Math.max(0, Math.min(200, newState.atmosphere))
    newState.ecosystem = Math.max(0, Math.min(100, newState.ecosystem))

    setEarthState(newState)
    setChainReactions(newChainReactions)
  }, [activeEvents])

  const formatNumber = (num) => {
    if (Math.abs(num) >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`
    if (Math.abs(num) >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (Math.abs(num) >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toFixed(1)
  }

  const getEarthVisualization = () => {
    const activeEffects = Array.from(activeEvents).map(eventId => {
      const event = worldEvents.find(e => e.id === eventId)
      return event ? visualEffects[event.visualEffect] : null
    }).filter(Boolean)

    return (
      <div className="earth-container">
        <motion.div
          className="earth"
          animate={{
            backgroundColor: activeEffects.length > 0 ? activeEffects[0].color : '#4ade80',
            scale: activeEvents.has('gravity_half') ? 1.2 : 1,
            rotate: activeEvents.has('time_stops') ? 0 : 360
          }}
          transition={{
            backgroundColor: { duration: 0.5 },
            scale: { duration: 0.8 },
            rotate: { duration: activeEvents.has('time_stops') ? 0 : 20, repeat: Infinity, ease: "linear" }
          }}
        >
          🌍
        </motion.div>

        {/* Visual effects overlay */}
        {activeEffects.map((effect, index) => (
          <motion.div
            key={index}
            className={`effect-overlay ${effect.animation}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            style={{ backgroundColor: effect.color }}
          />
        ))}

        {/* Floating effects */}
        {activeEvents.has('gravity_half') && (
          <div className="floating-objects">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-object"
                animate={{
                  y: [0, -50, 0],
                  x: [0, Math.random() * 20 - 10, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                {['🏠', '🚗', '🌳', '🐕', '👤'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <motion.div
      className="world-if-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="game-header">
        <h1>🌍 The World If...</h1>
        <p>Toggle events and watch Earth transform in real-time</p>
        <button onClick={resetWorld} className="reset-button">
          <RotateCcw size={20} />
          Reset World
        </button>
      </div>

      <div className="game-content">
        {/* Earth Visualization */}
        <div className="earth-section">
          {getEarthVisualization()}

          {/* Earth Stats */}
          <div className="earth-stats">
            <div className="stat">
              <span>Temperature:</span>
              <span className={earthState.temperature > 30 ? 'danger' : earthState.temperature < 0 ? 'cold' : 'normal'}>
                {earthState.temperature.toFixed(1)}°C
              </span>
            </div>
            <div className="stat">
              <span>Sea Level:</span>
              <span className={earthState.seaLevel > 10 ? 'danger' : 'normal'}>
                {earthState.seaLevel > 0 ? '+' : ''}{earthState.seaLevel.toFixed(1)}m
              </span>
            </div>
            <div className="stat">
              <span>Population:</span>
              <span className={earthState.population < 4000000000 ? 'danger' : 'normal'}>
                {formatNumber(earthState.population)}
              </span>
            </div>
            <div className="stat">
              <span>Atmosphere:</span>
              <span className={earthState.atmosphere < 50 ? 'danger' : 'normal'}>
                {earthState.atmosphere.toFixed(0)}%
              </span>
            </div>
            <div className="stat">
              <span>Ecosystem:</span>
              <span className={earthState.ecosystem < 50 ? 'danger' : 'normal'}>
                {earthState.ecosystem.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Events Toggle Board */}
        <div className="events-section">
          <h2>Event Toggle Board</h2>
          <div className="events-grid">
            {worldEvents.map(event => (
              <motion.div
                key={event.id}
                className={`event-card ${activeEvents.has(event.id) ? 'active' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="event-header">
                  <span className="event-icon">{event.icon}</span>
                  <h3>{event.name}</h3>
                  <button
                    onClick={() => setShowInfo(showInfo === event.id ? null : event.id)}
                    className="info-btn"
                  >
                    <Info size={16} />
                  </button>
                </div>

                <p className="event-description">{event.description}</p>

                <button
                  onClick={() => toggleEvent(event.id)}
                  className={`toggle-btn ${activeEvents.has(event.id) ? 'active' : ''}`}
                >
                  {activeEvents.has(event.id) ? 'ACTIVE' : 'ACTIVATE'}
                </button>

                <AnimatePresence>
                  {showInfo === event.id && (
                    <motion.div
                      className="event-info"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="science-fact">
                        <strong>Science Fact:</strong>
                        <p>{event.scienceFact}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chain Reactions */}
        {chainReactions.size > 0 && (
          <motion.div
            className="chain-reactions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>
              <AlertTriangle size={20} />
              Chain Reactions Triggered
            </h3>
            <div className="reactions-list">
              {Array.from(chainReactions).map(reactionId => {
                const reaction = chainReactionEvents[reactionId]
                return reaction ? (
                  <div key={reactionId} className="reaction-item">
                    <strong>{reaction.name}</strong>
                    <p>{reaction.description}</p>
                  </div>
                ) : null
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default WorldIfGame
