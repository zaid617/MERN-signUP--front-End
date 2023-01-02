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

        const config = {
          url: `${baseUrl}/products`,
          data: {},
          method: "GET",
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
          withCredentials: true,
        }

        let response = await axios(config)
        console.log("status: ", response.status);

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
  }, [dispatch, baseUrl]);
  


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

{(state.isLogin === null) ?

<div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: '100vh' }}>
  <img width={300} src="https://e7.pngegg.com/pngimages/321/641/png-clipart-load-the-map-loading-load.png" alt="" />
</div>

: null}

    </>
  );
}

export default App;
