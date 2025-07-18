export const timeEras = [
  {
    id: 'roman',
    name: 'Roman Forum',
    period: '100 AD',
    currency: 'Denarii',
    budget: 1000,
    description: 'Shop like a Roman citizen in the bustling forum',
    bgColor: '#8b4513',
    textColor: '#ffd700'
  },
  {
    id: 'medieval',
    name: 'Medieval Bazaar',
    period: '1200 AD',
    currency: 'Silver Coins',
    budget: 500,
    description: 'Trade in the medieval marketplace',
    bgColor: '#2d4a22',
    textColor: '#c9b037'
  },
  {
    id: 'renaissance',
    name: 'Renaissance Market',
    period: '1500 AD',
    currency: 'Florins',
    budget: 800,
    description: 'Experience the wealth of the Renaissance',
    bgColor: '#722f37',
    textColor: '#daa520'
  },
  {
    id: 'victorian',
    name: 'Victorian Department Store',
    period: '1890',
    currency: 'Pounds',
    budget: 100,
    description: 'Shop in the elegant Victorian era',
    bgColor: '#1a1a2e',
    textColor: '#eee'
  },
  {
    id: 'twenties',
    name: '1920s Department Store',
    period: '1925',
    currency: 'Dollars',
    budget: 500,
    description: 'Experience the roaring twenties',
    bgColor: '#0f3460',
    textColor: '#e94560'
  },
  {
    id: 'fifties',
    name: '1950s Shopping Center',
    period: '1955',
    currency: 'Dollars',
    budget: 1000,
    description: 'Shop in post-war prosperity',
    bgColor: '#ff6b6b',
    textColor: '#fff'
  },
  {
    id: 'eighties',
    name: '1980s Electronics Shop',
    period: '1985',
    currency: 'Dollars',
    budget: 2000,
    description: 'Buy the latest 80s technology',
    bgColor: '#ff006e',
    textColor: '#8338ec'
  }
]

export const eraProducts = {
  roman: [
    { id: 'bread', name: 'Daily Bread', price: 2, category: 'Food', description: 'Fresh baked bread from the local baker', modernValue: '$5' },
    { id: 'wine', name: 'Amphora of Wine', price: 25, category: 'Drink', description: 'Fine wine from Gaul', modernValue: '$50' },
    { id: 'toga', name: 'Silk Toga', price: 200, category: 'Clothing', description: 'Luxurious silk toga from the East', modernValue: '$500' },
    { id: 'slave', name: 'Educated Slave', price: 500, category: 'Labor', description: 'Greek tutor for your children', modernValue: '$50,000' },
    { id: 'villa', name: 'Country Villa', price: 10000, category: 'Property', description: 'Beautiful villa outside Rome', modernValue: '$2,000,000' },
    { id: 'gladiator', name: 'Gladiator Show', price: 100, category: 'Entertainment', description: 'Private gladiator performance', modernValue: '$1,000' }
  ],
  medieval: [
    { id: 'ale', name: 'Mug of Ale', price: 1, category: 'Drink', description: 'Hearty ale from the local brewery', modernValue: '$8' },
    { id: 'sword', name: 'Steel Sword', price: 50, category: 'Weapon', description: 'Fine steel blade from Toledo', modernValue: '$2,000' },
    { id: 'horse', name: 'War Horse', price: 200, category: 'Transport', description: 'Trained destrier for battle', modernValue: '$50,000' },
    { id: 'spices', name: 'Eastern Spices', price: 30, category: 'Food', description: 'Rare spices from the Orient', modernValue: '$200' },
    { id: 'manuscript', name: 'Illuminated Manuscript', price: 300, category: 'Knowledge', description: 'Hand-copied religious text', modernValue: '$100,000' },
    { id: 'castle', name: 'Small Castle', price: 5000, category: 'Property', description: 'Fortified manor with lands', modernValue: '$10,000,000' }
  ],
  renaissance: [
    { id: 'painting', name: 'Oil Painting', price: 100, category: 'Art', description: 'Portrait by a master painter', modernValue: '$50,000' },
    { id: 'telescope', name: 'Galilean Telescope', price: 200, category: 'Science', description: 'Revolutionary viewing device', modernValue: '$10,000' },
    { id: 'silk', name: 'Venetian Silk', price: 80, category: 'Clothing', description: 'Finest silk from Venice', modernValue: '$1,000' },
    { id: 'books', name: 'Printed Books', price: 50, category: 'Knowledge', description: 'Collection of printed works', modernValue: '$5,000' },
    { id: 'palace', name: 'City Palace', price: 8000, category: 'Property', description: 'Grand palace in Florence', modernValue: '$20,000,000' },
    { id: 'ship', name: 'Trading Ship', price: 2000, category: 'Transport', description: 'Ocean-going merchant vessel', modernValue: '$5,000,000' }
  ],
  victorian: [
    { id: 'tea', name: 'Fine Tea Set', price: 5, category: 'Dining', description: 'Elegant porcelain tea service', modernValue: '$500' },
    { id: 'dress', name: 'Silk Evening Dress', price: 20, category: 'Clothing', description: 'Latest Paris fashion', modernValue: '$2,000' },
    { id: 'piano', name: 'Grand Piano', price: 80, category: 'Music', description: 'Steinway grand piano', modernValue: '$100,000' },
    { id: 'carriage', name: 'Horse Carriage', price: 150, category: 'Transport', description: 'Elegant four-wheel carriage', modernValue: '$50,000' },
    { id: 'mansion', name: 'London Mansion', price: 5000, category: 'Property', description: 'Townhouse in Mayfair', modernValue: '$50,000,000' },
    { id: 'jewelry', name: 'Diamond Necklace', price: 500, category: 'Jewelry', description: 'Exquisite diamond jewelry', modernValue: '$100,000' }
  ],
  twenties: [
    { id: 'cocktail', name: 'Gin Rickey', price: 2, category: 'Drink', description: 'Popular prohibition cocktail', modernValue: '$15' },
    { id: 'dress', name: 'Flapper Dress', price: 25, category: 'Clothing', description: 'Fashionable dropped-waist dress', modernValue: '$300' },
    { id: 'car', name: 'Model T Ford', price: 300, category: 'Transport', description: 'Brand new automobile', modernValue: '$30,000' },
    { id: 'radio', name: 'Radio Set', price: 150, category: 'Electronics', description: 'Latest radio technology', modernValue: '$2,000' },
    { id: 'stocks', name: 'Stock Shares', price: 100, category: 'Investment', description: 'Hot stock market tips', modernValue: '$0 (after 1929)' },
    { id: 'apartment', name: 'Manhattan Apartment', price: 2000, category: 'Property', description: 'Stylish city apartment', modernValue: '$2,000,000' }
  ],
  fifties: [
    { id: 'milkshake', name: 'Chocolate Milkshake', price: 1, category: 'Food', description: 'Thick milkshake from the soda fountain', modernValue: '$8' },
    { id: 'dress', name: 'Circle Skirt Dress', price: 15, category: 'Clothing', description: 'Popular 1950s style dress', modernValue: '$150' },
    { id: 'car', name: 'Chevrolet Bel Air', price: 2000, category: 'Transport', description: 'Classic American car', modernValue: '$200,000' },
    { id: 'tv', name: 'Television Set', price: 300, category: 'Electronics', description: 'Black and white TV', modernValue: '$3,000' },
    { id: 'house', name: 'Suburban House', price: 8000, category: 'Property', description: 'Perfect suburban home', modernValue: '$800,000' },
    { id: 'appliances', name: 'Kitchen Appliances', price: 500, category: 'Home', description: 'Modern kitchen set', modernValue: '$5,000' }
  ],
  eighties: [
    { id: 'walkman', name: 'Sony Walkman', price: 200, category: 'Electronics', description: 'Portable music player', modernValue: '$500' },
    { id: 'computer', name: 'Apple IIe', price: 1400, category: 'Electronics', description: 'Personal computer', modernValue: '$14,000' },
    { id: 'vcr', name: 'VHS Player', price: 400, category: 'Electronics', description: 'Video cassette recorder', modernValue: '$1,000' },
    { id: 'phone', name: 'Mobile Phone', price: 4000, category: 'Electronics', description: 'Motorola DynaTAC', modernValue: '$10,000' },
    { id: 'jacket', name: 'Leather Jacket', price: 150, category: 'Clothing', description: 'Cool leather jacket', modernValue: '$500' },
    { id: 'condo', name: 'City Condo', price: 50000, category: 'Property', description: 'Modern city condominium', modernValue: '$500,000' }
  ]
}

export const investmentOutcomes = {
  roman: {
    'villa': { year2024: 50000000, description: 'Prime Roman real estate is priceless' },
    'wine': { year2024: 0, description: 'The wine has long since turned to vinegar' }
  },
  medieval: {
    'castle': { year2024: 100000000, description: 'Medieval castles are now tourist attractions' },
    'manuscript': { year2024: 10000000, description: 'Rare manuscripts are museum pieces' }
  },
  renaissance: {
    'painting': { year2024: 500000000, description: 'Renaissance art is beyond valuable' },
    'books': { year2024: 1000000, description: 'First edition books are collector items' }
  },
  victorian: {
    'mansion': { year2024: 200000000, description: 'London real estate has exploded in value' },
    'piano': { year2024: 500000, description: 'Antique pianos are valuable collectibles' }
  },
  twenties: {
    'stocks': { year2024: 0, description: 'The 1929 crash wiped out your investment' },
    'car': { year2024: 2000000, description: 'Classic cars are now worth millions' }
  },
  fifties: {
    'house': { year2024: 5000000, description: 'Suburban real estate has grown tremendously' },
    'car': { year2024: 1000000, description: 'Classic 50s cars are highly sought after' }
  },
  eighties: {
    'computer': { year2024: 50000, description: 'Vintage computers are collector items' },
    'condo': { year2024: 2000000, description: 'City real estate has appreciated well' }
  }
}
