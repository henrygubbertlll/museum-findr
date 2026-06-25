/**
 * Repository — backs screens with mock seed data.
 * All functions return Promises so swapping to a real API is a one-file change.
 */
import type { Category, ID, Museum, Visit, User, FeedEvent, Collection, Guide, Notification } from './types';
import {
  museums,
  museumsById,
  allUsers,
  visits as seedVisits,
  feedEvents,
  collections,
  guides,
  notifications as seedNotifications,
} from './seed';
import { useStore } from '../store';

// Helpers
const delay = <T>(value: T): Promise<T> => Promise.resolve(value);

export function getNearbyMuseums(filter?: Category): Promise<Museum[]> {
  const list = filter ? museums.filter((m) => m.category === filter) : museums;
  return delay(list);
}

export function getMuseum(id: ID): Promise<Museum> {
  const m = museumsById[id];
  if (!m) return Promise.reject(new Error(`Museum ${id} not found`));
  return delay(m);
}

export function getLogbook(userId: ID): Promise<Visit[]> {
  const store = useStore.getState();
  const all = [...seedVisits, ...store.localVisits];
  return delay(all.filter((v) => v.userId === userId));
}

export function getWishlist(userId: ID): Promise<Museum[]> {
  void userId; // in v1, wishlist is global (single user)
  const store = useStore.getState();
  return delay(store.wishlist.map((id) => museumsById[id]).filter(Boolean) as Museum[]);
}

export async function logVisit(input: Omit<Visit, 'id'>): Promise<Visit> {
  const visit: Visit = { ...input, id: `v_${Date.now()}` };
  useStore.getState().addVisit(visit);
  return delay(visit);
}

export function toggleSave(userId: ID, museumId: ID): Promise<boolean> {
  void userId;
  const saved = useStore.getState().toggleWishlist(museumId);
  return delay(saved);
}

export function getFeed(userId: ID): Promise<FeedEvent[]> {
  void userId;
  return delay(feedEvents);
}

export function getCollections(): Promise<Collection[]> {
  return delay(collections);
}

export function getGuide(id: ID): Promise<Guide> {
  const g = guides.find((x) => x.id === id);
  if (!g) return Promise.reject(new Error(`Guide ${id} not found`));
  return delay(g);
}

export function getUser(id: ID): Promise<User> {
  const u = allUsers[id];
  if (!u) return Promise.reject(new Error(`User ${id} not found`));
  return delay(u);
}

export function getNotifications(userId: ID): Promise<Notification[]> {
  void userId;
  return delay(seedNotifications);
}
