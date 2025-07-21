import { LocalStorageService, STORAGE_KEYS } from './local-storage.service';

describe('LocalStorageService', () => {
  const key = STORAGE_KEYS.searchTerm;

  beforeEach(() => {
    localStorage.clear();
  });

  test('setSearchTerm sets item in localStorage', () => {
    LocalStorageService.setSearchTerm(key, 'pikachu');
    expect(localStorage.getItem(key)).toBe('pikachu');
  });

  test('getSearchTerm returns item from localStorage', () => {
    localStorage.setItem(key, 'bulbasaur');
    const term = LocalStorageService.getSearchTerm(key);
    expect(term).toBe('bulbasaur');
  });

  test('getSearchTerm returns empty string if key does not exist', () => {
    const term = LocalStorageService.getSearchTerm('nonexistent');
    expect(term).toBe('');
  });

  test('clearSearchTerm removes item from localStorage', () => {
    localStorage.setItem(key, 'charmander');
    LocalStorageService.clearSearchTerm(key);
    expect(localStorage.getItem(key)).toBeNull();
  });
});
