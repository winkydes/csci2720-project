import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Admin from './components/admin';
import './App.css';

function App() {
  const [isLogIn, setIsLogIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/home" element={isLogIn && !isAdmin ? <Home callback={setIsLogIn.bind(this)} /> : isLogIn && isAdmin ? <Admin callback={setIsLogIn.bind(this)} /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={isLogIn? <Navigate replace to="/home" /> : <LoginPage callback={setIsLogIn.bind(this)} callbackA={setIsAdmin.bind(this)} />} />
        <Route path="/register" element={isLogIn? <Navigate replace to="/home" /> : <RegisterPage callback={setIsLogIn.bind(this)} />} />
      </Routes>
    </div>
  );
}

export default App;
