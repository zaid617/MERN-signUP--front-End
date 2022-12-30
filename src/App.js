import './App.css';
import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { GlobalContext } from './context/Context';
import Dashboard from './components/Dashboard';
import axios from 'axios';

function App() {

  let { state, dispatch } = useContext(GlobalContext);


  let baseUrl = "";
  if (window.location.href.split(":")[0] === "http") {
    baseUrl = "http://localhost:5001"
  }

  else{
    baseUrl = "https://mern-signup.cyclic.app"
  }

  useEffect(() => {
    
    const getProfile = async () => {
      try {
        let response = await axios.get(`${state.baseUrl}/products`, {
          withCredentials: true
        })
        console.log("response: ", response.data);
        dispatch({
          type: 'USER_LOGIN'
        })

      } catch (error) {

        console.log("axios error: ", error);
        dispatch({
          type: 'USER_LOGOUT'
        })
        
      }



    }
    getProfile();

  }, [dispatch, state.baseUrl])
  


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
        <Route path='/' exact element={<Dashboard baseUrl={baseUrl}/>}/>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>

}
    </>
  );
}

export default App;
