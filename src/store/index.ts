import { create } from 'zustand';
import type { Category, ID, Visit } from '../data/types';
import { visits as seedVisits } from '../data/seed';

interface StoreState {
  // Wishlist / saved museum IDs
  wishlist: ID[];
  toggleWishlist: (museumId: ID) => boolean; // returns new saved state

  // Logbook — user-initiated visits
  localVisits: Visit[];
  addVisit: (visit: Visit) => void;

  // Active category filter on Discover/Search
  activeFilters: Category[];
  setFilters: (filters: Category[]) => void;
  toggleFilter: (category: Category) => void;
  clearFilters: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Seed the wishlist with a few museums for demo
  wishlist: ['m2', 'm5'],

  toggleWishlist: (museumId) => {
    const current = get().wishlist;
    const isSaved = current.includes(museumId);
    set({ wishlist: isSaved ? current.filter((id) => id !== museumId) : [...current, museumId] });
    return !isSaved;
  },

  // Seed with the sample visits from DATA_MODEL
  localVisits: [],

  addVisit: (visit) =>
    set((state) => ({ localVisits: [visit, ...state.localVisits] })),

  activeFilters: [],

  setFilters: (filters) => set({ activeFilters: filters }),

  toggleFilter: (category) => {
    const current = get().activeFilters;
    set({
      activeFilters: current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category],
    });
  },

  clearFilters: () => set({ activeFilters: [] }),
}));

// Convenience selector — is a museum saved?
export const useIsSaved = (museumId: ID) =>
  useStore((s) => s.wishlist.includes(museumId));
