import { useContext, useEffect } from "react";
import Tabs from "../components/home/Tabs";
import { getAuthToken } from "../util/auth";
import { redirect, useLoaderData } from "react-router-dom";import MapContext from "../store/MapContext";
import openSocket from 'socket.io-client'
import CartContext from "../store/CartContext";

const HomePage = () => {


    const data = useLoaderData()
    const {setMaps, setTable} = useContext(MapContext)
    const {clearCartItems} = useContext(CartContext)

    useEffect(() => {
        const socket = openSocket('http://localhost:8080');
        
        socket.on('table', table => {
            clearCartItems()
            setTable({...table.table})
        });

        return () => socket.disconnect();
    }, []);

    useEffect(() => {
        setMaps(data)
    },[data])

    return <>
    <Tabs />
    </>
}

export default HomePage;

export async function loader(){

    const token = getAuthToken()

    if(!token){
        return redirect('/login')
    }

    let path = 'http://localhost:8080/map'

    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    }

    const response = await fetch(path, options)

    if(!response.ok){
        throw new Error('nesto nece')
    }

    const result = await response.json()

    return result


}


export async function action({request, params}){

    const token = getAuthToken()

    if(!token){
        return redirect('/login')
    }

    const formData = await request.formData()

    const selectedOrders = JSON.parse(formData.get('selectedOrders'))
    const unselectedOrders = JSON.parse(formData.get('unselectedOrders'))
    const tableId = JSON.parse(formData.get('tableId'))
    const orderId = JSON.parse(formData.get('orderId'))

    const data = {
        selectedOrders: selectedOrders,
        unselectedOrders: unselectedOrders,
        tableId: tableId,
        orderId: orderId,
    }

    const method = request.method

    const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data)
      };

    const repsonse = await fetch('http://localhost:8080/order/accept', options)

    const result = await repsonse.json()

    
    return redirect('/home');

}