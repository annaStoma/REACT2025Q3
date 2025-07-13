import {Component} from 'react';
import './App.scss';
import Header from "./components/Header.tsx";
import ResultsTable from "./components/ResultsTable.tsx";
import type {Pokemon} from "./services/api.service.tsx";
import {BounceLoader} from "react-spinners";

interface AppState {
    pokemons: Pokemon[];
    isLoading: boolean;
    errorMessage: string | null;
    triggerError: boolean;
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            pokemons: [],
            isLoading: false,
            errorMessage: null,
            triggerError: false,
        };
    }

    setPokemons = (data: Pokemon[]) => {
        this.setState({pokemons: data});
    }

    setIsLoading = (loading: boolean) => {
        this.setState({isLoading: loading});
    }

    setErrorMessage = (message: string | null) => {
        // setTimeout(() => {
        if (message) {
        console.log('!!!!!!!!!1', message)
            this.setState({errorMessage: message});
            this.setState({triggerError: !message});

        }

    }

    render() {
        const {pokemons, isLoading} = this.state;

        return (
            <>
                <Header
                    setPokemons={this.setPokemons}
                    setIsLoading={this.setIsLoading}
                    setErrorMessage={this.setErrorMessage}
                />
                {isLoading && (
                    <div className='loader-container'>
                        <BounceLoader color="#FFCA02" size={60}/>
                    </div>
                )}
                <ResultsTable pokemons={pokemons}/>
                {this.state.triggerError && (() => {
                    throw new Error('Test error');
                })()}
                <button onClick={() => this.setState({triggerError: true})}>
                    Throw Error
                </button>
            </>
        );
    }
}

export default App;
