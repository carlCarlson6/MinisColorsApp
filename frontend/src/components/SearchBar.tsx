import React, { useState } from 'react';

const SearchBar: React.FC = (): JSX.Element => {
    const [searchInput, searchInputSetter] = useState<string>('');
    
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
            <button type="button" className="btn btn-outline-primary">search</button>
        </div>
    );
}

export default SearchBar;