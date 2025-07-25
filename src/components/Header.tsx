import { useCallback, useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { getPokemonList } from '../services/api.service';
import '../styles/Header.scss';
import LogoImage from '../assets/logo.png';
import {
  LocalStorageService,
  STORAGE_KEYS,
} from '../services/local-storage.service';
import type { Pokemon, PokemonListResponse } from './models/pokemon';

interface HeaderProps {
  setPokemons: (data: Pokemon[]) => void;
  setIsLoading: (data: boolean) => void;
  setPokemonsTotal: (data: number) => void;
  currentPage: number;
}

function Header({
  setPokemons,
  setIsLoading,
  setPokemonsTotal,
  currentPage,
}: HeaderProps) {
  const [searchValue, setSearchValue] = useState(
    LocalStorageService.getSearchTerm(STORAGE_KEYS.searchTerm) || ''
  );
  const handleSearch = useCallback(
    (value: string, page: number = 1): void => {
      const trimmedValue = value.trim();
      setSearchValue(trimmedValue);
      if (trimmedValue) {
        setSearchValue(trimmedValue);
        LocalStorageService.setSearchTerm(
          STORAGE_KEYS.searchTerm,
          trimmedValue
        );
      } else {
        LocalStorageService.clearSearchTerm(STORAGE_KEYS.searchTerm);
      }

      const offset = (page - 1) * 10;

      setIsLoading(true);
      getPokemonList(offset, 10, trimmedValue)
        .then((pokemons: PokemonListResponse) => {
          setPokemonsTotal(pokemons.count);
          setPokemons(pokemons.results);
          setIsLoading(false);
        })
        .catch((error) => {
          setPokemonsTotal(0);
          setPokemons([]);
          setIsLoading(false);
          throw new Error(error);
        });
    },
    [setIsLoading, setPokemons, setPokemonsTotal]
  );
  useEffect(() => {
    handleSearch(searchValue, currentPage);
  }, [handleSearch, searchValue, currentPage]);

  return (
    <div className="header">
      <div className="logo">
        <img className="logo-image" src={LogoImage} alt="logo" />
      </div>
      <div className="search-bar-conponent">
        <SearchBar
          value={searchValue}
          onSearchClick={(value) => handleSearch(value, currentPage)}
        />
      </div>
    </div>
  );
}

export default Header;
