import React, { Fragment } from 'react';
import ColorPicker from './components/ColorPicker';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import PaintContextState from "./context/paints/PaintContextState";

const App: React.FC = (): JSX.Element => {
  	return (
  	  	<Fragment>
			<PaintContextState>
				<div id="header-container"> 
					<Header />
				</div>

				<div id="main-app-container" className="container">
					<SearchBar />
					<ColorPicker />
				</div>
			</PaintContextState>
  	  	</Fragment>
  	);
}

export default App;
