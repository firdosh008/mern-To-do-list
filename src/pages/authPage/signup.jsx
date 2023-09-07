import image from "../../assets/fabrizio-conti-c3wsMnxQZDw-unsplash.jpg"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [userData, setUserData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
  });

  const history = useNavigate("");

  const addUser = (e) => {
    const { name, value } = e.target;
    setUserData(()=>
      {
        return{
          ...userData,
          [name]:value
        }
      }
    );
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { name, email,password, confirmPassword } = userData;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, email,password, confirmPassword
      }),
    });
    const data = await res.json();
    console.log(res.status);

    if (res.status === 422 || !data) {
      toast.warn(data.error,{
        position:"top-center",
      });
      //window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      toast.success("Registration Successful Go to loginPage",{
        position:"top-center",
      });
     
     // window.alert("Registration Successful");
      console.log("Registration Successful");
      setUserData({...userData,
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
      });
      history("/");
    }
  };

  return (
    <section class="bg-gray-150 min-h-screen flex items-center justify-center shadow-2xl">
      <div class="bg-gray-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div class="md:w-1/2 px-16">
          <h2 class="text-4xl text-[#db0907]">Sign Up</h2>
          <form method='POST' class="flex flex-col gap-4">
            <input
              class="p-2 mt-8 rounded-xl border"
              type="text"
              name="name"
              placeholder="Name"
              onChange={addUser} value={userData.name}
            />
            <input
              class="p-2 mt-2 rounded-xl border"
              type="text"
              name="email"
              placeholder="Email"
              onChange={addUser} value={userData.email}
            />
            <input
              class="p-2 mt-2  rounded-xl border w-full"
              type="password"
              name="password"
              placeholder="Password"
              onChange={addUser} value={userData.password}
            />
            <input
              class="p-2 mt-2 mb-3 rounded-xl border"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={addUser} value={userData.confirmPassword}
            />
            <button class="bg-[#db0907] rounded-xl text-white py-2 hover:scale-105 duration-300" onClick={sendData}>Sign Up
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
            SignUp with Google
          </button>
        </div>
        <div class="md:block hidden w-1/2 p-5">
          <img class="h-[30rem] rounded-3xl" src={image} alt="" />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default SignUp;
