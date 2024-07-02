import { redirect } from "react-router-dom";
import { getAuthToken } from "../util/auth";

export async function action({request, params}) {

    const token = getAuthToken()

    if(!token){
        return redirect('/login')
    }

    const formData = await request.formData()
    const method = request.method;
    let data;

    if(method === "POST"){
         data = {
            tables: formData.get('tables'),
            mapName: formData.get('mapName')
        }
    }

    if(method === "PUT"){
        data = {
            map: formData.get('map')
        }
    }
    
    let path = 'http://localhost:8080/map'

    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(path, options)

    if(!response.ok){
        throw new Error('nesto nece')
    }

    const result = await response.json()
    
    return redirect('/maps')
}