import React, { useState } from 'react'
import axios from 'axios';
import {Link} from "react-router-dom"
import { GlobalContext } from '../context/Context';

    export default function Login(props) {

      let { state, dispatch } = useContext(GlobalContext);
      let [email , setEmail] = useState("");
      let [password , setPassword] = useState("");
      let [err, setErr] = useState("")
      let [mess, setMess] = useState("")

      const login = async (e) =>{
        e.preventDefault();
        try {
          let response = await axios.post(`${props.baseUrl}/login`, {
              email: email,
              password: password
          }, {
              withCredentials: true
          })
          console.log("login successful");
          setMess(response?.data?.message)
          dispatch({
            type: 'USER_LOGIN'
          })

      }      catch (e) {
        setErr(e.response?.data?.message)
        }
        setTimeout(()=>{
          setErr("")
          setMess("")
        },1500)


      }

  return (
    <div>
          <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={login}>
          <div className="user-box">
            <input type="number" id="num" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <label>Number</label>
          </div>
          <div className="user-box">
            <input type="password" id="pass" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <label>Password</label>
          </div>
          <button className="a" type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
        </button>
        <div className="center"><Link className="anchor" to="/">Not Sign up yet!</Link></div> 
        <p className="error">{err}<span style={{color:"lightgreen", textDecoration:"underline"}}>{mess}</span></p>
        </form>
      </div>
    </div>
  )
}
