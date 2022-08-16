import React, {Fragment, useState} from 'react';
import {Link} from "react-router-dom";

function Login({setAuth}) {

  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const {username, password} = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  };

  const onSubmitForm = async(e) => {
    e.preventDefault();

    try {

      const body = {username, password};

      const response = await fetch("http://localhost:5001/auth/login", {
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
      <h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input type="text" name="username" placeholder="username" value={username} onChange={e => onChange(e)}></input>
        <input type="password" name="password" placeholder="password" value={password} onChange={e => onChange(e)}></input>
        <button type='submit'>Submit</button>
      </form>
      <Link to="/register">Register</Link>
    </Fragment>
  )
}

export default Login