import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { pokemonsMock } from './test-utils/pokemons-list-mock';
import type { Pokemon } from './components/models/pokemon';
import { MemoryRouter } from 'react-router-dom';
import { mockStore } from './test-utils/store-mock';
import { Provider } from 'react-redux';

interface HeaderProps {
  setPokemons: (data: Pokemon[]) => void;
  setIsLoading: (data: boolean) => void;
}

interface ResultsTableProps {
  pokemons: Pokemon[];
}

const mockListResponse = pokemonsMock.results;

jest.mock('./components/Header', () => {
  const MockHeader = (props: HeaderProps) => {
    return (
      <div data-testid="mock-header">
        <button onClick={() => props.setPokemons([mockListResponse[0]])}>
          Set Pokemons
        </button>
        <button onClick={() => props.setIsLoading(true)}>Start Loading</button>
        <button onClick={() => props.setIsLoading(false)}>Stop Loading</button>
      </div>
    );
  };

  MockHeader.displayName = 'MockHeader';

  return MockHeader;
});

jest.mock('./components/ResultsTable', () => {
  const MockResultsTable = (props: ResultsTableProps) => {
    return (
      <div data-testid="results-table">
        {props.pokemons.map((p: Pokemon) => p.name).join(', ') || 'No pokemons'}
      </div>
    );
  };

  MockResultsTable.displayName = 'MockResultsTable';

  return MockResultsTable;
});

describe('App component', () => {
  it('renders Header and Cards', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('displays loading spinner when isLoading is true', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const searchButton = container.querySelector('.search-button');
    if (searchButton) {
      fireEvent.click(searchButton);
      const loader = container.querySelector('.loader-container');
      expect(loader).toBeInTheDocument();
    }
  });

  it('sets pokemons when setPokemons is called', () => {
    const { container } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const searchButton = container.querySelector('.search-button');
    if (searchButton) {
      fireEvent.click(searchButton);
      const table = container.querySelector('.pokemon-table');
      expect(table).toBeInTheDocument();
    }
  });
});
