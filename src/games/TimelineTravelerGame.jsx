import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, Filter, X } from 'lucide-react'
import './TimelineTravelerGame.css'

const historicalEvents = [
  { year: -3000, title: 'Invention of Writing', category: 'technology', description: 'Cuneiform script developed in Mesopotamia', icon: '📜' },
  { year: -2560, title: 'Great Pyramid Built', category: 'architecture', description: 'Great Pyramid of Giza constructed', icon: '🔺' },
  { year: -776, title: 'First Olympics', category: 'culture', description: 'First Olympic Games held in ancient Greece', icon: '🏃' },
  { year: -221, title: 'Great Wall of China', category: 'architecture', description: 'Construction begins under Qin Dynasty', icon: '🏯' },
  { year: 476, title: 'Fall of Rome', category: 'politics', description: 'Western Roman Empire collapses', icon: '🏛️' },
  { year: 1066, title: 'Norman Conquest', category: 'politics', description: 'Battle of Hastings changes English history', icon: '⚔️' },
  { year: 1347, title: 'Black Death', category: 'disaster', description: 'Plague devastates Europe', icon: '💀' },
  { year: 1492, title: 'Columbus Voyage', category: 'exploration', description: 'Columbus reaches the Americas', icon: '🚢' },
  { year: 1543, title: 'Copernican Revolution', category: 'science', description: 'Heliocentric model published', icon: '🌞' },
  { year: 1776, title: 'American Independence', category: 'politics', description: 'Declaration of Independence signed', icon: '🗽' },
  { year: 1789, title: 'French Revolution', category: 'politics', description: 'Revolution begins in France', icon: '🇫🇷' },
  { year: 1804, title: 'Napoleon Emperor', category: 'politics', description: 'Napoleon crowns himself Emperor', icon: '👑' },
  { year: 1859, title: 'Origin of Species', category: 'science', description: 'Darwin publishes theory of evolution', icon: '🐒' },
  { year: 1876, title: 'Telephone Invented', category: 'technology', description: 'Alexander Graham Bell patents telephone', icon: '📞' },
  { year: 1903, title: 'First Flight', category: 'technology', description: 'Wright brothers achieve powered flight', icon: '✈️' },
  { year: 1914, title: 'World War I Begins', category: 'war', description: 'The Great War starts', icon: '💥' },
  { year: 1929, title: 'Stock Market Crash', category: 'economics', description: 'Great Depression begins', icon: '📉' },
  { year: 1939, title: 'World War II Begins', category: 'war', description: 'Germany invades Poland', icon: '🌍' },
  { year: 1945, title: 'Atomic Bomb', category: 'war', description: 'Nuclear weapons used in warfare', icon: '☢️' },
  { year: 1969, title: 'Moon Landing', category: 'exploration', description: 'Apollo 11 lands on the moon', icon: '🌙' },
  { year: 1989, title: 'Berlin Wall Falls', category: 'politics', description: 'Cold War symbol demolished', icon: '🧱' },
  { year: 1991, title: 'World Wide Web', category: 'technology', description: 'Internet becomes publicly available', icon: '🌐' },
  { year: 2001, title: '9/11 Attacks', category: 'disaster', description: 'Terrorist attacks in New York', icon: '🏢' },
  { year: 2020, title: 'COVID-19 Pandemic', category: 'disaster', description: 'Global pandemic begins', icon: '🦠' }
]

const categories = [
  { id: 'all', name: 'All Events', color: '#ffffff' },
  { id: 'technology', name: 'Technology', color: '#3b82f6' },
  { id: 'politics', name: 'Politics', color: '#dc2626' },
  { id: 'science', name: 'Science', color: '#10b981' },
  { id: 'war', name: 'War', color: '#7c2d12' },
  { id: 'culture', name: 'Culture', color: '#8b5cf6' },
  { id: 'exploration', name: 'Exploration', color: '#f59e0b' },
  { id: 'disaster', name: 'Disasters', color: '#ef4444' },
  { id: 'architecture', name: 'Architecture', color: '#6b7280' },
  { id: 'economics', name: 'Economics', color: '#059669' }
]

function TimelineTravelerGame() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [timelinePosition, setTimelinePosition] = useState(0)
  const timelineRef = useRef(null)

  const filteredEvents = selectedCategory === 'all'
    ? historicalEvents
    : historicalEvents.filter(event => event.category === selectedCategory)

  const minYear = Math.min(...historicalEvents.map(e => e.year))
  const maxYear = Math.max(...historicalEvents.map(e => e.year))
  const yearRange = maxYear - minYear

  const getEventPosition = (year) => {
    return ((year - minYear) / yearRange) * 100
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 5))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5))
  }

  const handleTimelineScroll = (e) => {
    const container = timelineRef.current
    if (container) {
      const scrollPercent = container.scrollLeft / (container.scrollWidth - container.clientWidth)
      setTimelinePosition(scrollPercent)
    }
  }

  const formatYear = (year) => {
    if (year < 0) return `${Math.abs(year)} BCE`
    return `${year} CE`
  }

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.id === category)
    return cat ? cat.color : '#ffffff'
  }

  return (
    <motion.div
      className="timeline-traveler-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="game-header">
        <h1>🕰️ Timeline Traveler</h1>
        <p>Navigate through 5,000 years of human history</p>
      </div>

      {/* Controls */}
      <div className="controls-panel">
        <div className="category-filters">
          <Filter size={20} />
          <span>Filter by category:</span>
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              style={{
                borderColor: category.color,
                backgroundColor: selectedCategory === category.id ? category.color : 'transparent'
              }}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="zoom-controls">
          <button onClick={handleZoomOut} className="zoom-btn">
            <ZoomOut size={16} />
          </button>
          <span>Zoom: {zoomLevel.toFixed(1)}x</span>
          <button onClick={handleZoomIn} className="zoom-btn">
            <ZoomIn size={16} />
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        <div className="timeline-years">
          {[-3000, -2000, -1000, 0, 1000, 1500, 1800, 1900, 2000].map(year => (
            <div
              key={year}
              className="year-marker"
              style={{ left: `${getEventPosition(year)}%` }}
            >
              {formatYear(year)}
            </div>
          ))}
        </div>

        <div
          className="timeline-track"
          ref={timelineRef}
          onScroll={handleTimelineScroll}
          style={{ transform: `scaleX(${zoomLevel})` }}
        >
          <div className="timeline-line" />

          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.year}
              className="timeline-event"
              style={{
                left: `${getEventPosition(event.year)}%`,
                borderColor: getCategoryColor(event.category)
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="event-icon">{event.icon}</div>
              <div className="event-year">{formatYear(event.year)}</div>
              <div className="event-title">{event.title}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="event-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="event-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ borderColor: getCategoryColor(selectedEvent.category) }}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedEvent(null)}
              >
                <X size={20} />
              </button>

              <div className="modal-header">
                <div className="modal-icon">{selectedEvent.icon}</div>
                <div>
                  <h2>{selectedEvent.title}</h2>
                  <p className="modal-year">{formatYear(selectedEvent.year)}</p>
                </div>
              </div>

              <div className="modal-content">
                <p className="modal-description">{selectedEvent.description}</p>
                <div
                  className="modal-category"
                  style={{ backgroundColor: getCategoryColor(selectedEvent.category) }}
                >
                  {categories.find(c => c.id === selectedEvent.category)?.name}
                </div>
              </div>

              <div className="modal-navigation">
                <p>Click on other events to explore more of history!</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Statistics */}
      <div className="timeline-stats">
        <div className="stat">
          <span>Total Events:</span>
          <span>{filteredEvents.length}</span>
        </div>
        <div className="stat">
          <span>Time Span:</span>
          <span>{(maxYear - minYear).toLocaleString()} years</span>
        </div>
        <div className="stat">
          <span>Current Filter:</span>
          <span>{categories.find(c => c.id === selectedCategory)?.name}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default TimelineTravelerGame
