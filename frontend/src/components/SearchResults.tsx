import React, { Fragment } from 'react';
import { Paint } from '../models/Paint';

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
                        <tr>
                            <th scope="row">{paint.HexColorCode}</th>
                            <td>{paint.Company}</td>
                            <td>{paint.Name}</td>
                        </tr>
                    );})
                }
            </tbody>
        </table>
    );
}

export default SearchResults;
