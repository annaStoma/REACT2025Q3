import { useSearchParams } from 'react-router-dom';
import '../styles/Card.scss';
import type { Pokemon } from './models/pokemon';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelection } from '../store/selectionSlice';
import type { RootState } from '../store/store';

interface CardProps {
  pokemon?: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const selectedItems: Pokemon[] = useSelector(
    (state: RootState) => state.selection.selectedItems
  );

  if (!pokemon) return null;

  const page = searchParams.get('page') || '1';

  const handleClick = () => {
    searchParams.set('page', page);
    searchParams.set('details', String(pokemon.id));
    setSearchParams(searchParams);
  };
  const isChecked = selectedItems.some((p) => p.id === pokemon.id);

  return (
    <div className="card">
      <input
        type="checkbox"
        className="pokemon-checkbox"
        checked={isChecked}
        onChange={() => {
          dispatch(toggleSelection(pokemon));
        }}
      />
      <div className="card-container" onClick={handleClick}>
        <div className="pokemon-name">{pokemon.name}</div>
        <img
          className="pokemon-image"
          src={pokemon.imageUrl}
          alt={pokemon.name}
        />
      </div>
    </div>
  );
};

export default Card;
