import React from 'react';
import { Paint } from '../models/Paint';
import SearchResult from './SearchResult';

const SearchResults: React.FC<{ paints: Array<Paint> }> = ({ paints }): JSX.Element => {
    const orderedPaints: Array<Paint> = paints.sort((paintA, paintB) => (paintA.HexColorCode > paintB.HexColorCode) ? 1 : -1);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">HexCode</th>
                    <th scope="col">Company</th>
                    <th scope="col">Name</th>
                </tr>
            </thead>
            <tbody>
                {
                    orderedPaints.map(paint => {return (
                        <SearchResult paint={paint}/>
                    );})
                }
            </tbody>
        </table>
    );
}

export default SearchResults;
