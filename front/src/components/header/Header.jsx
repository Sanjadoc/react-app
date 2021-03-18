import "./Header.scss";

import { Link, NavLink } from "react-router-dom";

import AddEditArticlesBtn from "../../containers/articles/singleArticle/AddEditArticlesBtn";
import { Button } from "@material-ui/core";
import Logo from "./components/logo/Logo";
import PropTypes from "prop-types";
import UserNav from "./components/userNav/UserNav";

function Header({user}) {
    return (
      <header className="header"> 
        <Link to='/' component={Logo} />
        <div className="header__nav">
          <NavLink exact to="/articles" activeClassName="active">
            <Button variant="contained" color="primary" aria-label="Articles">Articles</Button>
          </NavLink>
          <AddEditArticlesBtn isCreate={true} />
          <NavLink  to="/profile" activeClassName="active">
            <Button variant="contained" color="primary" aria-label="Profile">{`Profile ${user ? ": "+user : ""}`}</Button>
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
  user: ""
}

export default Header;