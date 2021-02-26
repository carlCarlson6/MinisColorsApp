import React, { Fragment } from 'react';
import AppContainer from './components/AppContainer';
import Header from './components/Header';
import PaintContextState from "./context/paints/PaintContextState";

const App: React.FC = (): JSX.Element => {
  	return (
  	  	<Fragment>
			<PaintContextState>
				
				<Header />

				<AppContainer />

			</PaintContextState>
  	  	</Fragment>
  	);
}

export default App;
