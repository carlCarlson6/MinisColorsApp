import SearchAllEquilvalentPaintsInput from "./SearchAllEquilvalentPaintsInput";

const SearchBars = () => {
    return <>
        <div className="drawer-side">
    		<label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                <li><SearchAllEquilvalentPaintsInput /></li>
            </ul>
  		</div>
    </>;
}

export default SearchBars;