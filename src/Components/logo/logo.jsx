import React,{useState,useEffect, useContext} from 'react'
import "./logo.css"
import { Context } from '../contexProvider';


function Logo() {
  const [profile, setProfile] = useState(false);
  const [account,setAccount]=useContext(Context);
  
  console.log(account)

  const getDetailUser = async () => {
    const res = await fetch("/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 201) {
      console.log("data get successfully");
      // console.log(account);
      setAccount(data);
    } else {
      console.log("data not get");
    }
  };

  // const logout = async () => {
  //   const res = await fetch("/logout", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });
  //   const data = await res.json();
  //   //console.log(data);
  //   if (res.status === 201) {
  //     //console.log("data get successfully");
  //     setAccount({ data: null });
  //     window.location.reload();
  //   } else {
  //     console.log("data not get");
  //   }
  // };

  useEffect(() => {
    getDetailUser();
  }, []);

  return (
    <>
      <div className="profile" onClick={()=>setProfile(!profile)} onMouseLeave={()=>setProfile(!profile)}>
        <button class="rounded-full  hover:scale-105 duration-300">{account.data.name[0].toUpperCase()}</button>
        <div className="user rounded">
          {profile && (
            <div className="profileMenu">
              <ul className="dropdown">
                <li><p to="user/list" className="profileMenu-content">Profile</p></li>
                <li><p className="profileMenu-content" >Logout</p> </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Logo
