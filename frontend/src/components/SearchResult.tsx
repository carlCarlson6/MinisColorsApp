import React, { Fragment } from "react"
import { Paint } from "../models/Paint"

const SearchResult: React.FC<{ paint: Paint }> = ({ paint }): JSX.Element => (
    <tr>
        <th scope="row">{paint.HexColorCode}</th>
        <td>{paint.Company}</td>
        <td>{paint.Name}</td>
    </tr>
);

export default SearchResult;