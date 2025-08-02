export const STORAGE_KEYS = {
  searchTerm: 'searchTerm',
  theme: 'theme',
};

export const LocalStorageService = {
  getSearchTerm(key: string): string {
    return localStorage.getItem(key) || '';
  },

  setSearchTerm(key: string, term: string): void {
    localStorage.setItem(key, term);
  },

  clearSearchTerm(key: string): void {
    localStorage.removeItem(key);
  },
};
