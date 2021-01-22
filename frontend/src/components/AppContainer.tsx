import React from 'react';
import PaintContext from '../context/paints/PaintContext';
import { PaintController } from '../controllers/PaintController';
import ColorPicker from './ColorPicker';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Spinner from './Spinner';

const AppContainer: React.FC = (): JSX.Element => {
    const controller: PaintController = React.useContext(PaintContext);

    return (
        <div id="main-app-container" className="container">
            
            <SearchBar />
            <ColorPicker />

            { controller.State.fetchingData ? <Spinner /> : null }
            { (controller.State.lastRequestOk && controller.State.paints.length !== 0) ? <SearchResults paints={controller.State.paints}/> : null }

        </div>
    );
}

export default AppContainer;