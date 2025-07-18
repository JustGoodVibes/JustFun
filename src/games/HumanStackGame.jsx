import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, Zap, Eye } from 'lucide-react'
import { stackableObjects, referencePoints, stackCounts, humorousMessages, modes } from '../data/humanStackData'
import './HumanStackGame.css'

function HumanStackGame() {
  const [selectedObject, setSelectedObject] = useState(stackableObjects[0])
  const [selectedCount, setSelectedCount] = useState(stackCounts[0])
  const [selectedMode, setSelectedMode] = useState(modes[0])
  const [totalHeight, setTotalHeight] = useState(0)
  const [isStacking, setIsStacking] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [visibleReferences, setVisibleReferences] = useState([])
  const [zoomLevel, setZoomLevel] = useState(1)
  const stackRef = useRef(null)

  const calculateHeight = () => {
    return selectedObject.height * selectedCount.value
  }

  const formatHeight = (height) => {
    if (height >= 1000000) return `${(height / 1000000).toFixed(2)} million meters`
    if (height >= 1000) return `${(height / 1000).toFixed(2)} km`
    return `${height.toFixed(2)} meters`
  }

  const startStacking = () => {
    setIsStacking(true)
    const newHeight = calculateHeight()

    // Animate height increase
    let currentHeight = 0
    const increment = newHeight / 50
    const interval = setInterval(() => {
      currentHeight += increment
      if (currentHeight >= newHeight) {
        currentHeight = newHeight
        clearInterval(interval)
        setIsStacking(false)
      }
      setTotalHeight(currentHeight)
    }, 50)

    // Update zoom level based on height
    if (newHeight > 10000) setZoomLevel(0.1)
    else if (newHeight > 1000) setZoomLevel(0.3)
    else if (newHeight > 100) setZoomLevel(0.5)
    else setZoomLevel(1)

    // Find humorous message
    const message = humorousMessages
      .filter(msg => newHeight >= msg.height)
      .pop()
    if (message) setCurrentMessage(message.message)

    // Update visible references
    const visible = referencePoints.filter(ref =>
      ref.height <= newHeight * 1.2 && ref.height >= newHeight * 0.1
    )
    setVisibleReferences(visible)
  }

  const resetStack = () => {
    setTotalHeight(0)
    setCurrentMessage('')
    setVisibleReferences([])
    setZoomLevel(1)
    setIsStacking(false)
  }

  const getStackVisualization = () => {
    if (totalHeight === 0) return null

    const stackHeight = Math.min(totalHeight * 10, 500) // Scale for display
    const objectsToShow = Math.min(selectedCount.value, 20) // Limit visual objects

    return (
      <div className="stack-visualization" style={{ height: `${stackHeight}px` }}>
        {[...Array(objectsToShow)].map((_, index) => (
          <motion.div
            key={index}
            className="stack-object"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{
              bottom: `${(index / objectsToShow) * stackHeight}px`,
              color: selectedObject.color
            }}
          >
            {selectedObject.icon}
          </motion.div>
        ))}

        {selectedCount.value > 20 && (
          <div className="stack-overflow">
            <span>... and {(selectedCount.value - 20).toLocaleString()} more!</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <motion.div
      className="human-stack-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Controls Panel */}
      <div className="controls-panel">
        <div className="control-section">
          <h3>Choose Object</h3>
          <div className="object-grid">
            {stackableObjects.map(obj => (
              <button
                key={obj.id}
                className={`object-btn ${selectedObject.id === obj.id ? 'active' : ''}`}
                onClick={() => setSelectedObject(obj)}
                style={{ borderColor: obj.color }}
              >
                <span className="object-icon">{obj.icon}</span>
                <span className="object-name">{obj.name}</span>
                <span className="object-height">{obj.height}m each</span>
              </button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h3>Stack Count</h3>
          <div className="count-grid">
            {stackCounts.map(count => (
              <button
                key={count.value}
                className={`count-btn ${selectedCount.value === count.value ? 'active' : ''}`}
                onClick={() => setSelectedCount(count)}
              >
                {count.label}
              </button>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h3>Mode</h3>
          <div className="mode-grid">
            {modes.map(mode => (
              <button
                key={mode.id}
                className={`mode-btn ${selectedMode.id === mode.id ? 'active' : ''}`}
                onClick={() => setSelectedMode(mode)}
              >
                <span className="mode-icon">{mode.icon}</span>
                <span className="mode-name">{mode.name}</span>
                <span className="mode-desc">{mode.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="action-section">
          <div className="height-preview">
            <h4>Predicted Height:</h4>
            <span className="height-value">{formatHeight(calculateHeight())}</span>
          </div>

          <div className="action-buttons">
            <button
              onClick={startStacking}
              disabled={isStacking}
              className="stack-button"
            >
              <Zap size={20} />
              {isStacking ? 'Stacking...' : 'Start Stacking!'}
            </button>

            <button
              onClick={resetStack}
              className="reset-button"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="visualization-area">
        <div className="height-display">
          <h2>Current Height: {formatHeight(totalHeight)}</h2>
          {currentMessage && (
            <motion.div
              className="humor-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {currentMessage}
            </motion.div>
          )}
        </div>

        <div
          className="stack-container"
          ref={stackRef}
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Reference lines */}
          {visibleReferences.map(ref => (
            <div
              key={ref.name}
              className="reference-line"
              style={{
                bottom: `${(ref.height / totalHeight) * 400}px`,
                borderColor: ref.color
              }}
            >
              <span className="reference-label" style={{ color: ref.color }}>
                {ref.icon} {ref.name} ({formatHeight(ref.height)})
              </span>
            </div>
          ))}

          {/* Stack visualization */}
          {getStackVisualization()}
        </div>

        {totalHeight > 0 && (
          <div className="stack-stats">
            <div className="stat">
              <span>Objects Stacked:</span>
              <span>{selectedCount.value.toLocaleString()}</span>
            </div>
            <div className="stat">
              <span>Object Type:</span>
              <span>{selectedObject.name}</span>
            </div>
            <div className="stat">
              <span>Mode:</span>
              <span>{selectedMode.name}</span>
            </div>
            {selectedMode.id === 'realistic' && totalHeight > 1000 && (
              <div className="physics-warning">
                ⚠️ In reality, this stack would collapse under its own weight!
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default HumanStackGame
