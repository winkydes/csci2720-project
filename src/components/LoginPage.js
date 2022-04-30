import React from 'react';

function LoginPage() {
    const [username,setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameValid, setUsernameValid] = React.useState(true);
    const [passwordValid, setPasswordValid] = React.useState(true);

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        //check username and password
        username===''? setUsernameValid(false):setUsernameValid(true);
        password===''? setPasswordValid(false):setPasswordValid(true);
    };

    return(
        <div className="h-100 d-flex justify-content-center align-items-center flex-column">
            <h2>Login!</h2>
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
                <div className="m-2 d-flex justify-content-between">
                    <label className="m-2">Username:</label>
                    <input className={usernameValid?"border border-dark" : "border border-danger"} placeholder="username" value={username} onChange={e => setUsername(e.target.value)} type="text" />
                </div>
                <div className="m-2 d-flex justify-content-between">
                    <label className="m-2">Password:</label>
                    <input className={passwordValid?"border border-dark" : "border border-danger"} placeholder="password" value={password} onChange={e => setPassword(e.target.value)} type="text" />
                </div>
                <input type="submit"/>
            </form>
        </div>
    );
};

export default LoginPage;