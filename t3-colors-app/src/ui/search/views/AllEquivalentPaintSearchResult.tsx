import { useSearchPaintsStore } from "../../stores";
import { trpc } from "../../trpc";
import AllEquivalentPaintsTable from "./AllEquivalentPaintsTable";

const AllEquivalentPaints = () => {
    const paintName = useSearchPaintsStore(state => state.allEquivalentPaintsSearchTerm);
    const { data, isLoading } = trpc.useQuery(["paints.allEquilvalentPaints", {paintName}]);

    return (<>
        {
            !data || isLoading ?
                <p>loading</p> :
                <AllEquivalentPaintsTable paints={!data ? [] : data}/>
        }
        
    </>);
}

export default AllEquivalentPaints;