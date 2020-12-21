import './Logo.scss';

import PropTypes from 'prop-types';
import logo from './logo.svg';

function Logo({onClick}) {
    return (
        <div className="header__logo" onClick={onClick}>
            <img src={logo} alt="logo" />
        </div>
    );
}

Logo.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default Logo;
