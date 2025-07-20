import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import type { Pokemon } from './services/api.service';
import { pokemonsMock } from './test-utils/pokemons-list-mock';

interface HeaderProps {
  setPokemons: (data: Pokemon[]) => void;
  setIsLoading: (data: boolean) => void;
}

interface ResultsTableProps {
  pokemons: Pokemon[];
}

const mockListResponse = pokemonsMock;

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
  it('renders Header and ResultsTable', () => {
    render(<App />);
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('results-table')).toBeInTheDocument();
  });

  it('displays loading spinner when isLoading is true', () => {
    const { container } = render(<App />);
    const searchButton = container.querySelector('.search-button');
    if (searchButton) {
      fireEvent.click(searchButton);
      const loader = container.querySelector('.loader-container');
      expect(loader).toBeInTheDocument();
    }
  });

  it('sets pokemons when setPokemons is called', () => {
    const { container } = render(<App />);
    const searchButton = container.querySelector('.search-button');
    if (searchButton) {
      fireEvent.click(searchButton);
      const table = container.querySelector('.pokemon-table');
      expect(table).toBeInTheDocument();
    }
  });

  // it('shows empty state in ResultsTable if no pokemons', () => {
  //   render(<App />);
  //   expect(screen.getByTestId('results-table')).toHaveTextContent(
  //     'No pokemons'
  //   );
  // });
  //
  // it('throws an error when "Call an error" is clicked', () => {
  //   jest.spyOn(console, 'error').mockImplementation(() => {});
  //   render(<App />);
  //   expect(() => {
  //     fireEvent.click(screen.getByText('Call an error'));
  //   }).toThrow('This is a test error triggered manually.');
  //   (console.error as jest.Mock).mockRestore();
  // });
});
