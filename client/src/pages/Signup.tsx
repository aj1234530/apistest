import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}
function Signup() {
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<null | string>(null); //message
  const [isLoading, setIsLoading] = useState(false); //loading state
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("1");
    //call to backend
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3002/api/v1/auth/signup",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setIsLoading(false);
        setMessage(
          response?.data?.message ||
            "Signup Successful,  we are redirecting to  home page"
        );
        navigate("/");
      }
    } catch (error: any) {
      setIsLoading(false);
      setMessage(
        error?.response?.data?.message ||
          "some error occured, retry a bit later"
      );
      console.log(error);
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
            <label>Enter Username</label>
            <input
              type="text"
              required
              placeholder="username"
              className="border rounded-lg !p-2"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
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
            {isLoading ? `Signing Up...` : `Signup`}
          </button>
        </form>
        {message && <div>{message}</div>}
      </div>
    </div>
  );
}

export default Signup;
