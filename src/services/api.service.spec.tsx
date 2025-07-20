import { getPokemonList } from './api.service';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { pokemonsMock } from '../test-utils/pokemons-list-mock';

const mockSinglePokemon = {
  id: 1,
  name: 'pikachu',
  order: 1,
  height: 4,
  weight: 60,
  sprites: {
    front_default: 'default-image-url',
    other: {
      'official-artwork': {
        front_default: 'official-image-url',
      },
    },
  },
};

const mockListResponse = pokemonsMock;

const servers = [
  http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', () => {
    return HttpResponse.json(mockSinglePokemon);
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/', () => {
    return HttpResponse.json(mockListResponse);
  }),
];

const server = setupServer(...servers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getPokemonList', () => {
  it('fetches single Pokémon by term', async () => {
    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/pikachu', () => {
        return HttpResponse.json(mockSinglePokemon);
      })
    );
    const result = await getPokemonList('pikachu');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('pikachu');
    expect(result[0].imageUrl).toBe('official-image-url');
  });

  it('dispatches GlobalError on API failure', async () => {
    const errorListener = jest.fn();
    window.addEventListener('GlobalError', errorListener);

    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/pikachu', () => {
        return new HttpResponse(null, { status: 404 });
      })
    );

    await expect(getPokemonList('pikachu')).rejects.toThrow('API error 404');
    expect(errorListener).toHaveBeenCalled();

    window.removeEventListener('GlobalError', errorListener);
  });
});
