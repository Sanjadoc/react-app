import "./Header.scss";

import { Link, NavLink } from "react-router-dom";

import AddEditArticlesBtn from "../../containers/articles/singleArticle/AddEditArticlesBtn";
import { Button } from "@material-ui/core";
import Logo from "./components/logo/Logo";
import UserNav from "./components/userNav/UserNav";

function Header({user, handleLogout}) {
    return (
      <header className="header"> 
        <Link to='/' component={Logo} />
        {user &&
          <div className="header__nav">
            <NavLink exact to="/articles" activeClassName="active">
              <Button variant="contained" color="primary" aria-label="Articles">Articles</Button>
            </NavLink>
            <AddEditArticlesBtn isCreate={true} />
            <NavLink  to="/profile" activeClassName="active">
              <Button variant="contained" color="primary" aria-label="Profile">{`Profile ${user ? ": "+user.first_name : ""}`}</Button>
            </NavLink>
          </div>  
        }
        {!user &&
          <div className="header__nav">
            <Link to={"/login"}>
              <Button variant="contained" color="primary" aria-label="Articles">Login/registretion</Button>
            </Link>
          </div>
        }
        {user && <UserNav user={user} handleLogout={handleLogout}/> }
      </header>
    );
}

export default Header;