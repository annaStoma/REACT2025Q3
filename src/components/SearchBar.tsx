import { useState, useEffect } from 'react';
import '../styles/SearchBar.scss';
import { FaSearch } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';

interface SearchBarProps {
  value: string;
  onSearchClick: (value: string) => void;
}

const SearchBar = ({ value, onSearchClick }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    const trimmed = inputValue.trim();
    onSearchClick(trimmed);
  };

  const clear = () => {
    setInputValue('');
    onSearchClick('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter pokemon name..."
      />
      {inputValue.length > 0 && (
        <button className="clear-button" onClick={clear}>
          <MdClear />
        </button>
      )}
      <button className="search-button" onClick={handleClick}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
