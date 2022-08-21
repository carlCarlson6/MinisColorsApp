import { Paints } from "../../common/models/paint";

const PaintsTable: React.FC<{paints: Paints}> = ({paints}) => {
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
                <tbody>{paints.map(paint => <tr>
                    <td>{paint.company}</td>
                    <td>{paint.name}</td>
                    <td>{paint.color.hexadecimal}</td>
                </tr>)}</tbody>
            </table>
        </div>
    </>);
}

export default PaintsTable;