import React, { useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../../context/Context';

export default function Dashboard(props) {


    
  let { state, dispatch } = useContext(GlobalContext);




    const logOut = async ()=>{

      try {
        let response = await axios.post(`${props.baseUrl}/logout`,
        {},
        {
          withCredentials: true
        })
        console.log("logout successful");
        dispatch({
          type: 'USER_LOGOUT'
        })

    }      catch (e) {
        console.log("error");
    }
 
    }
    
  return (
    <div>
      <h1 style={{color:"white"}}>User Login</h1>
      <button onClick={logOut}>Logout user </button>
    </div>
  )
}
