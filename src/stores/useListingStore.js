import { create } from 'zustand';

const useListingStore = create((set) => ({
  searchTerm: '',
  searchResults: [],
  currentListing: null,
  isEditModalOpen: false,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchResults: (results) => set({ searchResults: results }),
  setCurrentListing: (listing) => set({ currentListing: listing }),
  clearCurrentListing: () => set({ currentListing: null }),
  setIsEditModalOpen: (val) => set({ isEditModalOpen: val }),
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
