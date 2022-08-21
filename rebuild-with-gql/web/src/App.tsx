import { ApolloProvider } from '@apollo/client'
import NavBar from './common/NavBar'
import { gqlClient } from './gql'
import { MainView } from './MainView'

export const App = () => (
<>
	<NavBar />
	<ApolloProvider client={gqlClient}>
		<MainView />
	</ApolloProvider>
</>)

export default App
