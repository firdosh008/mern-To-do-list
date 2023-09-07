import React from "react";
import image from "../../assets/fabrizio-conti-c3wsMnxQZDw-unsplash.jpg";
import { Link ,useNavigate } from 'react-router-dom';
import { useState,useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../Components/contexProvider";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [account,setAccount]=useContext(Context)
  //console.log(loginData);

  const history = useNavigate("");

  const addLogin = (e) => {
    const { name, value } = e.target;
    setLoginData(() => {
      return {
        ...loginData,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    // console.log(data);

    if (
      res.status === 401 ||
      !data ||
      res.status === 403 ||
      res.status === 404
    ) {
      toast.error(data.error, {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (res.status === 402) {
      toast.warn(data.error, {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      console.log("Login Successful");
      setLoginData({ ...loginData, email: "", password: "" });
      setAccount(data);
      // console.log(data);
      
      toast.success("login Successful", {
      position: "top-center",
      });
      history("/user/list");
    }
  };

  return (
    <section class="bg-gray-150 min-h-screen flex items-center justify-center shadow-2xl">
      <div class="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div class="md:w-1/2 px-16">
          <h2 class="text-4xl text-[#db0907]">Login</h2>
          <form action="" class="flex flex-col gap-4">
            <input
              class="p-2 mt-8 rounded-xl border"
              name="email"
              type="email"
              onChange={addLogin}
              value={loginData.email}
              placeholder="Email"
            />
            <input
              class="p-2 mt-2 mb-3 rounded-xl border w-full"
              name="password"
              type="text"
              onChange={addLogin}
              value={loginData.password}
              placeholder="Password"
            />
            <button class="bg-[#db0907] rounded-xl text-white py-2 hover:scale-105 duration-300" onClick={sendData}>
              Log in
            </button>
          </form>
          <div class="mt-10 grid grid-cols-3 items-center text-gray-500 ">
            <hr class="border-gray-400" />
            <p class="text-center text-sm">OR</p>
            <hr class="border-gray-400" />
          </div>
          <button class="bg-white border py-2 hover:scale-105 duration-300 w-full rounded-xl mt-5 flex justify-center items-center text-sm">
            <svg
              class="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Login with Google
          </button>
          <div>
            <p class="mt-5 text-xs border-b border-gray-400 py-6">
              Forgot your password..?
            </p>
          </div>
          <div class="mt-3 text-xs flex justify-between items-center">
            <p>If you don't have an account...</p>
            <button class="py-2 px-8 hover:scale-110 duration-300 bg-white border rounded-xl">
              <Link to="/signup"> Sign_Up</Link>
            </button>
          </div>
        </div>
        <div class="md:block hidden w-1/2 p-1">
          <img class="h-[30rem] rounded-2xl" src={image} alt="" />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Login;
