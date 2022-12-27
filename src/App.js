import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {


  let baseUrl = "";
  if (window.location.href.split(":")[0] === "http") {
    baseUrl = "http://localhost:5001"
  }

  else{
    baseUrl = "https://mern-signup.cyclic.app"
  }
  


  return (

    <>

      <Routes>
        <Route path='/' exact element={<SignUp baseUrl={baseUrl}/>}/>
        <Route path='/login' element={<Login baseUrl={baseUrl}/>}/>
      </Routes>

    </>
  );
}

export default App;
