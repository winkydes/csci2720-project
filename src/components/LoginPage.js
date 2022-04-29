function LoginPage() {
    return(
        <div className="h-100 d-flex justify-content-center align-items-center flex-column">
            <h2>Login!</h2>
            <form className="d-flex flex-column">
                <div>
                    <label className="m-2">Username:</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label className="m-2">Password:</label>
                    <input type="text"></input>
                </div>
                <button>Login!</button>
            </form>
        </div>
    );
};

export default LoginPage;