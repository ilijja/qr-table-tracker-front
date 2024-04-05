import { useContext, useEffect } from "react";
import MenuOrder from "../components/user/MenuOrder";
import ProductContext from "../store/ProductContext";
import { useLoaderData } from "react-router-dom";
import ShoppingCart from "../components/user/ShoppingCart";

const UserMenuPage = () => {

    const data = useLoaderData()
    const {setMenus} = useContext(ProductContext)

    useEffect(() => {
        setMenus(data)
    }, [data])

    return <>
    <MenuOrder/>
    
    </> 
}   

export default UserMenuPage;

export async function loader({params}){

    const tableId = params.id

    if(!tableId){
        return
    }

    const response = await fetch(`http://localhost:8080/guest/${tableId}`, {
        method: 'GET'
    })

    const result = await response.json()

    return result
}

export async function action({request, params}){
    return null
}