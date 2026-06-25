export type ID = string;

export type Category =
  | 'Art'
  | 'History'
  | 'Modern'
  | 'Science'
  | 'House-Museum'
  | 'Photography';

export interface Museum {
  id: ID;
  name: string;
  category: Category;
  neighborhood: string;
  city: string;
  distanceMi: number;
  rating: number;
  ratingCount: number;
  heroImage: string;
  thumbnail: string;
  openNow: boolean;
  hoursToday: string;
  admission: string;
  blurb: string;
  exhibits: Exhibit[];
}

export interface Exhibit {
  id: ID;
  title: string;
  dates: string;
  image: string;
  blurb: string;
}

export interface Visit {
  id: ID;
  museumId: ID;
  userId: ID;
  date: string;
  rating: number;
  note?: string;
  photos?: string[];
}

export interface User {
  id: ID;
  name: string;
  handle: string;
  avatar: string;
  bio?: string;
  stats: { visited: number; wishlist: number; cities: number };
  badges: Badge[];
}

export interface Badge {
  id: ID;
  label: string;
  icon: string;
  earnedDate: string;
}

export interface Collection {
  id: ID;
  title: string;
  curator: string;
  museumIds: ID[];
  cover: string;
}

export interface Guide {
  id: ID;
  title: string;
  city: string;
  readMins: number;
  cover: string;
  byline: string;
  stops: { museumId: ID; note: string }[];
}

export type FeedEvent =
  | { id: ID; kind: 'visit'; userId: ID; museumId: ID; at: string; note?: string }
  | { id: ID; kind: 'save'; userId: ID; museumId: ID; at: string }
  | { id: ID; kind: 'milestone'; userId: ID; badgeId: ID; at: string }
  | { id: ID; kind: 'collection'; userId: ID; collectionId: ID; count: number; at: string };

export interface Notification {
  id: ID;
  kind: 'follow' | 'like' | 'comment' | 'milestone';
  userId: ID;
  at: string;
  read: boolean;
  text: string;
}
