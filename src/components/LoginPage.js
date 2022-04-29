import React from 'react';

function LoginPage() {
    const [errorMessages, setErrorMessages] = React.useState({});
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    const renderErrorMessage = (name) => name === errorMessages.name && (<div className="error">{errorMessages.message}</div>);

    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        
        //check username and password
    };

    return(
        <div className="h-100 d-flex justify-content-center align-items-center flex-column">
            <h2>Login!</h2>
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
                <div>
                    <label className="m-2">Username:</label>
                    <input type="text" required />
                    {renderErrorMessage("username")}
                </div>
                <div>
                    <label className="m-2">Password:</label>
                    <input type="text" required />
                    {renderErrorMessage("password")}
                </div>
                <input type="submit"/>
            </form>
        </div>
    );
};

export default LoginPage;