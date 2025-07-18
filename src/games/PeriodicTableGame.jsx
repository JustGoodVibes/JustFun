import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Beaker, Zap, RotateCcw, Info } from 'lucide-react'
import './PeriodicTableGame.css'

const elements = [
  { symbol: 'H', name: 'Hydrogen', number: 1, category: 'nonmetal', color: '#ff6b6b' },
  { symbol: 'He', name: 'Helium', number: 2, category: 'noble-gas', color: '#4ecdc4' },
  { symbol: 'Li', name: 'Lithium', number: 3, category: 'alkali-metal', color: '#45b7d1' },
  { symbol: 'Be', name: 'Beryllium', number: 4, category: 'alkaline-earth', color: '#96ceb4' },
  { symbol: 'B', name: 'Boron', number: 5, category: 'metalloid', color: '#feca57' },
  { symbol: 'C', name: 'Carbon', number: 6, category: 'nonmetal', color: '#ff6b6b' },
  { symbol: 'N', name: 'Nitrogen', number: 7, category: 'nonmetal', color: '#ff6b6b' },
  { symbol: 'O', name: 'Oxygen', number: 8, category: 'nonmetal', color: '#ff6b6b' },
  { symbol: 'F', name: 'Fluorine', number: 9, category: 'halogen', color: '#ff9ff3' },
  { symbol: 'Ne', name: 'Neon', number: 10, category: 'noble-gas', color: '#4ecdc4' },
  { symbol: 'Na', name: 'Sodium', number: 11, category: 'alkali-metal', color: '#45b7d1' },
  { symbol: 'Mg', name: 'Magnesium', number: 12, category: 'alkaline-earth', color: '#96ceb4' },
  { symbol: 'Al', name: 'Aluminum', number: 13, category: 'post-transition', color: '#a8e6cf' },
  { symbol: 'Si', name: 'Silicon', number: 14, category: 'metalloid', color: '#feca57' },
  { symbol: 'P', name: 'Phosphorus', number: 15, category: 'nonmetal', color: '#ff6b6b' },
  { symbol: 'S', name: 'Sulfur', number: 16, category: 'nonmetal', color: '#ff6b6b' },
  { symbol: 'Cl', name: 'Chlorine', number: 17, category: 'halogen', color: '#ff9ff3' },
  { symbol: 'Ar', name: 'Argon', number: 18, category: 'noble-gas', color: '#4ecdc4' },
  { symbol: 'K', name: 'Potassium', number: 19, category: 'alkali-metal', color: '#45b7d1' },
  { symbol: 'Ca', name: 'Calcium', number: 20, category: 'alkaline-earth', color: '#96ceb4' },
  { symbol: 'Fe', name: 'Iron', number: 26, category: 'transition-metal', color: '#dda0dd' },
  { symbol: 'Cu', name: 'Copper', number: 29, category: 'transition-metal', color: '#dda0dd' },
  { symbol: 'Zn', name: 'Zinc', number: 30, category: 'transition-metal', color: '#dda0dd' },
  { symbol: 'Ag', name: 'Silver', number: 47, category: 'transition-metal', color: '#dda0dd' },
  { symbol: 'Au', name: 'Gold', number: 79, category: 'transition-metal', color: '#dda0dd' }
]

const reactions = {
  'H+O': { product: 'H₂O (Water)', emoji: '💧', description: 'The most essential compound for life!' },
  'Na+Cl': { product: 'NaCl (Salt)', emoji: '🧂', description: 'Table salt - essential for cooking!' },
  'C+O': { product: 'CO₂ (Carbon Dioxide)', emoji: '🌫️', description: 'What we breathe out!' },
  'Fe+O': { product: 'Fe₂O₃ (Rust)', emoji: '🦀', description: 'Iron oxide - why metal rusts!' },
  'Ca+C': { product: 'CaCO₃ (Limestone)', emoji: '🏔️', description: 'Found in rocks and shells!' },
  'H+H': { product: 'H₂ (Hydrogen Gas)', emoji: '🎈', description: 'Lighter than air!' },
  'Au+Au': { product: 'Pure Gold', emoji: '👑', description: 'The most precious metal!' }
}

function PeriodicTableGame() {
  const [selectedElements, setSelectedElements] = useState([])
  const [currentReaction, setCurrentReaction] = useState(null)
  const [mode, setMode] = useState('explore')
  const [hoveredElement, setHoveredElement] = useState(null)
  const [score, setScore] = useState(0)

  const selectElement = (element) => {
    if (selectedElements.length < 2) {
      const newSelected = [...selectedElements, element]
      setSelectedElements(newSelected)

      if (newSelected.length === 2) {
        checkReaction(newSelected)
      }
    }
  }

  const checkReaction = (elements) => {
    const key1 = `${elements[0].symbol}+${elements[1].symbol}`
    const key2 = `${elements[1].symbol}+${elements[0].symbol}`

    const reaction = reactions[key1] || reactions[key2]

    if (reaction) {
      setCurrentReaction(reaction)
      setScore(prev => prev + 10)
    } else {
      setCurrentReaction({
        product: 'No Reaction',
        emoji: '❌',
        description: 'These elements don\'t commonly react together.'
      })
    }
  }

  const resetLab = () => {
    setSelectedElements([])
    setCurrentReaction(null)
  }

  const getElementPosition = (index) => {
    // Simplified periodic table layout
    const positions = {
      0: { row: 1, col: 1 }, // H
      1: { row: 1, col: 18 }, // He
      2: { row: 2, col: 1 }, // Li
      3: { row: 2, col: 2 }, // Be
      4: { row: 2, col: 13 }, // B
      5: { row: 2, col: 14 }, // C
      6: { row: 2, col: 15 }, // N
      7: { row: 2, col: 16 }, // O
      8: { row: 2, col: 17 }, // F
      9: { row: 2, col: 18 }, // Ne
      10: { row: 3, col: 1 }, // Na
      11: { row: 3, col: 2 }, // Mg
      12: { row: 3, col: 13 }, // Al
      13: { row: 3, col: 14 }, // Si
      14: { row: 3, col: 15 }, // P
      15: { row: 3, col: 16 }, // S
      16: { row: 3, col: 17 }, // Cl
      17: { row: 3, col: 18 }, // Ar
      18: { row: 4, col: 1 }, // K
      19: { row: 4, col: 2 }, // Ca
      20: { row: 4, col: 8 }, // Fe
      21: { row: 4, col: 11 }, // Cu
      22: { row: 4, col: 12 }, // Zn
      23: { row: 5, col: 11 }, // Ag
      24: { row: 6, col: 11 }, // Au
    }
    return positions[index] || { row: 7, col: index % 18 + 1 }
  }

  return (
    <motion.div
      className="periodic-table-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="game-header">
        <h1>⚛️ Periodic Table Playground</h1>
        <div className="mode-selector">
          <button
            className={mode === 'explore' ? 'active' : ''}
            onClick={() => setMode('explore')}
          >
            🔍 Explore
          </button>
          <button
            className={mode === 'lab' ? 'active' : ''}
            onClick={() => setMode('lab')}
          >
            🧪 Lab
          </button>
        </div>
        {mode === 'lab' && (
          <div className="lab-score">
            Score: {score} points
          </div>
        )}
      </div>

      <div className="game-content">
        {/* Periodic Table */}
        <div className="periodic-table">
          {elements.map((element, index) => {
            const position = getElementPosition(index)
            const isSelected = selectedElements.includes(element)

            return (
              <motion.div
                key={element.symbol}
                className={`element ${element.category} ${isSelected ? 'selected' : ''}`}
                style={{
                  gridRow: position.row,
                  gridColumn: position.col,
                  backgroundColor: element.color
                }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => mode === 'lab' && selectElement(element)}
                onMouseEnter={() => setHoveredElement(element)}
                onMouseLeave={() => setHoveredElement(null)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                <div className="element-number">{element.number}</div>
                <div className="element-symbol">{element.symbol}</div>
                <div className="element-name">{element.name}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Side Panel */}
        <div className="side-panel">
          {mode === 'explore' && hoveredElement && (
            <motion.div
              className="element-info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>{hoveredElement.name}</h3>
              <p><strong>Symbol:</strong> {hoveredElement.symbol}</p>
              <p><strong>Atomic Number:</strong> {hoveredElement.number}</p>
              <p><strong>Category:</strong> {hoveredElement.category.replace('-', ' ')}</p>
              <div className="element-preview" style={{ backgroundColor: hoveredElement.color }}>
                {hoveredElement.symbol}
              </div>
            </motion.div>
          )}

          {mode === 'lab' && (
            <div className="lab-panel">
              <h3>
                <Beaker size={20} />
                Chemistry Lab
              </h3>

              <div className="selected-elements">
                <h4>Selected Elements:</h4>
                <div className="element-slots">
                  {[0, 1].map(index => (
                    <div key={index} className="element-slot">
                      {selectedElements[index] ? (
                        <div
                          className="mini-element"
                          style={{ backgroundColor: selectedElements[index].color }}
                        >
                          {selectedElements[index].symbol}
                        </div>
                      ) : (
                        <div className="empty-slot">?</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {currentReaction && (
                  <motion.div
                    className="reaction-result"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <div className="reaction-emoji">{currentReaction.emoji}</div>
                    <h4>{currentReaction.product}</h4>
                    <p>{currentReaction.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button onClick={resetLab} className="reset-button">
                <RotateCcw size={16} />
                Reset Lab
              </button>

              <div className="lab-instructions">
                <h4>Instructions:</h4>
                <p>Click on two elements to see if they react together!</p>
                <p>Try combinations like H+O, Na+Cl, or Fe+O</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="legend">
        <h4>Element Categories:</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ff6b6b' }}></div>
            <span>Nonmetals</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#45b7d1' }}></div>
            <span>Alkali Metals</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#96ceb4' }}></div>
            <span>Alkaline Earth</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#dda0dd' }}></div>
            <span>Transition Metals</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#4ecdc4' }}></div>
            <span>Noble Gases</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ff9ff3' }}></div>
            <span>Halogens</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PeriodicTableGame
