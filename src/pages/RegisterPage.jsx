import { redirect } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;

export async function action({ request }) {
  const formData = await request.formData();

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    address: formData.get("address"),
  };

  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response failed");
  }

  const result = await response.json()
  return redirect('/login')

}
