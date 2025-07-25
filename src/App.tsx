import { Outlet, useSearchParams } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import { BounceLoader } from 'react-spinners';
import Card from './components/Card';
import Paginator from './components/Paginator';
import { useState, useEffect } from 'react';
import type { Pokemon } from './components/models/pokemon';

const App = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonsTotal, setPokemonsTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams('');
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get('page')) || 1;
    setCurrentPage(pageFromUrl);
  }, [searchParams]);

  const setPage = (page: number) => {
    searchParams.set('page', String(page));
    setSearchParams(searchParams);
    setCurrentPage(page);
  };

  return (
    <>
      <Header
        setPokemons={setPokemons}
        setIsLoading={setIsLoading}
        setPokemonsTotal={setPokemonsTotal}
        currentPage={currentPage}
      />

      {isLoading && (
        <div className="loader-container">
          <BounceLoader color="#FFCA02" size={60} />
        </div>
      )}

      <div className="panels">
        <div className="left-panel">
          <div className="card-list">
            {pokemons.map((p) => (
              <Card key={p.id} pokemon={p} />
            ))}
          </div>

          {pokemonsTotal >= 10 && (
            <Paginator
              postsPerPage={10}
              totalPosts={pokemonsTotal}
              setCurrentPage={setPage}
              currentPage={currentPage}
            />
          )}
        </div>

        <div className="right-panel">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
