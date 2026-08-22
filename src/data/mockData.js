// Mock Data for GlobeTrotter Application
import userPhoto1 from '../photos/WhatsApp Image 2026-08-22 at 2.40.51 PM.jpeg';
import userPhoto2 from '../photos/WhatsApp Image 2026-08-22 at 2.40.52 PM (1).jpeg';
import userPhoto3 from '../photos/WhatsApp Image 2026-08-22 at 2.40.52 PM (2).jpeg';
import userPhoto4 from '../photos/WhatsApp Image 2026-08-22 at 2.40.52 PM (3).jpeg';
import userPhoto5 from '../photos/WhatsApp Image 2026-08-22 at 2.40.52 PM.jpeg';
import userPhoto6 from '../photos/WhatsApp Image 2026-08-22 at 2.40.53 PM (1).jpeg';
import userPhoto7 from '../photos/WhatsApp Image 2026-08-22 at 2.40.53 PM (2).jpeg';
import userPhoto8 from '../photos/WhatsApp Image 2026-08-22 at 2.40.53 PM (3).jpeg';
import userPhoto9 from '../photos/WhatsApp Image 2026-08-22 at 2.40.53 PM.jpeg';
import userPhoto10 from '../photos/WhatsApp Image 2026-08-22 at 2.40.54 PM.jpeg';

export const initialTrips = [
  {
    id: 'trip-1',
    title: 'Incredible Golden Triangle & Heritage',
    destination: 'Agra, Jaipur & Delhi, India',
    startDate: '2026-10-10',
    endDate: '2026-10-18',
    days: 8,
    status: 'ongoing',
    coverImage: userPhoto10,
    budget: 2800,
    spent: 1450,
    destinationsCount: 3,
    description: 'Iconic journey through the marble wonder of Taj Mahal, the pink sandstone palaces of Jaipur, and Mughal architecture of Old Delhi.',
    travelStyle: ['Culture', 'Heritage', 'Photography'],
    stops: [
      {
        id: 'stop-1',
        city: 'Agra',
        country: 'India',
        arrivalDate: '2026-10-10',
        departureDate: '2026-10-13',
        image: userPhoto10,
        activities: [
          {
            id: 'act-1',
            time: '06:00 AM',
            title: 'Sunrise Taj Mahal Guided Tour',
            location: 'Dharmapuri, Forest Colony, Tajganj, Agra',
            cost: 25,
            category: 'Heritage',
            period: 'Morning',
            notes: 'Catch the ethereal morning light over the Yamuna River.',
          },
          {
            id: 'act-2',
            time: '02:00 PM',
            title: 'Agra Fort Mughal Heritage Walk',
            location: 'Agra Fort, Rakabganj',
            cost: 15,
            category: 'Culture',
            period: 'Afternoon',
            notes: 'Explore Jahangiri Mahal and Diwan-i-Khas.',
          }
        ]
      },
      {
        id: 'stop-2',
        city: 'Jaipur',
        country: 'India',
        arrivalDate: '2026-10-13',
        departureDate: '2026-10-16',
        image: userPhoto4,
        activities: [
          {
            id: 'act-3',
            time: '09:30 AM',
            title: 'Hawa Mahal & City Palace Royal Tour',
            location: 'Hawa Mahal Rd, Badi Choupad, Jaipur',
            cost: 20,
            category: 'Heritage',
            period: 'Morning',
            notes: '953 intricately carved jharokha windows.',
          }
        ]
      }
    ]
  },
  {
    id: 'trip-2',
    title: 'Sacred Amritsar & Golden Temple Escape',
    destination: 'Amritsar, Punjab, India',
    startDate: '2026-11-05',
    endDate: '2026-11-10',
    days: 5,
    status: 'upcoming',
    coverImage: userPhoto2,
    budget: 1600,
    spent: 420,
    destinationsCount: 1,
    description: 'Spiritual tranquility at Sri Harmandir Sahib, holy sarovar dip, community langar kitchen seva, and Wagah border ceremony.',
    travelStyle: ['Spiritual', 'Culinary', 'Culture'],
    stops: []
  },
  {
    id: 'trip-3',
    title: 'High Altitude Ladakh & Pangong Lake',
    destination: 'Leh & Pangong Tso, Ladakh, India',
    startDate: '2026-06-15',
    endDate: '2026-06-23',
    days: 8,
    status: 'completed',
    coverImage: userPhoto9,
    budget: 2200,
    spent: 2150,
    destinationsCount: 2,
    description: 'Challenging high-altitude motorable passes, crystal-blue saline waters of Pangong Tso, and ancient Tibetan monasteries.',
    travelStyle: ['Adventure', 'Nature', 'Photography'],
    stops: []
  }
];

export const mockDestinations = [
  {
    id: 'dest-1',
    city: 'Amritsar (Golden Temple)',
    country: 'Punjab, India',
    region: 'Asia',
    costIndex: '$$',
    avgDailyCost: 65,
    popularity: 99,
    image: userPhoto2,
    description: 'Sri Harmandir Sahib, the holiest Sikh gurdwara with glistening gilded gold architecture surrounded by the sacred Amrit Sarovar lake.',
    tags: ['Spiritual', 'Heritage', 'Culture', 'Culinary'],
    bestSeason: 'October - March',
    rating: 4.98,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Golden_Temple',
  },
  {
    id: 'dest-2',
    city: 'Hampi (Stone Chariot)',
    country: 'Karnataka, India',
    region: 'Asia',
    costIndex: '$$',
    avgDailyCost: 75,
    popularity: 96,
    image: userPhoto3,
    description: 'UNESCO World Heritage Vijayanagara ruins featuring the legendary monolithic Stone Chariot at the Vijaya Vittala temple complex.',
    tags: ['Ancient History', 'Architecture', 'UNESCO', 'Photography'],
    bestSeason: 'November - February',
    rating: 4.95,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Hampi',
  },
  {
    id: 'dest-3',
    city: 'Jaipur (Hawa Mahal)',
    country: 'Rajasthan, India',
    region: 'Asia',
    costIndex: '$$$',
    avgDailyCost: 110,
    popularity: 97,
    image: userPhoto4,
    description: 'The iconic Palace of Winds built from pink and red sandstone with 953 honeycomb jharokhas designed for royal Rajput women.',
    tags: ['Royal Palaces', 'Heritage', 'Culture', 'Architecture'],
    bestSeason: 'October - March',
    rating: 4.92,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Hawa_Mahal',
  },
  {
    id: 'dest-4',
    city: 'Palolem Beach',
    country: 'Goa, India',
    region: 'Asia',
    costIndex: '$$',
    avgDailyCost: 85,
    popularity: 94,
    image: userPhoto5,
    description: 'Crescent-shaped white sand haven bordered by lush coconut groves, calm turquoise waters, vibrant shacks, and dolphin cruises.',
    tags: ['Beach', 'Relaxation', 'Water Sports', 'Sunset'],
    bestSeason: 'November - April',
    rating: 4.88,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Palolem_Beach',
  },
  {
    id: 'dest-5',
    city: 'Sela Pass & Tawang',
    country: 'Arunachal Pradesh, India',
    region: 'Asia',
    costIndex: '$$$',
    avgDailyCost: 120,
    popularity: 93,
    image: userPhoto6,
    description: 'High altitude Himalayan mountain pass at 13,700 ft with sacred colorful Buddhist prayer flags and frozen Paradise Lake.',
    tags: ['Himalayas', 'Adventure', 'Monasteries', 'Snow'],
    bestSeason: 'March - May / Sep - Nov',
    rating: 4.91,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sela_Pass',
  },
  {
    id: 'dest-6',
    city: 'Red Fort (Lal Qila)',
    country: 'Old Delhi, India',
    region: 'Asia',
    costIndex: '$$',
    avgDailyCost: 70,
    popularity: 95,
    image: userPhoto7,
    description: 'Magnificent 17th-century Mughal red sandstone citadel built by Emperor Shah Jahan on the banks of the Yamuna River.',
    tags: ['Mughal Heritage', 'History', 'Museums', 'UNESCO'],
    bestSeason: 'October - March',
    rating: 4.86,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Red_Fort',
  },
  {
    id: 'dest-7',
    city: 'Meenakshi Amman Temple',
    country: 'Madurai, Tamil Nadu, India',
    region: 'Asia',
    costIndex: '$$',
    avgDailyCost: 60,
    popularity: 97,
    image: userPhoto8,
    description: 'Legendary Dravidian architectural masterpiece adorned with 14 colossal gopurams decorated with thousands of colorful mythological sculptures.',
    tags: ['Dravidian Temple', 'Spiritual', 'Sculptures', 'Culture'],
    bestSeason: 'October - March',
    rating: 4.96,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Meenakshi_Temple',
  },
  {
    id: 'dest-8',
    city: 'Pangong Tso Lake',
    country: 'Ladakh, India',
    region: 'Asia',
    costIndex: '$$$',
    avgDailyCost: 130,
    popularity: 98,
    image: userPhoto9,
    description: 'Breathtaking endorheic high-altitude lake sitting at 14,270 ft, famous for shifting shades of cobalt blue, turquoise, and emerald green.',
    tags: ['High Altitude Lake', 'Scenic', 'Adventure', 'Mountains'],
    bestSeason: 'May - September',
    rating: 4.97,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Pangong_Tso',
  },
  {
    id: 'dest-9',
    city: 'Taj Mahal',
    country: 'Agra, Uttar Pradesh, India',
    region: 'Asia',
    costIndex: '$$$',
    avgDailyCost: 100,
    popularity: 100,
    image: userPhoto10,
    description: 'Immense white marble mausoleum built by Mughal emperor Shah Jahan, universally admired as one of the Seven Wonders of the World.',
    tags: ['Wonder of World', 'Mughal', 'UNESCO', 'Monument of Love'],
    bestSeason: 'October - March',
    rating: 4.99,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Taj_Mahal',
  },
  {
    id: 'dest-10',
    city: 'Marine Drive (Queen’s Necklace)',
    country: 'Mumbai, Maharashtra, India',
    region: 'Asia',
    costIndex: '$$$$',
    avgDailyCost: 160,
    popularity: 96,
    image: userPhoto1,
    description: 'Famous 3.6-kilometre-long seaside promenade along Netaji Subhash Chandra Bose Road with shimmering arc lights and Arabian Sea views.',
    tags: ['Coastal Promenade', 'Cityscape', 'Nightlife', 'Sunset'],
    bestSeason: 'November - February',
    rating: 4.93,
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Marine_Drive,_Mumbai',
  }
];

export const mockActivities = [
  {
    id: 'act-cat-1',
    city: 'Florence',
    title: 'Uffizi & Accademia VIP Small Group Pass',
    category: 'Culture',
    duration: '3.5 hours',
    cost: 95,
    rating: 4.95,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?q=80&w=600&auto=format&fit=crop',
    description: 'Marvel at Michelangelo’s David and Botticelli’s Birth of Venus with an art historian.',
  },
  {
    id: 'act-cat-2',
    city: 'Tuscany',
    title: 'Hot Air Balloon Flight over Chianti Hills',
    category: 'Adventure',
    duration: '4 hours',
    cost: 290,
    rating: 4.98,
    reviewsCount: 680,
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=600&auto=format&fit=crop',
    description: 'Sunrise flight above cypress trees, olive groves, and castles followed by a sparkling wine breakfast.',
  },
  {
    id: 'act-cat-3',
    city: 'Florence',
    title: 'Tuscan Farmhouse Truffle Hunting & Cooking',
    category: 'Food',
    duration: '5 hours',
    cost: 140,
    rating: 4.92,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop',
    description: 'Forage for fresh truffles in private oak woods accompanied by trained lagotto dogs.',
  },
  {
    id: 'act-cat-4',
    city: 'Santorini',
    title: 'Catamaran Sunset Cruise with Greek BBQ',
    category: 'Sightseeing',
    duration: '5 hours',
    cost: 160,
    rating: 4.97,
    reviewsCount: 2150,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop',
    description: 'Sail to Red Beach, White Beach, and swim in volcanic hot springs with fresh seafood grill on board.',
  },
  {
    id: 'act-cat-5',
    city: 'Kyoto',
    title: 'Private Bamboo Grove & Zen Meditation at Dawn',
    category: 'Nature',
    duration: '2.5 hours',
    cost: 75,
    rating: 4.91,
    reviewsCount: 540,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
    description: 'Experience pure stillness in Arashiyama before the world wakes, guided by a local Zen practitioner.',
  },
  {
    id: 'act-cat-6',
    city: 'Amalfi Coast',
    title: 'Vintage Alfa Romeo Coastal Driving Experience',
    category: 'Adventure',
    duration: '6 hours',
    cost: 320,
    rating: 4.94,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop',
    description: 'Drive along the iconic curves of Positano, Praiano, and Ravello in a classic open-top convertible.',
  }
];

export const mockCommunityPosts = [
  {
    id: 'post-1',
    author: {
      name: 'Elena Rostova',
      handle: '@elenatravels',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      badge: 'Verified Explorer'
    },
    date: '2 hours ago',
    title: 'Secret vantage point in Val d’Orcia away from tourist crowds',
    content: 'If you are visiting Pienza, wake up at 5:45 AM and head toward Cappella della Madonna di Vitaleta. The morning ground mist rolling over the wheat fields creates pure poetry!',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
    destination: 'Tuscany, Italy',
    likes: 342,
    comments: 48,
    saves: 112,
    tags: ['Tuscany', 'Photography', 'SecretSpot']
  },
  {
    id: 'post-2',
    author: {
      name: 'Kenji Takahashi',
      handle: '@kenji_journeys',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      badge: 'Local Curator'
    },
    date: 'Yesterday',
    title: '7-Day slow travel itinerary for Kyoto during maple season',
    content: 'Sharing my complete autumn guide! Includes little-known sub-temples like Enko-ji and Gio-ji where you can enjoy tea overlooking moss gardens without lines.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    destination: 'Kyoto, Japan',
    likes: 589,
    comments: 76,
    saves: 245,
    tags: ['Japan', 'Itinerary', 'Autumn']
  },
  {
    id: 'post-3',
    author: {
      name: 'Sophia Laurent',
      handle: '@sophia_escapes',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      badge: 'Adventure Writer'
    },
    date: '3 days ago',
    title: 'Budgeting for Santorini without compromising on luxury',
    content: 'Staying in Imerovigli instead of Oia saved us nearly 40% on caldera view suites while giving us the most peaceful sunsets on the island. Here is our full breakdown.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop',
    destination: 'Santorini, Greece',
    likes: 421,
    comments: 63,
    saves: 198,
    tags: ['Budgeting', 'Santorini', 'LuxuryTips']
  }
];

export const mockAdminStats = {
  totalUsers: '28,450',
  totalTrips: '46,120',
  activeUsers: '14,230',
  avgTripDuration: '6.4 Days',
  userGrowth: [
    { month: 'May', users: 18200 },
    { month: 'Jun', users: 21400 },
    { month: 'Jul', users: 24900 },
    { month: 'Aug', users: 28450 }
  ],
  tripsGrowth: [
    { month: 'May', count: 31000 },
    { month: 'Jun', count: 36500 },
    { month: 'Jul', count: 41200 },
    { month: 'Aug', count: 46120 }
  ],
  popularCities: [
    { name: 'Florence & Tuscany', country: 'Italy', trips: 14200, growth: '+18%' },
    { name: 'Kyoto', country: 'Japan', trips: 11800, growth: '+24%' },
    { name: 'Santorini', country: 'Greece', trips: 9600, growth: '+12%' },
    { name: 'Amalfi Coast', country: 'Italy', trips: 8400, growth: '+15%' },
    { name: 'Banff National Park', country: 'Canada', trips: 7200, growth: '+9%' }
  ],
  recentUsersList: [
    { id: 'usr-1', name: 'Marcus Sterling', email: 'marcus@example.com', tripsCount: 4, joined: 'Aug 18, 2026', role: 'Explorer' },
    { id: 'usr-2', name: 'Amira Al-Mansoor', email: 'amira@example.com', tripsCount: 7, joined: 'Aug 16, 2026', role: 'Curator' },
    { id: 'usr-3', name: 'Clara Beaumont', email: 'clara@example.com', tripsCount: 2, joined: 'Aug 14, 2026', role: 'Explorer' },
    { id: 'usr-4', name: 'David Zhang', email: 'david.z@example.com', tripsCount: 5, joined: 'Aug 10, 2026', role: 'Admin' }
  ]
};
