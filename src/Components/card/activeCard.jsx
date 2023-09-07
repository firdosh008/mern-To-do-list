import React from 'react'
import Items from "./activeitems"
import "./Card.css"
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from '../contexProvider';

function Card() {
  const [account,setAccount]=useContext(Context);
  // console.log(account.data.ToDos);
  return (
    <div className="card shadow-2xl">
        <form action="/delete" method="post">
        {
         account.data.ToDos.map((ni)=>(
          <Items Items={ni}/>
          ))
      }
          </form>
       <Link to="/create"><button class="rounded-full  hover:scale-105 duration-300">+</button></Link>
        </div>
  )
}
export default Card
