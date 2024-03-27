import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../server";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();

    
    axios.post(`${server}/user/login`, {
        email,
        password
    },{withCredentials:true}).then((res)=>{
        toast(res.data.message);
        navigate("/");
        window.location.reload();
    }).catch((error)=>{
        toast(error.response.data.message);
    })
  };

  return (
    <div>
      <section className="pl-[10rem] flex overflow-hidden">
        <div className="mr-[2rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form onSubmit={submitHandler} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="my-[2rem]">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]">
              Sign In
            </button>
          </form>

          <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link to={"/register"} className="text-teal-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-[30rem] w-[40%] xl:block md:hidden sm:hidden rounded-lg mt-[5rem]"
        />
      </section>
    </div>
  );
};

export default Login;