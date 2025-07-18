import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, Info, RotateCcw } from 'lucide-react'
import { pharaohItems, pharaohWealth, categories } from '../data/pharaohItems'
import './SpendBillionGame.css'

function SpendBillionGame() {
  const [remainingWealth, setRemainingWealth] = useState(pharaohWealth)
  const [cart, setCart] = useState({})
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showInfo, setShowInfo] = useState(null)

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) return `${(amount / 1000000000).toFixed(1)}B`
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K`
    return amount.toString()
  }

  const addToCart = (item) => {
    if (remainingWealth >= item.price) {
      setCart(prev => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + 1
      }))
      setRemainingWealth(prev => prev - item.price)
    }
  }

  const removeFromCart = (item) => {
    if (cart[item.id] > 0) {
      setCart(prev => ({
        ...prev,
        [item.id]: prev[item.id] - 1
      }))
      setRemainingWealth(prev => prev + item.price)
    }
  }

  const resetGame = () => {
    setRemainingWealth(pharaohWealth)
    setCart({})
    setShowInfo(null)
  }

  const getTotalSpent = () => pharaohWealth - remainingWealth
  const getSpentPercentage = () => ((getTotalSpent() / pharaohWealth) * 100).toFixed(1)

  const filteredItems = selectedCategory === 'All'
    ? pharaohItems
    : pharaohItems.filter(item => item.category === selectedCategory)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pharaoh-game"
    >
      {/* Header with wealth display */}
      <div className="pharaoh-header">
        <div className="wealth-display">
          <div className="wealth-remaining">
            <span className="wealth-label">Remaining Wealth</span>
            <span className="wealth-amount">{formatCurrency(remainingWealth)} denarii</span>
          </div>
          <div className="wealth-progress">
            <div
              className="wealth-progress-bar"
              style={{ width: `${100 - getSpentPercentage()}%` }}
            />
          </div>
          <div className="wealth-spent">
            Spent: {formatCurrency(getTotalSpent())} ({getSpentPercentage()}%)
          </div>
        </div>
        <button onClick={resetGame} className="reset-button">
          <RotateCcw size={20} />
          Reset Kingdom
        </button>
      </div>

      {/* Category filters */}
      <div className="category-filters">
        <button
          className={`category-btn ${selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('All')}
        >
          All Categories
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
            style={{ borderColor: category.color }}
          >
            <span className="category-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="items-grid">
        {filteredItems.map(item => {
          const quantity = cart[item.id] || 0
          const canAfford = remainingWealth >= item.price

          return (
            <motion.div
              key={item.id}
              className={`item-card ${!canAfford ? 'unaffordable' : ''}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="item-header">
                <span className="item-icon">{item.icon}</span>
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{formatCurrency(item.price)} denarii</p>
                </div>
                <button
                  className="info-button"
                  onClick={() => setShowInfo(showInfo === item.id ? null : item.id)}
                >
                  <Info size={16} />
                </button>
              </div>

              <p className="item-description">{item.description}</p>

              <div className="item-controls">
                <button
                  className="quantity-btn"
                  onClick={() => removeFromCart(item)}
                  disabled={quantity === 0}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => addToCart(item)}
                  disabled={!canAfford}
                >
                  <Plus size={16} />
                </button>
              </div>

              <AnimatePresence>
                {showInfo === item.id && (
                  <motion.div
                    className="item-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="detail-section">
                      <strong>Modern Equivalent:</strong>
                      <p>{item.modernEquivalent}</p>
                    </div>
                    <div className="detail-section">
                      <strong>Historical Fact:</strong>
                      <p>{item.historicalFact}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Summary */}
      {Object.keys(cart).length > 0 && (
        <motion.div
          className="purchase-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Your Royal Purchases</h3>
          <div className="summary-items">
            {Object.entries(cart).filter(([_, quantity]) => quantity > 0).map(([itemId, quantity]) => {
              const item = pharaohItems.find(i => i.id === itemId)
              return (
                <div key={itemId} className="summary-item">
                  <span>{item.icon} {item.name}</span>
                  <span>×{quantity}</span>
                  <span>{formatCurrency(item.price * quantity)} denarii</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SpendBillionGame
