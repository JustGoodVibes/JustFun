import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, BarChart3 } from 'lucide-react'
import './PopulationPyramidGame.css'

const countries = [
  { id: 'usa', name: 'United States', flag: '🇺🇸' },
  { id: 'china', name: 'China', flag: '🇨🇳' },
  { id: 'india', name: 'India', flag: '🇮🇳' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪' },
  { id: 'nigeria', name: 'Nigeria', flag: '🇳🇬' },
  { id: 'brazil', name: 'Brazil', flag: '🇧🇷' },
  { id: 'russia', name: 'Russia', flag: '🇷🇺' }
]

const ageGroups = [
  '0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39',
  '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80+'
]

function PopulationPyramidGame() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [selectedYear, setSelectedYear] = useState(2024)
  const [comparisonCountry, setComparisonCountry] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [populationData, setPopulationData] = useState({})

  // Generate realistic population data
  const generatePopulationData = (country, year) => {
    const data = { male: [], female: [] }

    ageGroups.forEach((ageGroup, index) => {
      let basePop = 100 - (index * 3) // Decreasing population with age

      // Country-specific adjustments
      if (country.id === 'japan' || country.id === 'germany') {
        // Aging societies
        basePop = index > 10 ? basePop + 20 : basePop - 10
      } else if (country.id === 'nigeria' || country.id === 'india') {
        // Young populations
        basePop = index < 8 ? basePop + 30 : basePop - 20
      }

      // Year adjustments
      const yearFactor = (year - 2000) / 100
      if (index < 5) basePop *= (1 - yearFactor) // Declining birth rates

      basePop = Math.max(10, basePop + Math.random() * 20)

      data.male.push(basePop)
      data.female.push(basePop * 1.05) // Slightly more females
    })

    return data
  }

  useEffect(() => {
    const data = generatePopulationData(selectedCountry, selectedYear)
    setPopulationData(data)
  }, [selectedCountry, selectedYear])

  const animateYear = () => {
    setIsAnimating(true)
    let currentYear = 1950
    const interval = setInterval(() => {
      setSelectedYear(currentYear)
      currentYear += 5
      if (currentYear > 2024) {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, 200)
  }

  const resetToPresent = () => {
    setSelectedYear(2024)
    setIsAnimating(false)
  }

  const getMaxPopulation = () => {
    const allValues = [...populationData.male || [], ...populationData.female || []]
    return Math.max(...allValues, 100)
  }

  const formatPopulation = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return value.toFixed(0)
  }

  const maxPop = getMaxPopulation()

  return (
    <motion.div
      className="population-pyramid-game"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="game-header">
        <h1>📊 Population Pyramid Builder</h1>
        <p>Explore demographic trends across countries and time</p>
      </div>

      {/* Controls */}
      <div className="controls-panel">
        <div className="country-selector">
          <label>Primary Country:</label>
          <select
            value={selectedCountry.id}
            onChange={(e) => setSelectedCountry(countries.find(c => c.id === e.target.value))}
          >
            {countries.map(country => (
              <option key={country.id} value={country.id}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="comparison-selector">
          <label>Compare with:</label>
          <select
            value={comparisonCountry?.id || ''}
            onChange={(e) => setComparisonCountry(e.target.value ? countries.find(c => c.id === e.target.value) : null)}
          >
            <option value="">None</option>
            {countries.filter(c => c.id !== selectedCountry.id).map(country => (
              <option key={country.id} value={country.id}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="year-controls">
          <label>Year: {selectedYear}</label>
          <input
            type="range"
            min="1950"
            max="2024"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            disabled={isAnimating}
          />
          <div className="year-buttons">
            <button onClick={animateYear} disabled={isAnimating}>
              <Play size={16} />
              {isAnimating ? 'Playing...' : 'Animate'}
            </button>
            <button onClick={resetToPresent}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Pyramid Visualization */}
      <div className="pyramid-container">
        <div className="pyramid-header">
          <h2>
            {selectedCountry.flag} {selectedCountry.name} - {selectedYear}
            {comparisonCountry && (
              <span className="comparison-title">
                vs {comparisonCountry.flag} {comparisonCountry.name}
              </span>
            )}
          </h2>
        </div>

        <div className="pyramid-chart">
          <div className="age-labels">
            {ageGroups.map((ageGroup, index) => (
              <div key={index} className="age-label">
                {ageGroup}
              </div>
            ))}
          </div>

          <div className="pyramid-bars">
            <div className="male-side">
              <h3>Male</h3>
              {populationData.male?.map((value, index) => (
                <motion.div
                  key={index}
                  className="population-bar male"
                  style={{ width: `${(value / maxPop) * 100}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(value / maxPop) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <span className="bar-value">{formatPopulation(value * 1000)}</span>
                </motion.div>
              ))}
            </div>

            <div className="female-side">
              <h3>Female</h3>
              {populationData.female?.map((value, index) => (
                <motion.div
                  key={index}
                  className="population-bar female"
                  style={{ width: `${(value / maxPop) * 100}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(value / maxPop) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <span className="bar-value">{formatPopulation(value * 1000)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="statistics-panel">
          <div className="stat-card">
            <h4>Total Population</h4>
            <p>{formatPopulation(populationData.male?.reduce((a, b) => a + b, 0) * 2000 || 0)}</p>
          </div>
          <div className="stat-card">
            <h4>Median Age</h4>
            <p>{(25 + Math.random() * 20).toFixed(1)} years</p>
          </div>
          <div className="stat-card">
            <h4>Dependency Ratio</h4>
            <p>{(40 + Math.random() * 30).toFixed(1)}%</p>
          </div>
          <div className="stat-card">
            <h4>Growth Rate</h4>
            <p>{(Math.random() * 3 - 0.5).toFixed(2)}%</p>
          </div>
        </div>

        {/* Historical Events */}
        {selectedYear >= 1950 && (
          <div className="historical-events">
            <h3>Historical Context for {selectedYear}</h3>
            <div className="events-list">
              {selectedYear >= 1945 && selectedYear <= 1950 && (
                <div className="event">📅 Post-WWII Baby Boom begins</div>
              )}
              {selectedYear >= 1960 && selectedYear <= 1970 && (
                <div className="event">💊 Birth control pill introduced</div>
              )}
              {selectedYear >= 1980 && selectedYear <= 1990 && selectedCountry.id === 'china' && (
                <div className="event">👶 One-child policy implemented in China</div>
              )}
              {selectedYear >= 2000 && selectedYear <= 2010 && (
                <div className="event">🌍 Millennium Development Goals launched</div>
              )}
              {selectedYear >= 2020 && (
                <div className="event">🦠 COVID-19 pandemic impacts demographics</div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default PopulationPyramidGame
