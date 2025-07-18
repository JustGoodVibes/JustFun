export const worldEvents = [
  {
    id: 'ice_melts',
    name: 'All Ice Melts',
    icon: '🌊',
    description: 'All polar ice caps and glaciers melt completely',
    effects: {
      seaLevel: +70, // meters
      temperature: +5, // celsius
      population: -2000000000, // people displaced
      landMass: -15 // percentage lost
    },
    visualEffect: 'flooding',
    scienceFact: 'Sea levels would rise by about 70 meters, submerging many coastal cities',
    chainReactions: ['extreme_weather', 'species_extinction']
  },
  {
    id: 'everyone_jumps',
    name: 'Everyone Jumps at Once',
    icon: '🧍‍♂️',
    description: 'All 8 billion people jump simultaneously',
    effects: {
      seismicActivity: +0.1, // richter scale
      atmosphere: 0,
      temperature: 0,
      population: 0
    },
    visualEffect: 'earthquake',
    scienceFact: 'The combined effect would be barely measurable - like a small truck driving by',
    chainReactions: []
  },
  {
    id: 'two_suns',
    name: 'Two Suns Appear',
    icon: '🌞',
    description: 'A second sun appears in our solar system',
    effects: {
      temperature: +50,
      seaLevel: +100,
      atmosphere: -30,
      population: -7000000000
    },
    visualEffect: 'burning',
    scienceFact: 'Earth would become uninhabitably hot, with temperatures exceeding 100°C globally',
    chainReactions: ['ice_melts', 'no_atmosphere']
  },
  {
    id: 'birds_extinct',
    name: 'All Birds Go Extinct',
    icon: '🐦',
    description: 'Every bird species disappears overnight',
    effects: {
      ecosystem: -40,
      agriculture: -25,
      insects: +200,
      population: -500000000
    },
    visualEffect: 'ecosystem_collapse',
    scienceFact: 'Insect populations would explode, crops would fail, and ecosystems would collapse',
    chainReactions: ['food_crisis', 'insect_swarm']
  },
  {
    id: 'no_bees',
    name: 'Bees Disappear',
    icon: '🐝',
    description: 'All bee species vanish from Earth',
    effects: {
      agriculture: -35,
      ecosystem: -30,
      foodSupply: -40,
      population: -1000000000
    },
    visualEffect: 'crop_failure',
    scienceFact: 'About 1/3 of human food depends on bee pollination',
    chainReactions: ['food_crisis', 'economic_collapse']
  },
  {
    id: 'double_oxygen',
    name: 'Twice the Oxygen',
    icon: '💨',
    description: 'Atmospheric oxygen doubles to 42%',
    effects: {
      fireRisk: +500,
      animalSize: +50,
      humanHealth: +20,
      forestFires: +300
    },
    visualEffect: 'giant_insects',
    scienceFact: 'Everything would be highly flammable, and insects could grow to enormous sizes',
    chainReactions: ['mega_fires', 'giant_creatures']
  },
  {
    id: 'no_moon',
    name: 'Moon Disappears',
    icon: '🌙',
    description: 'The Moon vanishes completely',
    effects: {
      tides: -95,
      dayLength: +6, // hours
      seasons: -50,
      climate: -30
    },
    visualEffect: 'tidal_chaos',
    scienceFact: 'Days would become 30+ hours long, and Earth would wobble chaotically',
    chainReactions: ['climate_chaos', 'day_night_cycle']
  },
  {
    id: 'gravity_half',
    name: 'Gravity Halved',
    icon: '🪐',
    description: 'Earth\'s gravity becomes half as strong',
    effects: {
      atmosphere: -20,
      humanHeight: +30,
      animalBehavior: +100,
      technology: +50
    },
    visualEffect: 'floating',
    scienceFact: 'Humans could jump 4 times higher, but we\'d gradually lose our atmosphere',
    chainReactions: ['atmosphere_loss', 'space_adaptation']
  },
  {
    id: 'internet_down',
    name: 'Internet Disappears',
    icon: '📡',
    description: 'All internet infrastructure stops working',
    effects: {
      economy: -60,
      communication: -80,
      education: -40,
      socialOrder: -30
    },
    visualEffect: 'digital_darkness',
    scienceFact: 'Modern civilization would face immediate crisis as most systems depend on internet',
    chainReactions: ['economic_collapse', 'social_unrest']
  },
  {
    id: 'time_stops',
    name: 'Time Stops for 1 Hour',
    icon: '⏰',
    description: 'Time freezes everywhere except for you',
    effects: {
      physics: -100,
      reality: -100,
      sanity: -50,
      loneliness: +1000
    },
    visualEffect: 'time_freeze',
    scienceFact: 'This would violate fundamental laws of physics and probably break reality',
    chainReactions: ['reality_break', 'existential_crisis']
  }
]

export const visualEffects = {
  flooding: {
    color: '#3b82f6',
    animation: 'wave',
    description: 'Rising seas flood coastal areas'
  },
  earthquake: {
    color: '#8b5cf6',
    animation: 'shake',
    description: 'Ground trembles slightly'
  },
  burning: {
    color: '#dc2626',
    animation: 'fire',
    description: 'Extreme heat scorches the planet'
  },
  ecosystem_collapse: {
    color: '#059669',
    animation: 'fade',
    description: 'Ecosystems begin to fail'
  },
  crop_failure: {
    color: '#d97706',
    animation: 'wither',
    description: 'Crops fail worldwide'
  },
  giant_insects: {
    color: '#7c3aed',
    animation: 'grow',
    description: 'Insects grow to massive sizes'
  },
  tidal_chaos: {
    color: '#0891b2',
    animation: 'chaos',
    description: 'Tides become unpredictable'
  },
  floating: {
    color: '#ec4899',
    animation: 'float',
    description: 'Everything becomes lighter'
  },
  digital_darkness: {
    color: '#374151',
    animation: 'flicker',
    description: 'Digital world goes dark'
  },
  time_freeze: {
    color: '#fbbf24',
    animation: 'freeze',
    description: 'Everything stops moving'
  }
}

export const chainReactionEvents = {
  extreme_weather: {
    name: 'Extreme Weather',
    description: 'Hurricanes and storms intensify dramatically'
  },
  species_extinction: {
    name: 'Mass Extinction',
    description: 'Many species cannot adapt to rapid changes'
  },
  food_crisis: {
    name: 'Global Food Crisis',
    description: 'Food production collapses worldwide'
  },
  economic_collapse: {
    name: 'Economic Collapse',
    description: 'Global economy crashes due to disruption'
  },
  climate_chaos: {
    name: 'Climate Chaos',
    description: 'Weather patterns become completely unpredictable'
  },
  atmosphere_loss: {
    name: 'Atmosphere Loss',
    description: 'Earth slowly loses its protective atmosphere'
  },
  reality_break: {
    name: 'Reality Breakdown',
    description: 'The laws of physics stop making sense'
  }
}
