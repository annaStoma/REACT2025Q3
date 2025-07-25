import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/DetailsPanel.scss';
import { MdClear } from 'react-icons/md';
import type { Pokemon, PokemonSpecies } from './models/pokemon';

const DetailsPanel = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('details');

  useEffect(() => {
    if (!id) {
      setPokemon(null);
      setDescription('');
      return;
    }

    async function fetchDetails() {
      setIsLoading(true);

      try {
        const pokemonRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemonData = await pokemonRes.json();
        setPokemon(pokemonData);

        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const speciesData: PokemonSpecies = await speciesRes.json();

        const entry = speciesData.flavor_text_entries.find(
          (item) => item.language.name === 'en'
        );

        setDescription(
          entry
            ? entry.flavor_text.replace(/\f/g, ' ')
            : 'No description found.'
        );
      } catch (error) {
        console.error('Error loading details:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDetails();
  }, [id]);

  return (
    <AnimatePresence>
      {id && (
        <motion.div
          key={id}
          className="details-panel"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            className="close-btn"
            onClick={() => {
              searchParams.delete('details');
              setSearchParams(searchParams);
            }}
          >
            <MdClear />
          </button>

          {isLoading && <div className="details">Loading...</div>}

          {!isLoading && pokemon && (
            <div className="details">
              <div className="name">{pokemon.name}</div>
              <div className="images">
                <img src={pokemon.sprites?.back_default} alt={pokemon.name} />
                <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
              </div>
              <span className="pokemon-description">
                {description}
                <div className="separator"></div>
                <div>Height: {pokemon.height}</div>
                <div>Weight: {pokemon.weight}</div>
              </span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailsPanel;
