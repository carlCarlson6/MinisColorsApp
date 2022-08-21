import { useSearchPaintsStore } from "../../stores";
import PaintsTable from "./PaintsTable";

const AllEquivalentPaints = () => {
    const paintName = useSearchPaintsStore(state => state.allEquivalentPaintsSearchTerm);
    // TODO replace this with apollo client
    //const { data, isLoading } = trpc.useQuery(["paints.allEquilvalentPaints", {paintName}]);
    const data = undefined;
    const isLoading = true;

    return (<>
        {
            isLoading ?
                <p>loading</p> :
                <PaintsTable paints={!data ? [] : data}/>
        }
        
    </>);
}

export default AllEquivalentPaints;