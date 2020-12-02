import './Header.scss';

import AddButton from "./components/addButton/AddButton";
import HeaderNav from "./components/headerNav/HeaderNav";
import Logo from './components/logo/Logo';

function Header() {
    return (
      <header className="header">
        <Logo />
        <AddButton />
        <HeaderNav />
      </header>
    );
}

export default Header;

