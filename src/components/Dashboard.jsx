import React from 'react'
import { GlobalContext } from '../context/Context';

export default function Dashboard() {
    
  let { state, dispatch } = useContext(GlobalContext);
    const logOut = ()=>{
        dispatch({
            type: 'USER_LOGOUT'
          })
    }
  return (
    <div>
      <h1 style={{color:"white"}}>User Login</h1>
      <button onClick={logOut}>Logout user </button>
    </div>
  )
}
