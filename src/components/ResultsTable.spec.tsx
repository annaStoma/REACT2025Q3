import { render, screen } from '@testing-library/react';
import ResultsTable from './ResultsTable';
import { pokemonsMock } from '../test-utils/pokemons-list-mock';
import '@testing-library/jest-dom';

const mockPokemon = pokemonsMock.results[0];

describe('ResultsTable', () => {
  test('displays "No results found." when list is empty', () => {
    render(<ResultsTable pokemons={[]} />);
    expect(screen.getByText('No results found.')).toBeInTheDocument();
    expect(screen.getByAltText('no-data')).toBeInTheDocument();
  });

  test('renders table with pokemon data', () => {
    render(<ResultsTable pokemons={[mockPokemon]} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText(1)).toBeInTheDocument();
    expect(screen.getByText(7)).toBeInTheDocument();
    expect(screen.getByText(69)).toBeInTheDocument();
  });
});
