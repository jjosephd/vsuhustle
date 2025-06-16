import { create } from 'zustand';

const useListingStore = create((set) => ({
  searchTerm: '',
  searchResults: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchResults: (results) => set({ searchResults: results }),
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
