import { redirect } from "react-router-dom";
import MapEditor from "../components/map/MapEditor";
import { getAuthToken } from "../util/auth";
import { useLoaderData } from "react-router-dom";
import MapContext from "../store/MapContext";
import { useContext, useEffect } from "react";

const MapPage = () => {

    const data = useLoaderData()
    const {setMaps} = useContext(MapContext)

    useEffect(() => {
       setMaps(data)
    },[data])

    return <MapEditor/>
}

export default MapPage;

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

