/**
 * Group 29
 * 1155143490 Ng Ka Chun
 * 1155143499 Wan Yee Kid
 * 1155133260 Lam Wai To Keith
 * 1155127101 Ng Wing Yin
 * 1155127221 HE Zhanbo
 * 1155125257 Ho Cheuk Hin
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackToHomeHeader from './BackToHomeHeader';

const baseURL = 'http://localhost';

function RegisterPage(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isUsernameValid, setUsernameValid] = React.useState(true);
  const [isPasswordValid, setPasswordValid] = React.useState(true);

  let navigate = useNavigate();

  function sendRequest() {
    props.loginCallback(true);
    props.usernameCallback(username);
    navigate('../home');
  }
  const handleSubmit = (event) => { 
    // Prevent page reload
    event.preventDefault();

    // Check username and password
    // setUsernameValid(username !== '' && username.length >= 4 && username.length <= 20);
    // setPasswordValid(password !== '' && password.length >= 4 && password.length <= 20);
    
    let v = true;
    if (username !== '' && username.length >= 4 && username.length <= 20) {
      setUsernameValid(true)
      console.log('hi')
    } else {
      setUsernameValid(false)
      v = false
      // return
    }

    if (password !== '' && password.length >= 4 && password.length <= 20) {
      setPasswordValid(true)
      console.log('hii')
    } else {  
      setPasswordValid(false)
      v = false
      // return
    }

    if (v === false) return

    //check password format

    //check if username have been used
    // if (isUsernameValid && isPasswordValid) {
    if (v) {
      fetch(baseURL + '/checkUsername', {
        method: 'POST',
        body: JSON.stringify({ username: username }),
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUsernameValid((isusernameValid) => (isusernameValid = res.verified));
          if (isUsernameValid && isPasswordValid) {
            fetch(baseURL + '/createUser', {
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
              .then(() => sendRequest());
          }
        });
    }
  };

  return (
    <div className="h-100">
      <BackToHomeHeader />
      <div className="h-100 d-flex justify-content-center align-items-center flex-column">
        <section class="register">
          <h2>Register</h2>
          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            {/* <div className="w-100 mt-2 d-flex justify-content-between"> */}
            <div className="mb-3">
              {/* <label className="me-2">Username:</label> */}
              <input
                className={`border rounded ${
                  isUsernameValid ? 'form-control border-dark' : 'form-control border-danger'
                }`}
                placeholder="User Name: 4-20 character"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
              />
            </div>

            {/* <div className="w-100 mt-2 d-flex justify-content-between"> */}
            <div className="mb-3">
              {/* <label className="me-2">Password:</label> */}
              <input
                className={`border rounded ${
                  isPasswordValid ? 'form-control border-dark' : 'form-control border-danger'
                }`}
                placeholder="Password: 4-20 character"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="text"
              />
            </div>

            <div class="mb-3">
              <button class="btn btn-primary d-block w-100" type="submit">
                Register
              </button>
              {/* <input className="mt-2" type="submit" /> */}
            </div>
          </form>
        </section>
      </div>
    </div>
    
  );
}

export default RegisterPage;
