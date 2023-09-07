import React, { useState ,useContext } from "react";
import "./list.css";
import background from "../../assets/fabrizio-conti-c3wsMnxQZDw-unsplash.jpg";
import Card from "../../Components/card/activeCard";
import Card2 from "../../Components/card/completeCard";
// import { Context } from "../../Components/contexProvider";

function List() {
    const [open,setOpen]=useState(false);
    

  return (
    <div
      className="bg-cover bg-center w-full h-screen background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="list">
       <div className="listHeading shadow-2xl">
       <h1>To do List</h1>
       </div>
       <h1 className="heading active">Active List:</h1>
       <Card/>
       <h1 className="heading complete" onClick={()=>setOpen(!open)}>Completed:</h1>
       {open && (<Card2/>)}
      </div>
    </div>
  );
}

export default List;
