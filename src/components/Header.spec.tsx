import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import {
  LocalStorageService,
  STORAGE_KEYS,
} from '../services/local-storage.service';
import { getPokemonList } from '../services/api.service';
import { pokemonsMock } from '../test-utils/pokemons-list-mock';

jest.mock('../services/local-storage.service', () => ({
  LocalStorageService: {
    setSearchTerm: jest.fn(),
    getSearchTerm: jest.fn().mockReturnValue(''),
    clearSearchTerm: jest.fn(),
  },
  STORAGE_KEYS: {
    searchTerm: 'search_term',
  },
}));

jest.mock('../services/api.service', () => ({
  getPokemonList: jest.fn(),
}));

const placeholder = 'Enter pokemon name...';
const setPokemons = jest.fn();
const setIsLoading = jest.fn();
const setPokemonsTotal = jest.fn();

describe('Header', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: light)', // можешь менять true/false
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('saves entered search term to localStorage on search', async () => {
    (getPokemonList as jest.Mock).mockResolvedValue({
      results: pokemonsMock.results,
      count: pokemonsMock.count,
      next: pokemonsMock.next,
      previous: pokemonsMock.previous,
    });

    const { container } = render(
      <Header
        setPokemons={setPokemons}
        setIsLoading={setIsLoading}
        setPokemonsTotal={setPokemonsTotal}
        currentPage={1}
      />
    );

    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'pikachu' } });

    const searchButton = container.querySelector('.search-button');
    if (searchButton) {
      fireEvent.click(searchButton);
      expect(LocalStorageService.setSearchTerm).toHaveBeenCalledWith(
        STORAGE_KEYS.searchTerm,
        'pikachu'
      );
    }
  });

  test('loading state changes during API calls', async () => {
    (getPokemonList as jest.Mock).mockResolvedValue({
      results: pokemonsMock.results,
      count: pokemonsMock.count,
      next: pokemonsMock.next,
      previous: pokemonsMock.previous,
    });

    const { container } = render(
      <Header
        setPokemons={setPokemons}
        setIsLoading={setIsLoading}
        setPokemonsTotal={setPokemonsTotal}
        currentPage={1}
      />
    );

    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'pikachu' } });

    const searchButton = container.querySelector('.search-button');
    if (searchButton) {
      fireEvent.click(searchButton);
      expect(setIsLoading).toHaveBeenCalledWith(true);
      await waitFor(() => {
        expect(setIsLoading).toHaveBeenCalledWith(false);
      });
    }
  });

  test('calls setPokemons with new data after search', async () => {
    (getPokemonList as jest.Mock).mockResolvedValue({
      results: pokemonsMock.results,
      count: pokemonsMock.count,
      next: pokemonsMock.next,
      previous: pokemonsMock.previous,
    });

    const { container } = render(
      <Header
        setPokemons={setPokemons}
        setIsLoading={setIsLoading}
        setPokemonsTotal={setPokemonsTotal}
        currentPage={1}
      />
    );

    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'pikachu' } });

    const searchButton = container.querySelector('.search-button');
    if (searchButton) {
      fireEvent.click(searchButton);
      await waitFor(() => {
        expect(setPokemons).toHaveBeenCalledWith(pokemonsMock.results);
      });
      await waitFor(() => {
        expect(setPokemonsTotal).toHaveBeenCalledWith(pokemonsMock.count);
      });
    }
  });
});
