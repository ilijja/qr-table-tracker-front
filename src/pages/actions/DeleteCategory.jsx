import { redirect } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

export async function action({request,params}){

    const token = getAuthToken()

    if(!token){
        redirect('/login')
    }

    const menuId = params.id
    const categoryId = params.categoryId

    const response = await fetch(`http://localhost:8080/menu/category/${categoryId}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "DELETE"
    })

    if(!response.ok){
        throw new Error("Something went wrong")
    }

    const result = await response.json()

    return redirect(`/products/${menuId}`);

}