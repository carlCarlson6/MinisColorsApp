import { SearchToDisplay, useSearchPaintsStore } from "../../stores";
import AllEquivalentPaints from "./AllEquivalentPaintSearchResult";

const Content = () => {
    const toDisplay = useSearchPaintsStore(state => state.searchToDisplay);

    return (<>
        <div className="drawer-content p-4">
            {(() => {
                switch(toDisplay) {
                    case SearchToDisplay.AllEquivalentPaints:
                        return <AllEquivalentPaints />
                    default:
                        return <p>search something :3</p>
                }
            })()}
        </div> 
    </>);
}

export default Content;