import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface loginFormData {
  email: string;
  password: string;
}
function Login() {
  const [formData, setFormData] = useState<loginFormData>({
    email: "",
    password: "",
  }); 
  const [message, setMessage] = useState<null | string>(null); //message
  const [isLoading, setIsLoading] = useState(false); //loading
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //call to backend 
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3002/api/v1/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setIsLoading(false);
        setMessage(response.data?.message || "Login  success");
        //redirect logic
        console.log("ksdf");
        localStorage.setItem("token", response.data.token);
        setIsLoading(false);
        setMessage(response.data?.message || "Login  success");
        //redirect logic
        console.log("ksdf");
        navigate("/"); //will navigate to the (use / at start for absoulte path otherwise it willrelate)/ak12/dashboard(but how to maintain it )
      }
      //fix the any here
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
      console.log(error?.response?.data?.message);
      setMessage(error?.response?.data?.message || "Some error occured"); //fallback
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative p-4 w-full max-w-xl max-h-full border rounded-lg ">
        <form
          className="flex flex-col gap-5 justify-center w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col"></div>
          <div className="flex flex-col">
            <label>Enter email</label>
            <input
              type="email"
              placeholder="email"
              className="border rounded-lg !p-2"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label>Enter Password</label>
            <input
              type="password"
              placeholder="enter password"
              className="border rounded-lg !p-2"
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            {isLoading ? `Signing Up...` : `login`}
          </button>
        </form>
        {message && <div>{message}</div>}
      </div>
    </div>
  );
}

export default Login;
