import './Logo.scss';

import { Link } from 'react-router-dom';
import logo from './assets/logo.svg';

function Logo() {
    return (
        <div className="header__logo">
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>
        </div>
    );
}

export default Logo;
