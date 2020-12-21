import './LoginForm.scss';

import PropTypes from 'prop-types';

function LoginForm({setUserHook}) {

    return (
        <div className="login-form">
            <h3> Login, please) </h3>
            <form onSubmit={setUserHook}>
                <label>First name:</label>
                <input type="text" name="firstName" maxLength="60" autoComplete="off" required/>
                <label>Last name:</label>
                <input type="text" name="lastName" maxLength="60" autoComplete="off" required/>
                {/* <label>Pass:</label>
                <input type="password" name="pass" required/> */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

LoginForm.propType = {
    setUserHook: PropTypes.func.isRequired
}

export default LoginForm;
