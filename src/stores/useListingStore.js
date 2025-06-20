import { create } from 'zustand';

const useListingStore = create((set) => ({
  searchTerm: '',
  searchResults: [],
  currentListing: null,
  isEditModalOpen: false,
  listings: [],
  bookings: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchResults: (results) => set({ searchResults: results }),
  setCurrentListing: (listing) => set({ currentListing: listing }),
  clearCurrentListing: () => set({ currentListing: null }),
  setIsEditModalOpen: (val) => set({ isEditModalOpen: val }),
  setListings: (listings) => set({ listings }),
  setBookings: (bookings) => set({ bookings }),
  removeListingById: (id) =>
    set((state) => ({
      listings: state.listings.filter((listing) => listing.id !== id),
    })),
  resetSearch: () =>
    set({
      searchTerm: '',
      searchResults: [],
    }),
  // other filters
  sortByName: false,
  selectedCategory: '',
  setSortByName: (val) => set({ sortByName: val }),
  setSelectedCategory: (val) => set({ selectedCategory: val }),
  resetFilters: () =>
    set({
      sortByName: false,
      selectedCategory: '',
    }),
}));

export default useListingStore;
