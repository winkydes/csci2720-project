import * as React from "react";
import { Routes, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={loggedIn? <Home /> : <LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
