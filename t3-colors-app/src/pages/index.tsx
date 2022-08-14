import type { NextPage } from "next";
import SearchBars from "../ui/search/bars/SearchBars";
import Content from "../ui/search/views/Content";

const Home: NextPage = () => {
	return (<>
		<div className="drawer drawer-mobile">
  			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<Content />
			<SearchBars />
		</div>
	</>);
};

export default Home;
