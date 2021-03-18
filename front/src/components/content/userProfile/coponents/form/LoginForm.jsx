import './LoginForm.scss';

import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import SendIcon from '@material-ui/icons/Send';

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
                <Button variant="contained" color="primary" aria-label="Submit" type="submit" endIcon={<SendIcon/>}>Submit</Button>
            </form>
        </div>
    );
}

LoginForm.propType = {
    setUserHook: PropTypes.func.isRequired
}

export default LoginForm;
