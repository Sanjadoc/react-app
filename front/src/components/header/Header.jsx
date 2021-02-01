import './Header.scss';

import { Link, NavLink } from 'react-router-dom';

import Button from "./components/button/Button";
import Logo from './components/logo/Logo';
import PropTypes from 'prop-types';
import UserNav from "./components/userNav/UserNav";

function Header({user}) {
    return (
      <header className="header"> 
        <Link to='/' component={Logo} />
        <div className="header__nav">
          <NavLink exact to='/articles' activeClassName="active">
            <Button title={'Articles'} />
          </NavLink>
          <NavLink  to='/articles/add' activeClassName="active">
            <Button title={'Add article'} />
          </NavLink>
          <NavLink  to='/profile' activeClassName="active">
            <Button title={`Profile ${user ? ': '+user : ''}`} />
          </NavLink>
        </div>  
        <UserNav name={user}/>
      </header>
    );
}

Header.propTypes = {
  user: PropTypes.string
}

Header.defaultProps = {
  user: ''
}

export default Header;