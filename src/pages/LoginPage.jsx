import { redirect } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
    return <LoginForm />
}

export default LoginPage;

export async function action({request}){
    
    const formData = await request.formData()

    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const response = await fetch("http://localhost:8080/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!response.ok){
        throw new Error('Nesto nece')
    }

    const result = await response.json()
    const token = result.token

    localStorage.setItem('token', token)

    return redirect('/home')

}
