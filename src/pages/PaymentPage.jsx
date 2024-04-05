import { useContext, useEffect } from "react";
import PaymentView from "../components/user/PaymentView"
import OrderContext from "../store/OrderContext";
import { redirect, useLoaderData } from "react-router-dom";

const PaymentPage = () => {

    const {setOrder} = useContext(OrderContext)
    const data = useLoaderData()

    useEffect(() => {
        setOrder(data)
    },[data])

    return <PaymentView/>
}

export default PaymentPage;

export async function action({request, params}){
    return null
}

export async function loader({request, params}){

    const id = params.id

    const response = await fetch(`http://localhost:8080/guest/order/${id}`)

    if(!response.ok){
        const error = new Error('sth went wrong')
        throw error
    }

    const result = await response.json()

    if(!result){
        return redirect(`/menu/${id}`)
    }

    return result

}