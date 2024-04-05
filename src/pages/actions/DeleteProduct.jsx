import { redirect } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

export async function action({params}){

    const token = getAuthToken()

    if(!token){
        return redirect('/login')
    }

    const {id, productId} = params;

    const response = await fetch(`http://localhost:8080/menu/product/${productId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })


    if(!response.ok){
        throw new Error("Something went wrong")
    }

    return redirect(`/products/${params.id}`);
}