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
  getPokemonList: jest.fn().mockResolvedValue([]),
}));
const placeholder = 'Enter pokemon name...';
const setPokemons = jest.fn();
const setIsLoading = jest.fn();

describe('Header', () => {
  test('saves entered search term to localStorage on search', async () => {
    const { container } = render(
      <Header setPokemons={setPokemons} setIsLoading={setIsLoading} />
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
    const mockedResponse = [{ name: 'pikachu' }];
    (getPokemonList as jest.Mock).mockResolvedValue(mockedResponse);

    const { container } = render(
      <Header setPokemons={setPokemons} setIsLoading={setIsLoading} />
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
    (getPokemonList as jest.Mock).mockResolvedValue(pokemonsMock);

    const { container } = render(
      <Header setPokemons={setPokemons} setIsLoading={setIsLoading} />
    );

    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'pikachu' } });

    const searchButton = container.querySelector('.search-button');
    if (searchButton) {
      fireEvent.click(searchButton);
      await waitFor(() => {
        expect(setPokemons).toHaveBeenCalledWith(pokemonsMock);
      });
    }
  });
});
