import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
