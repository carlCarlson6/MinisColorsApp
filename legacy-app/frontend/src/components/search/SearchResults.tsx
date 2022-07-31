import React from 'react';
import { Paint } from '../../models/Paint';
import SearchResult from './SearchResult';

const SearchResults: React.FC<{ paints: Paint[] }> = ({ paints }) => {
    const orderedPaints = paints.sort((paintA, paintB) => (paintA.HexColorCode > paintB.HexColorCode) ? 1 : -1);

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
                    paints.map(paint => 
                        <SearchResult paint={paint} key={paint.HexColorCode}/>
                    )
                }
            </tbody>
        </table>
    );
}

export default SearchResults;
