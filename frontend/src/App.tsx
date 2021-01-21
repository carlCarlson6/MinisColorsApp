import React, { Fragment } from 'react';
import ColorPicker from './components/ColorPicker';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

const App: React.FC = (): JSX.Element => {
  	return (
  	  	<Fragment>
				
			<div id="header-container"> 
				<Header />
			</div>
			
			<div id="main-app-container" className="container">
				<SearchBar />
				<ColorPicker />
			</div>
			
  	  	</Fragment>
  	);
}

export default App;
