import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Wifi, Download, Volume2 } from 'lucide-react'
import './InternetPastGame.css'

const internetEras = [
  {
    id: '1995',
    name: '1995 - Dawn of the Web',
    speed: '56k Dial-up',
    browser: 'Netscape Navigator',
    bgColor: '#c0c0c0',
    textColor: '#000000'
  },
  {
    id: '2000',
    name: '2000 - Y2K Era',
    speed: 'DSL',
    browser: 'Internet Explorer 5',
    bgColor: '#008080',
    textColor: '#ffffff'
  },
  {
    id: '2005',
    name: '2005 - Web 2.0',
    speed: 'Broadband',
    browser: 'Firefox',
    bgColor: '#ff6600',
    textColor: '#ffffff'
  },
  {
    id: '2010',
    name: '2010 - Social Media Boom',
    speed: 'High-Speed',
    browser: 'Chrome',
    bgColor: '#4267B2',
    textColor: '#ffffff'
  }
]

const websites = {
  '1995': [
    { name: 'Welcome to My Homepage!', content: 'Under Construction 🚧', type: 'personal' },
    { name: 'Yahoo! Directory', content: 'The Web organized by topic', type: 'portal' },
    { name: 'Geocities', content: 'Free homepages for everyone!', type: 'hosting' }
  ],
  '2000': [
    { name: 'Ask Jeeves', content: 'Ask me anything!', type: 'search' },
    { name: 'Napster', content: 'Share your music', type: 'p2p' },
    { name: 'Flash Game Portal', content: 'Play Stick Fighter!', type: 'games' }
  ],
  '2005': [
    { name: 'MySpace', content: 'A place for friends', type: 'social' },
    { name: 'YouTube', content: 'Broadcast Yourself', type: 'video' },
    { name: 'Wikipedia', content: 'The free encyclopedia', type: 'wiki' }
  ],
  '2010': [
    { name: 'Facebook', content: 'Connect with friends', type: 'social' },
    { name: 'Twitter', content: 'What\'s happening?', type: 'microblog' },
    { name: 'iPhone Apps', content: 'There\'s an app for that', type: 'mobile' }
  ]
}

function InternetPastGame() {
  const [selectedEra, setSelectedEra] = useState(null)
  const [currentSite, setCurrentSite] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showPopup, setShowPopup] = useState(false)

  const simulateLoading = (callback) => {
    setIsLoading(true)
    setLoadingProgress(0)

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          callback()
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const visitSite = (site) => {
    simulateLoading(() => {
      setCurrentSite(site)
      if (Math.random() > 0.7) setShowPopup(true)
    })
  }

  const goBack = () => {
    setCurrentSite(null)
    setShowPopup(false)
  }

  if (!selectedEra) {
    return (
      <motion.div
        className="internet-past-hub"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="retro-header">
          <h1>📡 Internet Time Machine</h1>
          <p>Experience the web as it was in different eras</p>
        </div>

        <div className="eras-selection">
          {internetEras.map((era, index) => (
            <motion.div
              key={era.id}
              className="era-option"
              style={{
                background: era.bgColor,
                color: era.textColor
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedEra(era)}
            >
              <h3>{era.name}</h3>
              <p>Connection: {era.speed}</p>
              <p>Browser: {era.browser}</p>
              <div className="enter-btn">Enter →</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`retro-browser era-${selectedEra.id}`}
      style={{ backgroundColor: selectedEra.bgColor, color: selectedEra.textColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Browser Chrome */}
      <div className="browser-chrome">
        <div className="browser-header">
          <button onClick={() => setSelectedEra(null)} className="back-btn">
            <ArrowLeft size={16} />
          </button>
          <div className="browser-title">{selectedEra.browser}</div>
          <div className="connection-status">
            <Wifi size={16} />
            {selectedEra.speed}
          </div>
        </div>

        <div className="address-bar">
          <span>http://www.{currentSite ? currentSite.name.toLowerCase().replace(/\s+/g, '') : 'homepage'}.com</span>
        </div>
      </div>

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loading-content">
              <h2>Loading...</h2>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p>{loadingProgress.toFixed(0)}% complete</p>
              {selectedEra.id === '1995' && (
                <p className="dial-up-sounds">
                  📞 *BEEP BOOP SCREECH* Connecting to internet...
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <div className="browser-content">
          {!currentSite ? (
            <div className="homepage">
              <h1>Welcome to the {selectedEra.name}!</h1>
              <div className="websites-grid">
                {websites[selectedEra.id].map((site, index) => (
                  <motion.div
                    key={index}
                    className={`website-link ${site.type}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => visitSite(site)}
                  >
                    <h3>{site.name}</h3>
                    <p>{site.content}</p>
                    <div className="visit-btn">Visit Site</div>
                  </motion.div>
                ))}
              </div>

              {selectedEra.id === '1995' && (
                <div className="retro-elements">
                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Under Construction" className="construction-gif" />
                  <marquee>Welcome to my homepage! Last updated: Never</marquee>
                </div>
              )}
            </div>
          ) : (
            <div className="website-view">
              <button onClick={goBack} className="back-to-home">
                ← Back to Homepage
              </button>
              <div className={`site-content ${currentSite.type}`}>
                <h1>{currentSite.name}</h1>
                <p>{currentSite.content}</p>

                {currentSite.type === 'games' && (
                  <div className="flash-game">
                    <div className="game-placeholder">
                      🎮 Flash Game Loading...
                      <p>Adobe Flash Player required</p>
                    </div>
                  </div>
                )}

                {currentSite.type === 'social' && selectedEra.id === '2005' && (
                  <div className="myspace-profile">
                    <h2>Tom's Profile</h2>
                    <p>Thanks for the add!</p>
                    <div className="top-8">Top 8 Friends: You're #1!</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Popup Ads */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="popup-ad"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="popup-header">
                <span>🎉 CONGRATULATIONS! 🎉</span>
                <button onClick={() => setShowPopup(false)}>×</button>
              </div>
              <div className="popup-content">
                <h3>You are the 1,000,000th visitor!</h3>
                <p>Click here to claim your FREE iPod!</p>
                <button className="claim-btn">CLAIM NOW!</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default InternetPastGame
