import React, { useState } from "react";
import { useAppContext } from "../../context/Appcontext";
import toast from "react-hot-toast";

const Login = () => {

  const {axios,setToken} = useAppContext()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} =await axios.post("/api/admin/login",{email,password})
      console.log(data);
      

      if(data.success){
        setToken(data.token)
        localStorage.setItem('token',data.token)
        axios.defaults.headers.common['Authorization'] = data.token;
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the <br />{" "}
              <span className="text-primary">admin panel</span>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full text-gray-600 sm:max-w-md"
          >
            <div className="flex flex-col">
              <label> Email </label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                placeholder="Your email id"
                className="border-b-2 border-gray-200 p-2 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <label> Password </label>
              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                placeholder="Your password"
                className="border-b-2 border-gray-200 p-2 outline-none mb-6"
              />
            </div>
            <button
              type="submit"
              className="w-full border bg-primary text-white py-1 rounded text-2xl"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
