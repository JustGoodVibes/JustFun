import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Zap, Play, Pause } from 'lucide-react'
import './PlanetBuilderGame.css'

const planetFeatures = [
  { id: 'ocean', name: 'Ocean', icon: '🌊', temp: -5, oxygen: +10, life: +20 },
  { id: 'forest', name: 'Forest', icon: '🌲', temp: -2, oxygen: +15, life: +25 },
  { id: 'desert', name: 'Desert', icon: '🏜️', temp: +8, oxygen: -2, life: -5 },
  { id: 'mountain', name: 'Mountain', icon: '⛰️', temp: -3, oxygen: +5, life: +5 },
  { id: 'volcano', name: 'Volcano', icon: '🌋', temp: +15, oxygen: -10, life: -15 },
  { id: 'ice', name: 'Ice Cap', icon: '🧊', temp: -10, oxygen: +2, life: -10 },
  { id: 'city', name: 'City', icon: '🏙️', temp: +3, oxygen: -8, life: +10 },
  { id: 'farm', name: 'Farmland', icon: '🌾', temp: 0, oxygen: +5, life: +15 }
]

const disasters = [
  { id: 'meteor', name: 'Meteor Strike', icon: '☄️', temp: +20, life: -30 },
  { id: 'ice_age', name: 'Ice Age', icon: '❄️', temp: -25, life: -20 },
  { id: 'solar_flare', name: 'Solar Flare', icon: '☀️', temp: +30, life: -25 },
  { id: 'plague', name: 'Plague', icon: '🦠', temp: 0, life: -40 }
]

function PlanetBuilderGame() {
  const [planetGrid, setPlanetGrid] = useState(Array(64).fill(null))
  const [planetStats, setPlanetStats] = useState({
    temperature: 15,
    oxygen: 21,
    lifeSupport: 50,
    population: 1000000
  })
  const [selectedFeature, setSelectedFeature] = useState(planetFeatures[0])
  const [isSimulating, setIsSimulating] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [mode, setMode] = useState('sandbox')

  useEffect(() => {
    calculatePlanetStats()
  }, [planetGrid])

  useEffect(() => {
    let interval
    if (isSimulating) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
        // Random events
        if (Math.random() < 0.1) {
          triggerRandomEvent()
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isSimulating])

  const calculatePlanetStats = () => {
    let tempChange = 0
    let oxygenChange = 0
    let lifeChange = 0

    planetGrid.forEach(feature => {
      if (feature) {
        tempChange += feature.temp
        oxygenChange += feature.oxygen
        lifeChange += feature.life
      }
    })

    setPlanetStats(prev => ({
      temperature: Math.max(-50, Math.min(100, 15 + tempChange)),
      oxygen: Math.max(0, Math.min(50, 21 + oxygenChange)),
      lifeSupport: Math.max(0, Math.min(100, 50 + lifeChange)),
      population: Math.max(0, prev.population * (1 + lifeChange / 1000))
    }))
  }

  const placeTile = (index) => {
    const newGrid = [...planetGrid]
    newGrid[index] = selectedFeature
    setPlanetGrid(newGrid)
  }

  const clearPlanet = () => {
    setPlanetGrid(Array(64).fill(null))
    setPlanetStats({
      temperature: 15,
      oxygen: 21,
      lifeSupport: 50,
      population: 1000000
    })
    setTimeElapsed(0)
  }

  const triggerRandomEvent = () => {
    const disaster = disasters[Math.floor(Math.random() * disasters.length)]
    setPlanetStats(prev => ({
      ...prev,
      temperature: Math.max(-50, Math.min(100, prev.temperature + disaster.temp)),
      lifeSupport: Math.max(0, Math.min(100, prev.lifeSupport + disaster.life))
    }))
  }

  const triggerDisaster = (disaster) => {
    setPlanetStats(prev => ({
      ...prev,
      temperature: Math.max(-50, Math.min(100, prev.temperature + disaster.temp)),
      lifeSupport: Math.max(0, Math.min(100, prev.lifeSupport + disaster.life))
    }))
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return Math.round(num).toString()
  }

  const getLifeStatus = () => {
    if (planetStats.lifeSupport > 80) return { status: 'Thriving', color: '#22c55e' }
    if (planetStats.lifeSupport > 60) return { status: 'Stable', color: '#eab308' }
    if (planetStats.lifeSupport > 40) return { status: 'Struggling', color: '#f97316' }
    if (planetStats.lifeSupport > 20) return { status: 'Dying', color: '#dc2626' }
    return { status: 'Extinct', color: '#7f1d1d' }
  }

  const lifeStatus = getLifeStatus()

  return (
    <motion.div
      className="planet-builder-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="game-header">
        <h1>🪐 Planet Builder</h1>
        <div className="mode-selector">
          <button
            className={mode === 'sandbox' ? 'active' : ''}
            onClick={() => setMode('sandbox')}
          >
            Sandbox
          </button>
          <button
            className={mode === 'challenge' ? 'active' : ''}
            onClick={() => setMode('challenge')}
          >
            Challenge
          </button>
        </div>
        <div className="simulation-controls">
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className="sim-button"
          >
            {isSimulating ? <Pause size={16} /> : <Play size={16} />}
            {isSimulating ? 'Pause' : 'Start'} Simulation
          </button>
          <span className="time-display">Time: {timeElapsed}s</span>
        </div>
      </div>

      <div className="game-content">
        {/* Planet Stats */}
        <div className="stats-panel">
          <h3>Planet Status</h3>
          <div className="stat">
            <span>Temperature:</span>
            <span className={planetStats.temperature > 40 || planetStats.temperature < -10 ? 'danger' : 'normal'}>
              {planetStats.temperature.toFixed(1)}°C
            </span>
          </div>
          <div className="stat">
            <span>Oxygen:</span>
            <span className={planetStats.oxygen < 10 ? 'danger' : 'normal'}>
              {planetStats.oxygen.toFixed(1)}%
            </span>
          </div>
          <div className="stat">
            <span>Life Support:</span>
            <span style={{ color: lifeStatus.color }}>
              {planetStats.lifeSupport.toFixed(0)}% ({lifeStatus.status})
            </span>
          </div>
          <div className="stat">
            <span>Population:</span>
            <span>{formatNumber(planetStats.population)}</span>
          </div>

          {mode === 'challenge' && (
            <div className="challenge-goal">
              <h4>Goal: Keep life above 60% for 60 seconds</h4>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${Math.min(100, (timeElapsed / 60) * 100)}%`,
                    backgroundColor: planetStats.lifeSupport > 60 ? '#22c55e' : '#dc2626'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Planet Grid */}
        <div className="planet-section">
          <div className="planet-grid">
            {planetGrid.map((tile, index) => (
              <div
                key={index}
                className={`planet-tile ${tile ? 'filled' : 'empty'}`}
                onClick={() => placeTile(index)}
              >
                {tile && <span className="tile-icon">{tile.icon}</span>}
              </div>
            ))}
          </div>
          <button onClick={clearPlanet} className="clear-button">
            <RotateCcw size={16} />
            Clear Planet
          </button>
        </div>

        {/* Tools Panel */}
        <div className="tools-panel">
          <h3>Planet Features</h3>
          <div className="features-grid">
            {planetFeatures.map(feature => (
              <button
                key={feature.id}
                className={`feature-btn ${selectedFeature.id === feature.id ? 'active' : ''}`}
                onClick={() => setSelectedFeature(feature)}
              >
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-name">{feature.name}</span>
                <div className="feature-effects">
                  {feature.temp !== 0 && <span>🌡️{feature.temp > 0 ? '+' : ''}{feature.temp}</span>}
                  {feature.oxygen !== 0 && <span>💨{feature.oxygen > 0 ? '+' : ''}{feature.oxygen}</span>}
                  {feature.life !== 0 && <span>🧬{feature.life > 0 ? '+' : ''}{feature.life}</span>}
                </div>
              </button>
            ))}
          </div>

          <h3>Disasters</h3>
          <div className="disasters-grid">
            {disasters.map(disaster => (
              <button
                key={disaster.id}
                className="disaster-btn"
                onClick={() => triggerDisaster(disaster)}
              >
                <span className="disaster-icon">{disaster.icon}</span>
                <span className="disaster-name">{disaster.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PlanetBuilderGame
