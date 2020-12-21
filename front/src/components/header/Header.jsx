import './Header.scss';

import Button from "./components/button/Button";
import Logo from './components/logo/Logo';
import { PAGE } from '../constants/Pages';
import PropTypes from 'prop-types';
import UserNav from "./components/userNav/UserNav";

function Header({setPageHook, user}) {
    return (
      <header className="header">
        <Logo onClick={setPageHook(PAGE.HOME)}/>
        <div className="header__nav">
          <Button title={'Articles'} onClick={setPageHook(PAGE.ARTICLES)}/>
          <Button title={'Add article'} onClick={setPageHook(PAGE.ADDARTICLES)}/>
          <Button title={'Profile '+ user} onClick={setPageHook(PAGE.PROFILE)}/>
        </div>
        <UserNav name={user}/>
      </header>
    );
}

Header.propTypes = {
  setPageHook: PropTypes.func.isRequired,
  user: PropTypes.string
}

Header.defaultProps = {
  user: ''
}

export default Header;