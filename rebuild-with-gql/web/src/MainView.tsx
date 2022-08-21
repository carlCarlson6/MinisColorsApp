import SearchBars from "./search/bars/SearchBars";
import Content from "./search/views/Content";

export const MainView = () => (
<>
    <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <Content />
        <SearchBars />
    </div>
</>);