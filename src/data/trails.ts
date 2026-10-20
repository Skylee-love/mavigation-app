/**
 * Static content for the demo.
 *
 * The assignment focuses on navigation structure, so the app ships with a small
 * in-memory dataset instead of a network layer. Swapping this module for a real
 * API would not change anything about the navigators.
 */

export type Difficulty = 'Easy' | 'Moderate' | 'Hard' | 'Expert';

export type Trail = {
  id: string;
  name: string;
  region: string;
  distanceKm: number;
  elevationGainM: number;
  durationMin: number;
  difficulty: Difficulty;
  rating: number;
  reviewCount: number;
  /** Emoji used as the artwork of the trail so the app works fully offline. */
  glyph: string;
  /** Accent colour of the trail artwork. */
  accent: string;
  tags: string[];
  summary: string;
  highlights: string[];
  bestSeason: string;
};

export const TRAILS: Trail[] = [
  {
    id: 'cedar-ridge-loop',
    name: 'Cedar Ridge Loop',
    region: 'Forest Park · North trailhead',
    distanceKm: 6.4,
    elevationGainM: 280,
    durationMin: 105,
    difficulty: 'Moderate',
    rating: 4.8,
    reviewCount: 412,
    glyph: '🌲',
    accent: '#1F6F4A',
    tags: ['Forest', 'Loop', 'Dog friendly'],
    summary:
      'A classic ridge traverse through old-growth cedar with two creek crossings and a wide lunch bench at the summit.',
    highlights: ['Quiet weekday mornings', 'Bridge over Cedar Creek', 'Summit views of the valley'],
    bestSeason: 'May – September',
  },
  {
    id: 'harbor-lighthouse-point',
    name: 'Harbor Lighthouse Point',
    region: 'Coast Range · East car park',
    distanceKm: 3.1,
    elevationGainM: 120,
    durationMin: 60,
    difficulty: 'Easy',
    rating: 4.6,
    reviewCount: 288,
    glyph: '🌊',
    accent: '#2A6F97',
    tags: ['Coast', 'Short', 'Sunrise'],
    summary:
      'A flat coastal out-and-back that ends on the rocks below the 1911 lighthouse. Best walked at sunrise.',
    highlights: ['Flat gravel path', 'Coffee cart in the car park', 'Sea lions on the rocks'],
    bestSeason: 'All year',
  },
  {
    id: 'granite-falls-overlook',
    name: 'Granite Falls Overlook',
    region: 'Alpine valley · Upper lot',
    distanceKm: 11.8,
    elevationGainM: 940,
    durationMin: 240,
    difficulty: 'Hard',
    rating: 4.9,
    reviewCount: 731,
    glyph: '⛰️',
    accent: '#6B4C9A',
    tags: ['Alpine', 'Big views', 'Waterfall'],
    summary:
      'A steep half-day climb to a glassy waterfall basin. The last kilometre is a scramble, so good shoes matter.',
    highlights: ['Waterfall basin', 'Alpine tarns', '360° summit panorama'],
    bestSeason: 'July – October',
  },
  {
    id: 'willow-creek-paths',
    name: 'Willow Creek Pathways',
    region: 'River valley · Village end',
    distanceKm: 4.8,
    elevationGainM: 90,
    durationMin: 75,
    difficulty: 'Easy',
    rating: 4.4,
    reviewCount: 196,
    glyph: '🌿',
    accent: '#3F7D3F',
    tags: ['Riverside', 'Accessible', 'Picnic'],
    summary:
      'Wide gravel paths that follow the river past the old mill. Mostly flat, with benches every few hundred metres.',
    highlights: ['Step-free route', 'Mill ruins', 'Duck colony by the weir'],
    bestSeason: 'April – November',
  },
  {
    id: 'granite-summit-spur',
    name: 'Granite Summit Spur',
    region: 'Alpine valley · Upper lot',
    distanceKm: 17.5,
    elevationGainM: 1480,
    durationMin: 420,
    difficulty: 'Expert',
    rating: 4.7,
    reviewCount: 154,
    glyph: '🧗',
    accent: '#A1441F',
    tags: ['Technical', 'Scramble', 'Sunrise start'],
    summary:
      'The serious option: exposed ridgeline, loose scree and a summit push that needs a head for heights.',
    highlights: ['Ridgeline traverse', 'Scree descent', 'Requires early start'],
    bestSeason: 'August – September',
  },
  {
    id: 'orchard-vineyard-loop',
    name: 'Orchard & Vineyard Loop',
    region: 'Farm country · Vine gate',
    distanceKm: 8.2,
    elevationGainM: 160,
    durationMin: 120,
    difficulty: 'Moderate',
    rating: 4.5,
    reviewCount: 265,
    glyph: '🍇',
    accent: '#8E5A9B',
    tags: ['Countryside', 'Tasting', 'Cycle friendly'],
    summary:
      'A gentle loop through apple orchards and a small vineyard, with a tasting shed halfway around the route.',
    highlights: ['Cider tasting', 'Old stone barns', 'Flat, wide tracks'],
    bestSeason: 'September – October',
  },
  {
    id: 'pine-falls-circuit',
    name: 'Pine Falls Circuit',
    region: 'Forest Park · South trailhead',
    distanceKm: 5.2,
    elevationGainM: 210,
    durationMin: 90,
    difficulty: 'Moderate',
    rating: 4.3,
    reviewCount: 173,
    glyph: '💧',
    accent: '#2C7A7B',
    tags: ['Waterfall', 'Family', 'Picnic'],
    summary:
      'A shady loop through second-growth pine to a 12 metre waterfall with a big flat picnic area.',
    highlights: ['Swimmable pool', 'Easy parking', 'Covered picnic shelter'],
    bestSeason: 'May – September',
  },
  {
    id: 'highland-meadow-walk',
    name: 'Highland Meadow Walk',
    region: 'Upland farms · Ridge gate',
    distanceKm: 7.7,
    elevationGainM: 410,
    durationMin: 135,
    difficulty: 'Hard',
    rating: 4.4,
    reviewCount: 98,
    glyph: '🌾',
    accent: '#B4620F',
    tags: ['Open country', 'Wildlife', 'Sunset'],
    summary:
      'An exposed upland route across grazing meadow. Open to the weather, but the sunset colours are worth it.',
    highlights: ['Deer at dusk', 'Old stone walls', 'Wide open skies'],
    bestSeason: 'June – September',
  },
];

export function getTrailById(id: string): Trail | undefined {
  return TRAILS.find((trail) => trail.id === id);
}

export const DIFFICULTIES: Difficulty[] = ['Easy', 'Moderate', 'Hard', 'Expert'];

/** Fixed (scheme independent) tone for every difficulty badge. */
export const DifficultyTone: Record<Difficulty, { fg: string; bg: string }> = {
  Easy: { fg: '#1F6F4A', bg: '#E3F0E8' },
  Moderate: { fg: '#8A5A00', bg: '#FBEEDC' },
  Hard: { fg: '#A1441F', bg: '#FAE7DF' },
  Expert: { fg: '#8E2A5A', bg: '#F7E4EF' },
};
