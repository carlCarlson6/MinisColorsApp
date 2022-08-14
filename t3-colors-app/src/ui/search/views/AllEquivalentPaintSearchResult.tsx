import { useSearchPaintsStore } from "../../stores";
import { trpc } from "../../trpc";
import PaintsTable from "./PaintsTable";

const AllEquivalentPaints = () => {
    const paintName = useSearchPaintsStore(state => state.allEquivalentPaintsSearchTerm);
    const { data, isLoading } = trpc.useQuery(["paints.allEquilvalentPaints", {paintName}]);

    return (<>
        {
            !data || isLoading ?
                <p>loading</p> :
                <PaintsTable paints={!data ? [] : data}/>
        }
        
    </>);
}

export default AllEquivalentPaints;