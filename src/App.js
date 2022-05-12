import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LocationDetail from './components/LocationDetail';
import Admin from './components/admin';
import FavLocation from './components/FavLocation';
import './App.css';

function App() {
  const [isLogIn, setIsLogIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route
          path="/home"
          element={
            isLogIn ? <Home callback={setIsLogIn.bind(this)} username={username} /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/admin"
          element={
            isLogIn && isAdmin ? (
              <Admin loginCallback={setIsLogIn.bind(this)} adminCallback={setIsAdmin.bind(this)} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            <LoginPage
              loginCallback={setIsLogIn.bind(this)}
              adminCallback={setIsAdmin.bind(this)}
              usernameCallback={setUsername.bind(this)}
            />
          }
        />
        <Route
          path="/register"
          element={isLogIn ? <Navigate replace to="/home" /> : <RegisterPage callback={setIsLogIn.bind(this)} />}
        />
        <Route
          path="/locationDetail/:locationName"
          element={isLogIn ? <LocationDetail username={username} /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/favLocation/:favLocation"
          element={isLogIn ? <FavLocation username={username} /> : <Navigate replace to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
