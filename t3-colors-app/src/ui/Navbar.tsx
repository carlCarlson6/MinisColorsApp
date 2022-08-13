import { useState, Dispatch, SetStateAction } from "react";
import { trpc } from "./trpc";

const NavBar = () => {
    const [displaySearchBar, updateDisplaySearchBar] = useState(false);
    const [searchTerm, updateSearchTerm] = useState("");
    const query = trpc.useQuery(["paints.allEquilvalentPaints", { paintName: searchTerm }], {
        enabled: Boolean(searchTerm)
    });

    const onHandleKeyDown = (event: { key: string; }) => {
        if (event.key !== "Enter") return;    
        query.refetch();
        updateSearchTerm("");
        updateDisplaySearchBar(false);
        console.log(query.data);
    };

    return (<>
        <div className="navbar bg-neutral text-neutral-content">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">minis color app</a>
            </div>
            
            <div className="navbar-end">
            {
                !displaySearchBar ?                
                <div >
                    <button className="btn btn-ghost btn-circle" onClick={() => updateDisplaySearchBar(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                :
                <div className="flex-none">
                    <div className="form-control" >
                        <input type="text" placeholder="serch a paint" className="input input-bordered"
                            value={searchTerm}
                            onChange={event => updateSearchTerm(event.target.value)} 
                            onKeyDown={onHandleKeyDown}
                        />
                    </div>
                </div>
            }
            </div>
        </div>
    </>);
};

export default NavBar;

