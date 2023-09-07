import { Routes, Route } from 'react-router-dom';
import  React, {useState }from "react";
import './App.css';


import Logo from './Components/logo/logo';
import Login from './pages/authPage/login';
import Signup from './pages/authPage/signup'
import List from './pages/listPage/List';
import Create from "./pages/createPage/createPage"
import { Context } from './Components/contexProvider';

function App() {
  const [account,setAccount]=useState("");

  return (
    <div className="App">
      <Context.Provider
        value={[account,setAccount]}
      >
      <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="signup" element={<Signup/>}></Route>
      <Route path='user/list' element={<><Logo/><List/></>}></Route>
      <Route path='/create' element={<><Logo/><Create/></>}></Route>
      </Routes>
      </Context.Provider>
    </div>
  );
}

export default App;
