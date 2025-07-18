import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Crown,
  Moon,
  ShoppingCart,
  Users,
  Globe,
  Wifi,
  Earth,
  BarChart3,
  Atom,
  Clock,
  Telescope
} from 'lucide-react'
import './HomePage.css'

const games = [
  {
    id: 'spend-billion',
    title: 'Spend a Billion Like a Pharaoh',
    description: 'Manage ancient wealth and learn about historical economies',
    icon: Crown,
    color: '#d4af37',
    path: '/spend-billion'
  },
  {
    id: 'moon-fall',
    title: 'What If the Moon Fell?',
    description: 'Explore the consequences of lunar disaster with science and humor',
    icon: Moon,
    color: '#6b7280',
    path: '/moon-fall'
  },
  {
    id: 'time-shopping',
    title: 'Time Travel Shopping Mall',
    description: 'Shop through history with period-accurate currencies',
    icon: ShoppingCart,
    color: '#8b5cf6',
    path: '/time-shopping'
  },
  {
    id: 'human-stack',
    title: 'Human Stack',
    description: 'Visualize global scale through absurd stacking experiments',
    icon: Users,
    color: '#10b981',
    path: '/human-stack'
  },
  {
    id: 'world-if',
    title: 'The World If...',
    description: 'Toggle counterfactual events and see their global effects',
    icon: Globe,
    color: '#3b82f6',
    path: '/world-if'
  },
  {
    id: 'internet-past',
    title: 'Internet of the Past',
    description: 'Experience the web as it was in different decades',
    icon: Wifi,
    color: '#f59e0b',
    path: '/internet-past'
  },
  {
    id: 'planet-builder',
    title: 'Planet Builder',
    description: 'Create worlds and manage environmental variables',
    icon: Earth,
    color: '#06b6d4',
    path: '/planet-builder'
  },
  {
    id: 'population-pyramid',
    title: 'Population Pyramid Builder',
    description: 'Explore demographics and population trends interactively',
    icon: BarChart3,
    color: '#ef4444',
    path: '/population-pyramid'
  },
  {
    id: 'periodic-table',
    title: 'Periodic Table Playground',
    description: 'Make chemistry intuitive with interactive elements',
    icon: Atom,
    color: '#8b5cf6',
    path: '/periodic-table'
  },
  {
    id: 'timeline-traveler',
    title: 'Timeline Traveler',
    description: 'Navigate through history with a zoomable timeline',
    icon: Clock,
    color: '#f97316',
    path: '/timeline-traveler'
  },
  {
    id: 'scale-universe',
    title: 'Scale of the Universe Explorer',
    description: 'Journey from quantum to cosmic scales',
    icon: Telescope,
    color: '#6366f1',
    path: '/scale-universe'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

function HomePage() {
  return (
    <div className="home-page">
      <motion.header 
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">Educational Mini-Games</h1>
          <p className="hero-subtitle">
            Explore, learn, and have fun with interactive experiences inspired by neal.fun
          </p>
        </div>
      </motion.header>

      <motion.main 
        className="games-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="games-grid">
          {games.map((game) => {
            const IconComponent = game.icon
            return (
              <motion.div
                key={game.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={game.path} className="game-card">
                  <div 
                    className="game-icon"
                    style={{ backgroundColor: game.color }}
                  >
                    <IconComponent size={32} color="white" />
                  </div>
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-description">{game.description}</p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.main>

      <footer className="footer">
        <p>Built with React, Vite, and Framer Motion • Inspired by neal.fun</p>
      </footer>
    </div>
  )
}

export default HomePage
