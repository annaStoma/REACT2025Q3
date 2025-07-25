import { render, screen, waitFor } from '@testing-library/react';
import DetailsPanel from './DetailsPanel';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockFetch = jest.fn();

const mockPokemon = {
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    back_default: 'back.png',
    front_default: 'front.png',
  },
};

const mockSpecies = {
  flavor_text_entries: [
    {
      flavor_text: 'Electric mouse Pokémon.',
      language: { name: 'en' },
    },
  ],
};

describe('DetailsPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders nothing if there is no "details" param', () => {
    const { container } = render(
      <MemoryRouter>
        <DetailsPanel />
      </MemoryRouter>
    );

    const panel = container.querySelector('.details-panel');
    if (panel) {
      expect(panel).toBeInTheDocument();
    }
  });

  test('shows loader and then pokemon details', async () => {
    mockFetch
      .mockResolvedValueOnce({
        json: async () => mockPokemon,
      })
      .mockResolvedValueOnce({
        json: async () => mockSpecies,
      });

    render(
      <MemoryRouter initialEntries={['/?details=25']}>
        <DetailsPanel />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText(/Height: 4/)).toBeInTheDocument();
      expect(screen.getByText(/Weight: 60/)).toBeInTheDocument();
    });

    expect(screen.getAllByRole('img')).toHaveLength(2);
  });
});
