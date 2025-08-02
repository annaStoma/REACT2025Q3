import { Outlet, useSearchParams } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import { BounceLoader } from 'react-spinners';
import Card from './components/Card';
import Paginator from './components/Paginator';
import { useState, useEffect } from 'react';
import type { Pokemon } from './components/models/pokemon';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { clearSelection } from './store/selectionSlice';

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

  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selection.selectedItems
  );

  const unselectAll = () => {
    dispatch(clearSelection());
  };

  const download = () => {
    const headers = ['Name', 'Order', 'Height', 'Weight'];
    const rows = selectedItems.map((p: Pokemon) => [
      p.name,
      p.order,
      p.height,
      p.weight,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((r: []) => r.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedItems.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        {selectedItems.length > 0 && (
          <div className="selection-info-panel">
            <span className="text">
              <IoMdInformationCircleOutline className="icon" />
              {selectedItems.length}{' '}
              {selectedItems.length > 1
                ? 'items are selected'
                : 'item is selected'}
            </span>
            <div className="selection-info-panel-buttons">
              <button className="unselect" onClick={unselectAll}>
                Unselect all
              </button>
              <button className="download" onClick={download}>
                Download
              </button>
            </div>
          </div>
        )}

        <div className="right-panel">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
