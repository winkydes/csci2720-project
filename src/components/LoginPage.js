import React from 'react';
import { Link } from 'react-router-dom';
import '../css/login.css';

function LoginPage(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isUsernameValid, setUsernameValid] = React.useState(true);
  const [isPasswordValid, setPasswordValid] = React.useState(true);

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    // Check username and password
    await setUsernameValid(username !== '');
    await setPasswordValid(password !== '');

    // fire checking if user exists and password correct
    fetch('http://localhost/verifyLogin', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUsernameValid(res.usernameVerified);
        setPasswordValid(res.passwordVerified);
        if (res.passwordVerified && res.usernameVerified){
          props.callback(true);
          if (res.isAdmin === true) {
            props.callbackA(true);
          }
        }
        else console.log('you have inputted the wrong info');
      })
  };

  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column">
      {/* <div class="container"> */}
      <section class="login">
        <h2>Login!</h2>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          {/* <div className="w-100 mt-2 d-flex justify-content-between"> */}
          <div className="mb-3">
            {/* <label className="me-2">Username:</label> */}
            <input
              className={`border rounded ${isUsernameValid ? 'form-control border-dark' : 'form-control border-danger'}`}
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />
          </div>

          {/* <div className="w-100 mt-2 d-flex justify-content-between"> */}
          <div className="mb-3">
            {/* <label className="me-2">Password:</label> */}
            <input
              className={`border rounded ${isPasswordValid ? 'form-control border-dark' : 'form-control border-danger'}`}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
            />
          </div>

          <div class="mb-3">
            <button class="btn btn-primary d-block w-100" type="submit">Log In</button>
            {/* <input className="mt-2" type="submit" /> */}
          </div>
        </form>
        <Link to="/register">Don't have an account?</Link>
      </section>
    </div>
  );
}

export default LoginPage;
