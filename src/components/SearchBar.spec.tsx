import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
  const placeholder = 'Enter pokemon name...';
  test('renders input and buttons', () => {
    render(<SearchBar value="" onSearchClick={() => {}} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders clear button if there is text in input', () => {
    const { container } = render(
      <SearchBar value="something" onSearchClick={() => {}} />
    );
    const clearButton = container.querySelector('.clear-button');
    expect(clearButton).toBeVisible();
  });

  test('calls onSearchClick when Enter is pressed', () => {
    const onSearchClick = jest.fn();
    render(<SearchBar value="" onSearchClick={onSearchClick} />);
    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onSearchClick).toHaveBeenCalledWith('bulbasaur');
  });

  test('calls clear method when clear button is clicked', () => {
    const onSearchClick = jest.fn();
    const { container } = render(
      <SearchBar value="abra" onSearchClick={onSearchClick} />
    );

    const clearButton = container.querySelector('.clear-button');
    if (clearButton) {
      fireEvent.click(clearButton);
      expect(screen.getByPlaceholderText(placeholder)).toHaveValue('');
      expect(onSearchClick).toHaveBeenCalledWith('');
    }
  });

  test('calls onSearchClick when search button is clicked', () => {
    const onSearchClick = jest.fn();
    const { container } = render(
      <SearchBar value="pikachu" onSearchClick={onSearchClick} />
    );
    const searchButton = container.querySelector('.search-button'); // only one button visible
    if (searchButton) {
      fireEvent.click(searchButton);
      expect(onSearchClick).toHaveBeenCalledWith('pikachu');
    }
  });

  test('updates inputValue on change', () => {
    render(<SearchBar value="" onSearchClick={() => {}} />);
    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'charmander' } });
    expect(input).toHaveValue('charmander');
  });
});
