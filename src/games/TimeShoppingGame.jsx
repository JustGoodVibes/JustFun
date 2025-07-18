import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShoppingCart, TrendingUp, RotateCcw, Info } from 'lucide-react'
import { timeEras, eraProducts, investmentOutcomes } from '../data/timeShoppingData'
import './TimeShoppingGame.css'

function TimeShoppingGame() {
  const [selectedEra, setSelectedEra] = useState(null)
  const [budget, setBudget] = useState(0)
  const [cart, setCart] = useState([])
  const [showInvestment, setShowInvestment] = useState(false)
  const [investmentResults, setInvestmentResults] = useState(null)

  const formatCurrency = (amount, currency) => {
    return `${amount} ${currency}`
  }

  const startShopping = (era) => {
    setSelectedEra(era)
    setBudget(era.budget)
    setCart([])
    setShowInvestment(false)
    setInvestmentResults(null)
  }

  const addToCart = (product) => {
    if (budget >= product.price) {
      setBudget(prev => prev - product.price)
      setCart(prev => [...prev, product])
    }
  }

  const removeFromCart = (index) => {
    const product = cart[index]
    setBudget(prev => prev + product.price)
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const calculateInvestment = () => {
    const results = cart.map(product => {
      const outcome = investmentOutcomes[selectedEra.id]?.[product.id]
      return {
        product,
        outcome: outcome || { year2024: product.price * 10, description: 'Modest appreciation over time' }
      }
    })
    setInvestmentResults(results)
    setShowInvestment(true)
  }

  const resetShopping = () => {
    setSelectedEra(null)
    setBudget(0)
    setCart([])
    setShowInvestment(false)
    setInvestmentResults(null)
  }

  const getTotalSpent = () => {
    return selectedEra ? selectedEra.budget - budget : 0
  }

  if (!selectedEra) {
    return (
      <motion.div
        className="time-mall-hub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="mall-header">
          <h1>🕰️ Time Travel Shopping Mall</h1>
          <p>Choose your era and start shopping through history!</p>
        </div>

        <div className="eras-grid">
          {timeEras.map((era, index) => (
            <motion.div
              key={era.id}
              className="era-card"
              style={{
                background: `linear-gradient(135deg, ${era.bgColor}, ${era.bgColor}dd)`,
                color: era.textColor
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startShopping(era)}
            >
              <div className="era-content">
                <h3>{era.name}</h3>
                <p className="era-period">{era.period}</p>
                <p className="era-description">{era.description}</p>
                <div className="era-budget">
                  <span>Starting Budget:</span>
                  <span className="budget-amount">
                    {formatCurrency(era.budget, era.currency)}
                  </span>
                </div>
              </div>
              <div className="era-enter">
                <span>Enter Shop →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  const products = eraProducts[selectedEra.id] || []

  return (
    <motion.div
      className="time-shop"
      style={{
        background: `linear-gradient(135deg, ${selectedEra.bgColor}, ${selectedEra.bgColor}aa)`,
        color: selectedEra.textColor
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Shop Header */}
      <div className="shop-header">
        <button
          onClick={resetShopping}
          className="back-button"
        >
          <ArrowLeft size={20} />
          Back to Mall
        </button>

        <div className="shop-info">
          <h2>{selectedEra.name}</h2>
          <p>{selectedEra.period}</p>
        </div>

        <div className="budget-display">
          <span>Budget: {formatCurrency(budget, selectedEra.currency)}</span>
          <span>Spent: {formatCurrency(getTotalSpent(), selectedEra.currency)}</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <div className="products-grid">
          {products.map((product, index) => {
            const canAfford = budget >= product.price
            return (
              <motion.div
                key={product.id}
                className={`product-card ${!canAfford ? 'unaffordable' : ''}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={canAfford ? { scale: 1.02 } : {}}
              >
                <div className="product-header">
                  <h4>{product.name}</h4>
                  <span className="product-category">{product.category}</span>
                </div>

                <p className="product-description">{product.description}</p>

                <div className="product-pricing">
                  <span className="product-price">
                    {formatCurrency(product.price, selectedEra.currency)}
                  </span>
                  <span className="modern-value">
                    Today: {product.modernValue}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  disabled={!canAfford}
                  className="buy-button"
                >
                  <ShoppingCart size={16} />
                  {canAfford ? 'Buy Now' : 'Too Expensive'}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Shopping Cart */}
        {cart.length > 0 && (
          <motion.div
            className="shopping-cart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>
              <ShoppingCart size={20} />
              Your Purchases ({cart.length} items)
            </h3>

            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <span>{item.name}</span>
                  <span>{formatCurrency(item.price, selectedEra.currency)}</span>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="remove-button"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-actions">
              <button
                onClick={calculateInvestment}
                className="investment-button"
              >
                <TrendingUp size={16} />
                See Investment Results
              </button>
              <button
                onClick={() => {
                  setBudget(selectedEra.budget)
                  setCart([])
                }}
                className="clear-cart-button"
              >
                <RotateCcw size={16} />
                Clear Cart
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Investment Results Modal */}
      <AnimatePresence>
        {showInvestment && investmentResults && (
          <motion.div
            className="investment-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="investment-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3>📈 Investment Results (2024)</h3>
              <p>Here's how your {selectedEra.period} purchases performed:</p>

              <div className="investment-results">
                {investmentResults.map((result, index) => (
                  <div key={index} className="investment-item">
                    <div className="investment-header">
                      <span className="item-name">{result.product.name}</span>
                      <span className="original-price">
                        Original: {formatCurrency(result.product.price, selectedEra.currency)}
                      </span>
                    </div>
                    <div className="investment-outcome">
                      <span className="current-value">
                        2024 Value: ${result.outcome.year2024.toLocaleString()}
                      </span>
                      <p className="outcome-description">{result.outcome.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="investment-summary">
                <strong>
                  Total 2024 Value: $
                  {investmentResults.reduce((sum, result) => sum + result.outcome.year2024, 0).toLocaleString()}
                </strong>
              </div>

              <button
                onClick={() => setShowInvestment(false)}
                className="close-investment"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TimeShoppingGame
