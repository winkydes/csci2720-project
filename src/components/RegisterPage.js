import React from 'react';

function RegisterPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isUsernameValid, setUsernameValid] = React.useState(true);
  const [isPasswordValid, setPasswordValid] = React.useState(true);

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    // Check username and password
    setUsernameValid(username !== '');
		setPasswordValid(password !== '');
  };

  return (
    <div className="h-100 d-flex justify-content-center align-items-center flex-column">
      <h2>Register</h2>
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <div className="w-100 mt-2 d-flex justify-content-between">
          <label className="me-2">Username:</label>
          <input className={`border rounded ${isUsernameValid ? 'border-dark' : 'border-danger'}`} placeholder="username" value={username} onChange={e => setUsername(e.target.value)} type="text" />
        </div>

        <div className="w-100 mt-2 d-flex justify-content-between">
          <label className="me-2">Password:</label>
          <input className={`border rounded ${isPasswordValid ? 'border-dark' : 'border-danger'}`} placeholder="password" value={password} onChange={e => setPassword(e.target.value)} type="text" />
        </div>
        
        <input type="submit" />
      </form>
    </div>
  );
}

export default RegisterPage;
