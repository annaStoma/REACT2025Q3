export interface Pokemon {
  id: number;
  name: string;
  order: number;
  height: number;
  weight: number;
  imageUrl: string;
  sprites?: PokemonSprites;
}

interface PokemonSpritesOther {
  dream_world: {
    front_default: string;
    front_female?: string | null;
  };
  home: {
    front_default: string;
    front_female?: string | null;
    front_shiny: string;
    front_shiny_female?: string | null;
  };
  'official-artwork': {
    front_default: string;
    front_shiny: string;
  };
  showdown: {
    back_default: string;
    back_female?: string | null;
    back_shiny: string;
    back_shiny_female?: string | null;
    front_default: string;
    front_female?: string | null;
    front_shiny: string;
    front_shiny_female?: string | null;
  };
}

interface PokemonSprites {
  back_default: string;
  back_female?: string | null;
  back_shiny: string;
  back_shiny_female?: string | null;
  front_default: string;
  front_female?: string | null;
  front_shiny: string;
  front_shiny_female?: string | null;
  other: PokemonSpritesOther;
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

export interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface PalParkEncounter {
  area: NamedAPIResource;
  base_score: number;
  rate: number;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: NamedAPIResource;
}

export interface Variety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: NamedAPIResource;
  egg_groups: NamedAPIResource[];
  evolution_chain: { url: string };
  evolves_from_species: NamedAPIResource | null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: string[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: NamedAPIResource;
  growth_rate: NamedAPIResource;
  habitat: NamedAPIResource;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: NamedAPIResource;
  varieties: Variety[];
}
