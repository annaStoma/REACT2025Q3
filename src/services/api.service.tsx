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
    if (term) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`);
        if (!response.ok) {
            throw new Error(`Pokemon not found: ${term}`);
        }

        const data = await response.json();
        return [{
            id: data.id,
            name: data.name,
            order: data.order,
            height: data.height,
            weight: data.weight,
            imageUrl: data.sprites.other['official-artwork'].front_default || data.sprites.front_default
        }];
    } else {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0');
        if (!response.ok) {
            throw new Error(`API error ${response.status}`);
        }

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
                    imageUrl: d.sprites.other['official-artwork'].front_default || d.sprites.front_default
                };
            })
        );
    }
};
