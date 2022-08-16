import './App.css';
import React, { Fragment, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

//COMPONENTS
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
   <Fragment>
      <Router>
        <div className='container'>
          <Routes>
            <Route exact path="/login" element={ !isAuthenticated ?  (<Login/>) : (< Navigate to="/dashboard" />) } />
            <Route exact path="/register" element={ !isAuthenticated ? (<Register/>) : (< Navigate to="/login" />) } />
            <Route exact path="/dashboard" element={ isAuthenticated ? (<Dashboard/>) : (< Navigate to="/login" />) } />
          </Routes>
        </div>
      </Router>
   </Fragment>
  );
}

export default App;
