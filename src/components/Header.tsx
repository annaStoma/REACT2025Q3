import { Component } from 'react';
import SearchBar from './SearchBar.tsx';
import { getPokemonList, type Pokemon } from '../services/api.service.tsx';
import '../styles/Header.scss';
import LogoImage from '../assets/logo.png';
import {
  LocalStorageService,
  STORAGE_KEYS,
} from '../services/local-storage.service.tsx';

interface HeaderProps {
  setPokemons: (data: Pokemon[]) => void;
  setIsLoading: (data: boolean) => void;
}

interface HeaderState {
  searchValue: string;
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    const savedSearch =
      LocalStorageService.getSearchTerm(STORAGE_KEYS.searchTerm) || '';
    this.state = {
      searchValue: savedSearch,
    };
    if (savedSearch) {
      this.handleSearch(savedSearch);
    }
  }

  handleSearch = (value: string): void => {
    const { setPokemons, setIsLoading } = this.props;

    this.setState({ searchValue: value });
    if (value) {
      LocalStorageService.setSearchTerm(STORAGE_KEYS.searchTerm, value);
    }

    setIsLoading(true);
    getPokemonList(value)
      .then((pokemons: Pokemon[]) => {
        setPokemons(pokemons);
        setIsLoading(false);
      })
      .catch((error) => {
        setPokemons([]);
        setIsLoading(false);
        throw new Error(error);
      });
  };

  render() {
    return (
      <div className="header">
        <div className="logo">
          <img className="logo-image" src={LogoImage} alt="no-data" />
        </div>
        <div className="search-bar-conponent">
          <SearchBar
            value={this.state.searchValue}
            onSearchClick={this.handleSearch}
          />
        </div>
      </div>
    );
  }
}

export default Header;
