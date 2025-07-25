import { useSearchParams } from 'react-router-dom';
import '../styles/Card.scss';
import type { Pokemon } from './models/pokemon';

interface CardProps {
  pokemon?: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  if (!pokemon) return null;

  const page = searchParams.get('page') || '1';

  const handleClick = () => {
    searchParams.set('page', page);
    searchParams.set('details', String(pokemon.id));
    setSearchParams(searchParams);
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div className="pokemon-name">{pokemon.name}</div>
      <img
        className="pokemon-image"
        src={pokemon.imageUrl}
        alt={pokemon.name}
      />
    </div>
  );
};

export default Card;
