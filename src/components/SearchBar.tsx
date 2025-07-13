import React, { Component } from 'react';
import '../styles/SearchBar.scss';
import { FaSearch } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';

interface SearchBarProps {
  value: string;
  onSearchClick: (value: string) => void;
}

interface SearchBarState {
  inputValue: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      inputValue: props.value || '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    this.setState({ inputValue: value });
  };

  handleClick = (): void => {
    const trimmed = this.state.inputValue.trim();
    this.props.onSearchClick(trimmed);
  };

  clear = (): void => {
    this.setState({ inputValue: '' }, () => {
      this.props.onSearchClick('');
    });
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };

  render() {
    const { inputValue } = this.state;

    return (
      <div className="search-bar">
        <input
          className="search-bar-input"
          type="text"
          value={inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="Enter pokemon name..."
        />
        {inputValue.length > 0 && (
          <button className="clear-button" onClick={this.clear}>
            <MdClear />
          </button>
        )}
        <button className="search-button" onClick={this.handleClick}>
          <FaSearch />
        </button>
      </div>
    );
  }
}

export default SearchBar;
