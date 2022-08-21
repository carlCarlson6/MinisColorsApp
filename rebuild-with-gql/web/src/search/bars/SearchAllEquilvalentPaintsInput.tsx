import { useState } from "react";
import { SearchToDisplay, useSearchPaintsStore } from "../../stores";

const SearchAllEquilvalentPaintsInput = () => {
    const { searchTerm, updateSearchTerm, displaySearch } = useSearchPaintsStore((state) => ({
        searchTerm: state.allEquivalentPaintsSearchTerm,
        updateSearchTerm: state.updateAllEquivalentPaintsSearchTerm,
        displaySearch: () => state.updateSearchToDisplay(SearchToDisplay.AllEquivalentPaints)
    }));
    const [inputSearchTerm, updateInputSearchTearm] = useState("");

    const handleOnKeyDown = (event: { key: string; }) => {
        if (event.key !== "Enter") return;
        displaySearch();
        updateInputSearchTearm("");
    };

    return (<>
        <div className="form-control" >
            <input 
                type="text" 
                placeholder="search all equivalents paints by name" 
                className="input input-bordered w-full max-w-xs"
                value={inputSearchTerm}
                onChange={e => {
                    updateSearchTerm(e.target.value);
                    updateInputSearchTearm(e.target.value);
                }}
                onKeyDown={handleOnKeyDown}
            />
        </div>
    </>);
}

export default SearchAllEquilvalentPaintsInput;