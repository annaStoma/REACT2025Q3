import { Component } from 'react';
import SearchBar from './SearchBar';
import { getPokemonList, type Pokemon } from '../services/api.service';
import '../styles/Header.scss';
import LogoImage from '../assets/logo.png';
import {
  LocalStorageService,
  STORAGE_KEYS,
} from '../services/local-storage.service';

interface HeaderProps {
  setPokemons: (data: Pokemon[]) => void;
  setIsLoading: (data: boolean) => void;
}

interface HeaderState {
  searchValue: string;
}

class Header extends Component<HeaderProps, HeaderState> {
  public state = {
    searchValue:
      LocalStorageService.getSearchTerm(STORAGE_KEYS.searchTerm) || '',
  };

  componentDidMount() {
    this.handleSearch(this.state.searchValue);
  }

  handleSearch = (value: string): void => {
    value = value.trim();

    if (value) {
      this.setState({ searchValue: value });
      LocalStorageService.setSearchTerm(STORAGE_KEYS.searchTerm, value);
    } else {
      LocalStorageService.clearSearchTerm(STORAGE_KEYS.searchTerm);
    }

    const { setPokemons, setIsLoading } = this.props;

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
