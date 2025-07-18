import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { motion } from 'framer-motion'

function GameLayout({ title, children }) {
  return (
    <motion.div 
      className="game-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="game-header">
        <h1 className="game-title">{title}</h1>
        <Link to="/" className="home-button">
          <Home size={20} />
          Home
        </Link>
      </header>
      <main className="game-content">
        {children}
      </main>
    </motion.div>
  )
}

export default GameLayout
