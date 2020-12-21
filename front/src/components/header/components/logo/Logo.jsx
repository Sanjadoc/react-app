import './Logo.scss';

import logo from './logo.svg';

function Logo({onClick}) {
    return (
        <div className="header__logo" onClick={onClick}>
            <img src={logo} alt="logo" />
        </div>
    );
}

export default Logo;
