import { useParams } from "react-router-dom";
import TableView from "../components/user/TableView";


const TablePage = () => {

    const {id} = useParams()
    
    return <TableView tableId={id}/>
}  

export default TablePage;

export async function loader({request, params}) {

    const tableId = params.id;

    return tableId

}