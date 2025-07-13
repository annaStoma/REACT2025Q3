export interface Pokemon {
  id: number;
  name: string;
  order: number;
  height: number;
  weight: number;
  imageUrl: string;
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const getPokemonList = async (term: string = ''): Promise<Pokemon[]> => {
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

  if (term) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`
    );

    callError(response);

    const data = await response.json();
    return [
      {
        id: data.id,
        name: data.name,
        order: data.order,
        height: data.height,
        weight: data.weight,
        imageUrl:
          data.sprites.other['official-artwork'].front_default ||
          data.sprites.front_default,
      },
    ];
  } else {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=15&offset=0'
    );
    callError(response);

    const data = await response.json();
    return await Promise.all(
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
};
