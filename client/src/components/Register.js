import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";

function Register({setAuth}) {

  const [inputs, setInputs] = useState({
    firstName: "",
    username: "",
    password: ""
  });

  const {firstName, username, password} = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  };

  const onSubmitForm = async(e) => {
    e.preventDefault();
    try {

      const body = { firstName, username, password };

      const response = await fetch("http://localhost:5001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    const parseRes = await response.json();

    localStorage.setItem("token", parseRes.token);

    setAuth(true);
      
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Fragment>
      <h1>Register</h1>
      <form onSubmit={onSubmitForm}>
        <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={e => onChange(e)}></input>
        <input type="text" name="username" placeholder="username" value={username} onChange={e => onChange(e)}></input>
        <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)}></input>
        <button type='submit'>Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </Fragment>
  )
}

export default Register