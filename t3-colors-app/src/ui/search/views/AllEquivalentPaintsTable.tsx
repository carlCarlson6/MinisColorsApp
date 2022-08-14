import { Paint, PaintDto } from "../../../server/colors/paint";

const AllEquivalentPaintsTable: React.FC<{paints: PaintDto[]}> = ({paints}) => {
    console.log(paints);
    return (
    <>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Paint Name</th>
                        <th>Hex Color</th>
                    </tr>
                </thead>
                <tbody>{paints.map(paint => {
                    return                     <tr>
                    <td>{paint.Company}</td>
                    <td>{paint.Name}</td>
                    <td>{paint.color}</td>
                </tr>
                })}</tbody>
            </table>
        </div>
    </>);
}

export default AllEquivalentPaintsTable;