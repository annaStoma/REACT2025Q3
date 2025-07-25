import type {
  Pokemon,
  PokemonListResponse,
} from '../components/models/pokemon';

export const getPokemonList = async (
  offset: number = 0,
  limit: number = 10,
  term: string = ''
): Promise<PokemonListResponse> => {
  const callError = (response: Response) => {
    if (!response.ok) {
      window.dispatchEvent(
        new CustomEvent('GlobalError', {
          detail: { message: `API error: ${response.status}` },
        })
      );
      throw new Error(`API error ${response.status}`);
    }
  };

  let response;
  let data;
  let detailedResults: Pokemon[];
  if (term) {
    response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`
    );
    callError(response);
    const value: Pokemon = await response.json();
    data = {
      count: 1,
      next: '',
      previous: '',
      results: [
        {
          id: value.id,
          name: value.name,
          order: value.order,
          height: value.height,
          weight: value.weight,
          imageUrl:
            value.sprites?.other['official-artwork'].front_default ||
            value.sprites?.front_default ||
            '',
        },
      ],
    };
    detailedResults = data.results;
  } else {
    response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    callError(response);
    data = await response.json();
    detailedResults = await Promise.all(
      data.results.map(async (p: { name: string; url: string }) => {
        const res = await fetch(p.url);
        const d = await res.json();

        return {
          id: d.id,
          name: d.name,
          order: d.order,
          height: d.height,
          weight: d.weight,
          imageUrl:
            d.sprites.other['official-artwork'].front_default ||
            d.sprites.front_default,
        };
      })
    );
  }
  return {
    results: detailedResults,
    count: data.count,
    next: data.next,
    previous: data.previous,
  };
};
