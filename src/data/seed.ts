import type { Museum, User, Visit, Collection, Guide, FeedEvent, Notification } from './types';

// Placeholder images — using picsum with seeds for determinism
const img = (seed: string, w = 800, h = 500) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const museums: Museum[] = [
  {
    id: 'm1',
    name: 'The Frick Collection',
    category: 'Art',
    neighborhood: 'Upper East Side',
    city: 'New York',
    distanceMi: 0.4,
    rating: 4.9,
    ratingCount: 2400,
    heroImage: img('frick', 800, 500),
    thumbnail: img('frick', 120, 120),
    openNow: true,
    hoursToday: 'Open till 6 pm',
    admission: '$22 · Pay what you wish Thu',
    blurb:
      'A Gilded Age mansion turned intimate gallery — Vermeer, Rembrandt, and Fragonard in rooms that feel like someone still lives there.',
    exhibits: [
      {
        id: 'e1a',
        title: 'The Vermeer Room',
        dates: 'Permanent',
        image: img('vermeer', 400, 250),
        blurb: 'Three Vermeers hang in one room — a rare confluence.',
      },
      {
        id: 'e1b',
        title: 'Fragonard Room',
        dates: 'Permanent',
        image: img('fragonard', 400, 250),
        blurb: 'Four large panels depicting The Progress of Love.',
      },
    ],
  },
  {
    id: 'm2',
    name: 'The Met',
    category: 'Art',
    neighborhood: '5th Ave',
    city: 'New York',
    distanceMi: 1.1,
    rating: 4.9,
    ratingCount: 18200,
    heroImage: img('met-museum', 800, 500),
    thumbnail: img('met-museum', 120, 120),
    openNow: true,
    hoursToday: 'Open till 9 pm',
    admission: 'Pay what you wish',
    blurb:
      'One of the world\'s largest art museums, spanning 5,000 years across every civilization.',
    exhibits: [
      {
        id: 'e2a',
        title: 'The Greek and Roman Galleries',
        dates: 'Permanent',
        image: img('greek-roman', 400, 250),
        blurb: 'Marble sculptures and ancient artifacts in airy neoclassical rooms.',
      },
      {
        id: 'e2b',
        title: 'Van Gogh: Cypresses',
        dates: 'Through Sep 2026',
        image: img('van-gogh', 400, 250),
        blurb: 'The Met\'s beloved Van Gogh landscapes examined through cypress trees.',
      },
    ],
  },
  {
    id: 'm3',
    name: 'MoMA',
    category: 'Modern',
    neighborhood: 'Midtown',
    city: 'New York',
    distanceMi: 0.4,
    rating: 4.8,
    ratingCount: 9700,
    heroImage: img('moma', 800, 500),
    thumbnail: img('moma', 120, 120),
    openNow: true,
    hoursToday: 'Open till 9 pm',
    admission: '$30',
    blurb:
      'The permanent home of Starry Night, Les Demoiselles d\'Avignon, and the canon of modern and contemporary art.',
    exhibits: [
      {
        id: 'e3a',
        title: 'Painting and Sculpture Collection',
        dates: 'Permanent',
        image: img('moma-painting', 400, 250),
        blurb: 'From Cézanne to de Kooning — the 20th century in one building.',
      },
    ],
  },
  {
    id: 'm4',
    name: 'Whitney Museum',
    category: 'Modern',
    neighborhood: 'Meatpacking',
    city: 'New York',
    distanceMi: 0.8,
    rating: 4.7,
    ratingCount: 5300,
    heroImage: img('whitney', 800, 500),
    thumbnail: img('whitney', 120, 120),
    openNow: true,
    hoursToday: 'Open till 10 pm',
    admission: '$25',
    blurb:
      'The definitive showcase for American art from the 20th century to today, with sweeping views of the Hudson.',
    exhibits: [
      {
        id: 'e4a',
        title: 'Whitney Biennial 2024',
        dates: 'Through Aug 2026',
        image: img('biennial', 400, 250),
        blurb: 'The most talked-about survey of contemporary American art.',
      },
    ],
  },
  {
    id: 'm5',
    name: 'Solomon R. Guggenheim',
    category: 'Modern',
    neighborhood: 'Upper East Side',
    city: 'New York',
    distanceMi: 0.6,
    rating: 4.6,
    ratingCount: 7100,
    heroImage: img('guggenheim', 800, 500),
    thumbnail: img('guggenheim', 120, 120),
    openNow: true,
    hoursToday: 'Open till 8 pm',
    admission: '$30',
    blurb:
      'Frank Lloyd Wright\'s spiraling rotunda is as much the attraction as the Kandinsky and Brancusi inside.',
    exhibits: [
      {
        id: 'e5a',
        title: 'Thannhauser Collection',
        dates: 'Permanent',
        image: img('thannhauser', 400, 250),
        blurb: 'Impressionist and Post-Impressionist masterworks including Picasso.',
      },
    ],
  },
  {
    id: 'm6',
    name: 'The Met Cloisters',
    category: 'History',
    neighborhood: 'Fort Tryon',
    city: 'New York',
    distanceMi: 1.2,
    rating: 4.8,
    ratingCount: 3100,
    heroImage: img('cloisters', 800, 500),
    thumbnail: img('cloisters', 120, 120),
    openNow: false,
    hoursToday: 'Closed today',
    admission: 'Pay what you wish',
    blurb:
      'Medieval art and architecture tucked into Fort Tryon Park — a cloister, a chapel, and the Unicorn Tapestries.',
    exhibits: [
      {
        id: 'e6a',
        title: 'The Unicorn Tapestries',
        dates: 'Permanent',
        image: img('unicorn', 400, 250),
        blurb: 'Seven 15th-century tapestries of extraordinary richness and mystery.',
      },
    ],
  },
  {
    id: 'm7',
    name: 'Neue Galerie',
    category: 'Art',
    neighborhood: 'Upper East Side',
    city: 'New York',
    distanceMi: 0.9,
    rating: 4.5,
    ratingCount: 1800,
    heroImage: img('neue-galerie', 800, 500),
    thumbnail: img('neue-galerie', 120, 120),
    openNow: true,
    hoursToday: 'Open till 6 pm',
    admission: '$25',
    blurb:
      'German and Austrian art from 1890–1940 — Klimt\'s Woman in Gold, Schiele, and the Wiener Werkstätte.',
    exhibits: [
      {
        id: 'e7a',
        title: 'Klimt & Schiele',
        dates: 'Permanent',
        image: img('klimt', 400, 250),
        blurb: 'The crown jewel of the Neue — Klimt\'s golden masterworks in one quiet room.',
      },
    ],
  },
];

export const currentUser: User = {
  id: 'u0',
  name: 'Ava Mercer',
  handle: '@avamercer',
  avatar: img('ava-avatar', 200, 200),
  bio: 'Chasing beautiful rooms in every city.',
  stats: { visited: 24, wishlist: 11, cities: 7 },
  badges: [
    { id: 'b1', label: 'Museum Mile', icon: 'medal', earnedDate: '2025-09-12' },
    { id: 'b2', label: 'Opening Day', icon: 'sparkle', earnedDate: '2025-11-01' },
    { id: 'b3', label: 'World Traveler', icon: 'globe', earnedDate: '2026-03-05' },
  ],
};

export const friends: User[] = [
  {
    id: 'u1',
    name: 'Clara Vance',
    handle: '@clarav',
    avatar: img('clara-avatar', 200, 200),
    bio: 'Art historian, slow visitor.',
    stats: { visited: 41, wishlist: 18, cities: 12 },
    badges: [],
  },
  {
    id: 'u2',
    name: 'Owen Reid',
    handle: '@owenr',
    avatar: img('owen-avatar', 200, 200),
    bio: 'Architecture first, paintings second.',
    stats: { visited: 31, wishlist: 22, cities: 9 },
    badges: [],
  },
  {
    id: 'u3',
    name: 'Margot Chen',
    handle: '@margotc',
    avatar: img('margot-avatar', 200, 200),
    bio: undefined,
    stats: { visited: 19, wishlist: 7, cities: 5 },
    badges: [],
  },
];

export const visits: Visit[] = [
  {
    id: 'v1',
    museumId: 'm6',
    userId: 'u0',
    date: '2026-06-18',
    rating: 5,
    note: 'Spent the afternoon in the tapestry hall.',
  },
  {
    id: 'v2',
    museumId: 'm4',
    userId: 'u0',
    date: '2026-06-11',
    rating: 5,
    note: 'Biennial — all the better for it.',
  },
  {
    id: 'v3',
    museumId: 'm7',
    userId: 'u0',
    date: '2026-06-02',
    rating: 4,
    note: undefined,
  },
];

export const collections: Collection[] = [
  {
    id: 'c1',
    title: 'Quiet Rooms',
    curator: 'The Editors',
    museumIds: ['m1', 'm7', 'm6'],
    cover: img('quiet-rooms', 400, 300),
  },
  {
    id: 'c2',
    title: 'Modern',
    curator: 'The Editors',
    museumIds: ['m3', 'm4', 'm5'],
    cover: img('modern-art', 400, 300),
  },
  {
    id: 'c3',
    title: 'House-Museums',
    curator: 'The Editors',
    museumIds: ['m1', 'm7'],
    cover: img('house-museum', 400, 300),
  },
];

export const guides: Guide[] = [
  {
    id: 'g1',
    title: 'A Day on Museum Mile',
    city: 'New York',
    readMins: 6,
    cover: img('museum-mile', 800, 400),
    byline: 'By the Editors',
    stops: [
      { museumId: 'm2', note: 'Start with the Greek and Roman Galleries — arrive early.' },
      { museumId: 'm5', note: 'Walk the spiral ramp top-to-bottom.' },
      { museumId: 'm7', note: 'Finish with Klimt. Have a coffee at the Café Sabarsky.' },
    ],
  },
];

export const feedEvents: FeedEvent[] = [
  {
    id: 'f1',
    kind: 'visit',
    userId: 'u1',
    museumId: 'm1',
    at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    note: 'The Vermeer room alone is worth the trip.',
  },
  {
    id: 'f2',
    kind: 'collection',
    userId: 'u2',
    collectionId: 'c2',
    count: 3,
    at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'f3',
    kind: 'milestone',
    userId: 'u1',
    badgeId: 'b1',
    at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'f4',
    kind: 'visit',
    userId: 'u3',
    museumId: 'm3',
    at: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    note: 'Starry Night never gets old.',
  },
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    kind: 'follow',
    userId: 'u1',
    at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    read: false,
    text: 'Clara Vance started following you.',
  },
  {
    id: 'n2',
    kind: 'like',
    userId: 'u2',
    at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    read: false,
    text: 'Owen Reid liked your visit to The Met Cloisters.',
  },
  {
    id: 'n3',
    kind: 'milestone',
    userId: 'u0',
    at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    text: 'You earned the Museum Mile badge!',
  },
];

// All users keyed by id for quick lookup
export const allUsers: Record<string, User> = {
  u0: currentUser,
  u1: friends[0],
  u2: friends[1],
  u3: friends[2],
};

// All museums keyed by id
export const museumsById: Record<string, Museum> = Object.fromEntries(
  museums.map((m) => [m.id, m])
);
