import { Component } from 'react';
import type { Pokemon } from '../services/api.service';
import '../styles/ResultsTable.scss';
import noDataImage from '../assets/pokemon.jpg';

interface ResultsTableProps {
    pokemons: Pokemon[];
}

class ResultsTable extends Component<ResultsTableProps> {
    render() {
        const { pokemons } = this.props;

        if (!pokemons.length) {
            return (
                <div className="table-container no-found">
                    <img className="no-data-image" src={noDataImage} alt="no-data" />
                    <p>No results found.</p>
                </div>
            );
        }

        return (
            <div className="table-container">
                <table className="pokemon-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Order</th>
                        <th>Height</th>
                        <th>Weight</th>
                        <th>Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pokemons.map((p) => (
                        <tr className="row" key={p.name}>
                            <td>{p.name}</td>
                            <td>{p.order}</td>
                            <td>{p.height}</td>
                            <td>{p.weight}</td>
                            <td className="image-cell">
                                <img className="pokemon-image" src={p.imageUrl} alt={p.name} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ResultsTable;
