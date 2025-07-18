import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, RotateCcw, Info, X } from 'lucide-react'
import './ScaleUniverseGame.css'

const scaleObjects = [
  { id: 'planck', name: 'Planck Length', size: 1e-35, unit: 'm', description: 'The smallest meaningful length in physics', icon: '⚛️', category: 'quantum' },
  { id: 'proton', name: 'Proton', size: 1e-15, unit: 'm', description: 'Subatomic particle in atomic nuclei', icon: '🔴', category: 'atomic' },
  { id: 'atom', name: 'Hydrogen Atom', size: 1e-10, unit: 'm', description: 'The smallest and most abundant atom', icon: '⚛️', category: 'atomic' },
  { id: 'virus', name: 'Virus', size: 1e-7, unit: 'm', description: 'Microscopic infectious agent', icon: '🦠', category: 'biological' },
  { id: 'bacteria', name: 'Bacteria', size: 1e-6, unit: 'm', description: 'Single-celled microorganism', icon: '🧫', category: 'biological' },
  { id: 'cell', name: 'Human Cell', size: 1e-5, unit: 'm', description: 'Basic unit of life', icon: '🔬', category: 'biological' },
  { id: 'ant', name: 'Ant', size: 1e-3, unit: 'm', description: 'Small social insect', icon: '🐜', category: 'biological' },
  { id: 'coin', name: 'Coin', size: 2e-2, unit: 'm', description: 'Standard currency piece', icon: '🪙', category: 'everyday' },
  { id: 'human', name: 'Human', size: 1.7, unit: 'm', description: 'Average human height', icon: '🧍', category: 'biological' },
  { id: 'car', name: 'Car', size: 4, unit: 'm', description: 'Typical passenger vehicle', icon: '🚗', category: 'everyday' },
  { id: 'house', name: 'House', size: 10, unit: 'm', description: 'Average residential building', icon: '🏠', category: 'everyday' },
  { id: 'football', name: 'Football Field', size: 100, unit: 'm', description: 'American football field length', icon: '🏈', category: 'everyday' },
  { id: 'skyscraper', name: 'Skyscraper', size: 400, unit: 'm', description: 'Tall urban building', icon: '🏢', category: 'human-made' },
  { id: 'mountain', name: 'Mount Everest', size: 8849, unit: 'm', description: 'Highest mountain on Earth', icon: '🏔️', category: 'geographical' },
  { id: 'city', name: 'Large City', size: 50000, unit: 'm', description: 'Major metropolitan area', icon: '🏙️', category: 'geographical' },
  { id: 'earth', name: 'Earth', size: 1.27e7, unit: 'm', description: 'Our home planet', icon: '🌍', category: 'astronomical' },
  { id: 'moon', name: 'Moon', size: 3.84e8, unit: 'm', description: 'Distance to Earth\'s moon', icon: '🌙', category: 'astronomical' },
  { id: 'sun', name: 'Sun', size: 1.39e9, unit: 'm', description: 'Our star\'s diameter', icon: '☀️', category: 'astronomical' },
  { id: 'solar-system', name: 'Solar System', size: 1e13, unit: 'm', description: 'Our planetary system', icon: '🪐', category: 'astronomical' },
  { id: 'light-year', name: 'Light Year', size: 9.46e15, unit: 'm', description: 'Distance light travels in one year', icon: '✨', category: 'astronomical' },
  { id: 'galaxy', name: 'Milky Way', size: 9.46e20, unit: 'm', description: 'Our galaxy\'s diameter', icon: '🌌', category: 'cosmic' },
  { id: 'universe', name: 'Observable Universe', size: 8.8e26, unit: 'm', description: 'The edge of what we can see', icon: '🌌', category: 'cosmic' }
]

function ScaleUniverseGame() {
  const [currentScale, setCurrentScale] = useState(0) // Index in scaleObjects
  const [selectedObject, setSelectedObject] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const containerRef = useRef(null)

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 1 : -1
    const newScale = Math.max(0, Math.min(scaleObjects.length - 1, currentScale + delta))
    setCurrentScale(newScale)
  }

  const handleZoomIn = () => {
    const newScale = Math.min(scaleObjects.length - 1, currentScale + 1)
    setCurrentScale(newScale)
  }

  const handleZoomOut = () => {
    const newScale = Math.max(0, currentScale - 1)
    setCurrentScale(newScale)
  }

  const resetToHuman = () => {
    const humanIndex = scaleObjects.findIndex(obj => obj.id === 'human')
    setCurrentScale(humanIndex)
    setSelectedObject(null)
  }

  const formatSize = (size, unit) => {
    if (size >= 1e24) return `${(size / 1e24).toFixed(2)} Ym`
    if (size >= 1e21) return `${(size / 1e21).toFixed(2)} Zm`
    if (size >= 1e18) return `${(size / 1e18).toFixed(2)} Em`
    if (size >= 1e15) return `${(size / 1e15).toFixed(2)} Pm`
    if (size >= 1e12) return `${(size / 1e12).toFixed(2)} Tm`
    if (size >= 1e9) return `${(size / 1e9).toFixed(2)} Gm`
    if (size >= 1e6) return `${(size / 1e6).toFixed(2)} Mm`
    if (size >= 1e3) return `${(size / 1e3).toFixed(2)} km`
    if (size >= 1) return `${size.toFixed(2)} m`
    if (size >= 1e-3) return `${(size * 1e3).toFixed(2)} mm`
    if (size >= 1e-6) return `${(size * 1e6).toFixed(2)} μm`
    if (size >= 1e-9) return `${(size * 1e9).toFixed(2)} nm`
    if (size >= 1e-12) return `${(size * 1e12).toFixed(2)} pm`
    return `${size.toExponential(2)} ${unit}`
  }

  const getVisibleObjects = () => {
    const current = scaleObjects[currentScale]
    const range = 3 // Show objects within 3 scales
    return scaleObjects.filter((obj, index) =>
      Math.abs(index - currentScale) <= range
    )
  }

  const getObjectScale = (obj) => {
    const current = scaleObjects[currentScale]
    const ratio = obj.size / current.size
    return Math.max(0.1, Math.min(10, ratio))
  }

  const currentObject = scaleObjects[currentScale]
  const visibleObjects = getVisibleObjects()

  return (
    <motion.div
      className="scale-universe-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onWheel={handleWheel}
      ref={containerRef}
    >
      {/* Header */}
      <div className="game-header">
        <h1>🔭 Scale of the Universe Explorer</h1>
        <p>Journey from the quantum realm to the cosmic scale</p>
      </div>

      {/* Controls */}
      <div className="controls-panel">
        <div className="zoom-controls">
          <button onClick={handleZoomOut} disabled={currentScale === 0}>
            <ZoomOut size={20} />
            Zoom Out
          </button>
          <button onClick={resetToHuman}>
            <RotateCcw size={20} />
            Reset to Human
          </button>
          <button onClick={handleZoomIn} disabled={currentScale === scaleObjects.length - 1}>
            <ZoomIn size={20} />
            Zoom In
          </button>
        </div>

        <div className="scale-info">
          <h3>Current Scale: {formatSize(currentObject.size, currentObject.unit)}</h3>
          <p>Use mouse wheel or buttons to zoom in/out</p>
        </div>
      </div>

      {/* Scale Visualization */}
      <div className="scale-container">
        <div className="scale-background">
          {/* Grid lines for reference */}
          <div className="grid-lines">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="grid-line" style={{
                left: `${i * 5}%`,
                opacity: 0.1
              }} />
            ))}
            {[...Array(20)].map((_, i) => (
              <div key={i} className="grid-line horizontal" style={{
                top: `${i * 5}%`,
                opacity: 0.1
              }} />
            ))}
          </div>

          {/* Scale objects */}
          <div className="objects-container">
            {visibleObjects.map((obj, index) => {
              const scale = getObjectScale(obj)
              const isCenter = obj === currentObject

              return (
                <motion.div
                  key={obj.id}
                  className={`scale-object ${obj.category} ${isCenter ? 'center' : ''}`}
                  style={{
                    transform: `scale(${scale})`,
                    left: `${20 + index * 15}%`,
                    top: `${40 + Math.sin(index) * 20}%`
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: isCenter ? 1 : 0.6, scale }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: scale * 1.2, zIndex: 10 }}
                  onClick={() => setSelectedObject(obj)}
                >
                  <div className="object-icon">{obj.icon}</div>
                  <div className="object-label">
                    <div className="object-name">{obj.name}</div>
                    <div className="object-size">{formatSize(obj.size, obj.unit)}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Center indicator */}
          <div className="center-indicator">
            <div className="crosshair-h" />
            <div className="crosshair-v" />
          </div>
        </div>
      </div>

      {/* Scale Slider */}
      <div className="scale-slider-container">
        <div className="scale-slider">
          <input
            type="range"
            min="0"
            max={scaleObjects.length - 1}
            value={currentScale}
            onChange={(e) => setCurrentScale(parseInt(e.target.value))}
            className="slider"
          />
          <div className="slider-labels">
            <span>Quantum</span>
            <span>Atomic</span>
            <span>Biological</span>
            <span>Human</span>
            <span>Geographical</span>
            <span>Astronomical</span>
            <span>Cosmic</span>
          </div>
        </div>
      </div>

      {/* Object Details Modal */}
      <AnimatePresence>
        {selectedObject && (
          <motion.div
            className="object-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedObject(null)}
          >
            <motion.div
              className="object-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedObject(null)}
              >
                <X size={20} />
              </button>

              <div className="modal-header">
                <div className="modal-icon">{selectedObject.icon}</div>
                <div>
                  <h2>{selectedObject.name}</h2>
                  <p className="modal-size">{formatSize(selectedObject.size, selectedObject.unit)}</p>
                </div>
              </div>

              <div className="modal-content">
                <p className="modal-description">{selectedObject.description}</p>
                <div className={`modal-category ${selectedObject.category}`}>
                  {selectedObject.category.replace('-', ' ')}
                </div>

                <div className="comparison">
                  <h4>Scale Comparison:</h4>
                  <p>
                    {selectedObject.size > currentObject.size
                      ? `${(selectedObject.size / currentObject.size).toExponential(2)} times larger than ${currentObject.name}`
                      : selectedObject.size < currentObject.size
                      ? `${(currentObject.size / selectedObject.size).toExponential(2)} times smaller than ${currentObject.name}`
                      : `Same size as ${currentObject.name}`
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <div className="instructions">
        <div className="instruction-item">
          <span>🖱️ Mouse Wheel:</span>
          <span>Zoom in/out through scales</span>
        </div>
        <div className="instruction-item">
          <span>🖱️ Click Objects:</span>
          <span>View detailed information</span>
        </div>
        <div className="instruction-item">
          <span>🎯 Current Focus:</span>
          <span>{currentObject.name}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ScaleUniverseGame
