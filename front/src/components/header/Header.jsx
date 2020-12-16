import './Header.scss';

import Button from "./components/button/Button";
import Logo from './components/logo/Logo';
import UserNav from "./components/userNav/UserNav";

function Header({setPageHook, user}) {
    return (
      <header className="header">
        <Logo onClick={() => setPageHook('homePage')}/>
        <div className="header__nav">
          <Button title={'Articles'} onClick={() => setPageHook('aritclePage')}/>
          <Button title={'Add article'} onClick={() => setPageHook('addArticlesPage')}/>
          <Button title={'Profile '+ user} onClick={() => setPageHook('userPage')}/>
        </div>
        <UserNav name={user}/>
      </header>
    );
}

export default Header;