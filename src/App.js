import './App.css';
import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { GlobalContext } from './context/Context';
import Dashboard from './components/Dashboard';

function App() {

  let { state, dispatch } = useContext(GlobalContext);


  let baseUrl = "";
  if (window.location.href.split(":")[0] === "http") {
    baseUrl = "http://localhost:5001"
  }

  else{
    baseUrl = "https://mern-signup.cyclic.app"
  }
  


  return (

    <>

  {    (state.isLogin === false) ?
      <Routes>
        <Route path='/' exact element={<SignUp baseUrl={baseUrl}/>}/>
        <Route path='/login' element={<Login baseUrl={baseUrl}/>}/>
       <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>

      :

      <Routes>
        <Route path='/' element={<Dashboard baseUrl={baseUrl}/>}/>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>

}
    </>
  );
}

export default App;
