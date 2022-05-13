import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();

    // Check username and password
    await setUsernameValid(username !== '' && username.length >= 4 && username.length <= 20);
    await setPasswordValid(password !== '' && password.length >= 4 && password.length <= 20);

    //check password format

    //check if username have been used
    if (isUsernameValid && isPasswordValid) {
      fetch('http://localhost/checkUsername', {
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
          setUsernameValid((username) => (username = res.verified));
          if (res.verified && isPasswordValid) {
            fetch('http://localhost/createUser', {
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
  );
}

export default RegisterPage;
