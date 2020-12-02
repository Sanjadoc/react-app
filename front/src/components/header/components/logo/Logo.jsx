import './Logo.scss';

import logo from './logo.svg';

function Logo() {
    return (
        <a className="header__logo" href="/" alt="home page">
            <img src={logo} alt="logo" />
        </a>
    );
}

export default Logo;
