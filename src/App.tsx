import { Component } from 'react';
import './App.scss';
import Header from './components/Header.tsx';
import ResultsTable from './components/ResultsTable.tsx';
import type { Pokemon } from './services/api.service.tsx';
import { BounceLoader } from 'react-spinners';

interface AppState {
  pokemons: Pokemon[];
  isLoading: boolean;
  fakeError?: boolean;
}

class App extends Component<unknown, AppState> {
  constructor(props: AppState) {
    super(props);
    this.state = {
      pokemons: [],
      isLoading: false,
    };
  }

  setPokemons = (data: Pokemon[]) => {
    this.setState({ pokemons: data });
  };

  setIsLoading = (loading: boolean) => {
    this.setState({ isLoading: loading });
  };

  triggerFakeError = () => {
    this.setState({ fakeError: true });
  };

  render() {
    const { pokemons, isLoading } = this.state;
    if (this.state.fakeError) {
      throw new Error(`This is a test error triggered manually.`);
    }
    return (
      <>
        <Header
          setPokemons={this.setPokemons}
          setIsLoading={this.setIsLoading}
        />
        {isLoading && (
          <div className="loader-container">
            <BounceLoader color="#FFCA02" size={60} />
          </div>
        )}
        <ResultsTable pokemons={pokemons} />

        <div className="fake-arror-button">
          <button onClick={this.triggerFakeError}>Throw Test API Error</button>
        </div>
      </>
    );
  }
}

export default App;
