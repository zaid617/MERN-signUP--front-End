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
          }
        );

        dispatch({
          type: "USER_LOGIN",
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: "USER_LOGOUT",
        });
        console.log("axios error: ", error);
      }
    };

    getProfile();
  }, [baseUrl, dispatch])

  // axios intercaption js se hr request me withCredentials true ho jae ga sb me alg alg nahi lgana pare ga

  useEffect(() => {
    // request me interceptors add kya he
    // jo ke request send hone se pehle add ho ga
    axios.interceptors.request.use(
      (config) => {
        config.withCredentials = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // respone me interceptors add kya he
    // jo ke response aane ke bad add ho ga
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          dispatch({
            type: "USER_LOGOUT",
          });
        }
        return Promise.reject(error);
      }
    );
  }, [dispatch]);


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

<div style={{ position: "absolute" , top:"0", left: "0" }}>
  <h1 style={{display:"flex",alignItems:"center",background: "linear-gradient(#141e30, #243b55)", justifyContent:"center", width:"98vw", height:"95vh", color:'white'}}>LOADING....</h1>
</div>

: null}

    </>
  );
}

export default App;
