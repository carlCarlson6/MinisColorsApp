import React, { useContext, useState } from 'react';
import PaintContext from '../context/paints/PaintContext';
import { PaintController } from '../controllers/PaintController';

const SearchBar: React.FC = (): JSX.Element => {
    const [searchInput, searchInputSetter] = useState<string>('');
    const controller: PaintController = useContext(PaintContext);
    
    return (
        <div className="input-group">
            <input 
                type="search" 
                className="form-control rounded" 
                placeholder="Search" 
                aria-label="Search" 
                aria-describedby="search-addon" 
                onChange={(event) => searchInputSetter(event.target.value)}
            />
            <button 
                type="button" 
                className="btn btn-outline-primary"
                onClick={() => controller.PaintServices.SearchByName(searchInput)}
            >search</button>
        </div>
    );
}

export default SearchBar;