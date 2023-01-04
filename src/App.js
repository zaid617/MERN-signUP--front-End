import './App.css';
import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { GlobalContext } from './context/Context';
import axios from 'axios';
import Dashboard from './components/productSection/Dashboard/Dashboard';

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
        let response = await axios.get(
          `${baseUrl}/profile`,
          {
            withCredentials: true,
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
              'Expires': '0',
            }
          });

        console.log("response: ", response);

        dispatch({
          type: 'USER_LOGIN',
          payload: response.data
        })
      } catch (error) {

        console.log("axios error: ", error);

        dispatch({
          type: 'USER_LOGOUT'
        })
      }



    }
    getProfile();

  }, [baseUrl, dispatch])


  useEffect(() => {

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      config.withCredentials = true;
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        dispatch({
          type: 'USER_LOGOUT'
        })
      }
      return Promise.reject(error);
    });
  }, [dispatch])


  return (

    <>

  {    (state.isLogin === false || null) ?
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

{(state.isLogin === null) ?

<div style={{ position: "absolute" , top:"0",overflowY:'hidden', left: "0" }}>
  <img style={{width:"98.5vw", height:"100vh" , objectFit:"cover",}} src="https://f.hubspotusercontent40.net/hubfs/5621549/check-loader-gif.gif" alt="" />
</div>

: null}

    </>
  );
}

export default App;
