import { useQuery } from "@apollo/client";
import { FIND_PAINTS_BY_NAME } from "../../gql/queries";
import { useSearchPaintsStore } from "../../stores";
import PaintsTable from "./PaintsTable";

const AllEquivalentPaints = () => {
    const paintName = useSearchPaintsStore(state => state.allEquivalentPaintsSearchTerm);
    // TODO replace this with apollo client
    //const { data, isLoading } = trpc.useQuery(["paints.allEquilvalentPaints", {paintName}]);
    const { loading, error, data } = useQuery(FIND_PAINTS_BY_NAME, {
        variables: { name: paintName }
    });

    if (!loading) {
        console.log(data);
    }

    return (<>
        {
            loading ?
                <p>loading</p> :
                <PaintsTable paints={!data.findByName ? [] : data.findByName}/>
        }
        
    </>);
}

export default AllEquivalentPaints;