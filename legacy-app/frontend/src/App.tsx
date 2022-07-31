import AppContainer from './components/AppContainer';
import Header from './components/Header';
import PaintContextState from "./context/paints/PaintContextState";

const App = () => 
	<>
		<Header />
		<PaintContextState>
			<AppContainer />
		</PaintContextState>
	</>

export default App;
