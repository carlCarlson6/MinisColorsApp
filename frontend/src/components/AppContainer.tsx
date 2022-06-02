import React from 'react';
import PaintContext from '../context/paints/PaintContext';
import ColorPicker from './search/ColorPicker';
import SearchBar from './search/SearchBar';
import SearchResults from './search/SearchResults';
import Spinner from './Spinner';

const AppContainer: React.FC = (): JSX.Element => {
    const { State: { fetchingData, lastRequestOk, paints } } = React.useContext(PaintContext);

    return (
        <div id="main-app-container" className="container">

            <SearchBar />
            <ColorPicker />

            { 
                fetchingData 
                    ? <Spinner /> 
                    : (lastRequestOk && paints.length !== 0) 
                        ? <SearchResults paints={paints}/> 
                        : null 
            }
        </div>
    );
}

export default AppContainer;