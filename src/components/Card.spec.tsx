import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';
import type { Pokemon } from './models/pokemon';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mockStore } from '../test-utils/store-mock';

const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [new URLSearchParams('page=2'), mockSetSearchParams],
}));

describe('Card component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockPokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
    imageUrl: 'pikachu.png',
    height: 4,
    weight: 60,
    order: 1,
  };

  test('does not render if pokemon is not provided', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Card />
        </MemoryRouter>
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders pokemon name and image', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Card pokemon={mockPokemon} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('pikachu')).toBeInTheDocument();

    const img = screen.getByAltText('pikachu') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('pikachu.png');
  });

  test('calls setSearchParams with correct values on click', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Card pokemon={mockPokemon} />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByText('pikachu');
    fireEvent.click(card);

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);

    const params = mockSetSearchParams.mock.calls[0][0];
    expect(params.get('page')).toBe('2');
    expect(params.get('details')).toBe('25');
  });
});
