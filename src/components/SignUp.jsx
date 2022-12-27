import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SignUp(props) {

    let [name ,setName] = useState("");
    let [fname ,setFName] = useState("");
    let [email ,setEmail] = useState("");
    let [password ,setPassword] = useState("");
    let [err ,setErr] = useState("");
    let [mess, setMess] = useState("")


    let obj = {
        firstName  : name,
        lastName  : fname,
        email  : email,
        password  : password
    }
  
    const signUp = async (e) => {
      e.preventDefault();
      try {
        let response = await axios.post(`${props.baseUrl}/signup`, obj)
        console.log("signup successful");
        setMess(response?.data?.message)
      } 
      catch (e) {
        setErr(e.response?.data?.message)
        }
        setTimeout(()=>{
          setErr("")
          setMess("")
        },1500)
    }
  
  
  

  return (
    <>
           <div className="login-box">

<h2>Sign Up</h2>


<form onSubmit={signUp} autoComplete="off">
  <div className="user-box">
    <input type="text" id="firstName" title="name does not contains a number" name="hidden" value={name} onChange={(e)=>{setName(e.target.value)}} required />
    <label>First Name</label>
  </div>
  <div className="user-box">
    <input type="text" id="surName" value={fname} onChange={(e)=>{setFName(e.target.value)}} name="hidden" title="name does not contains a number" required />
    <label>Father Name</label>
  </div>
  <div className="user-box">
    <input type="number" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="number" title="mobile num starts with +92 and contain 12 numbers" required maxLength="12" minLength="11" />
    <label>Mobile Number</label>
  </div>
  <div className="user-box">
    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" id="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
    <label>Password</label>
  </div>
  <button className="a" type="submit">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    Submit
  </button>

</form>
<div className="center"><Link className="anchor" to="/login">Already Sign In!</Link></div> 
<p className="error">{err} <span style={{color:"lightgreen", textDecoration:"underline"}}> {mess}</span></p>
</div>


    </>
  )
}
