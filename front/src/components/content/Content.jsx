import './Content.scss';

import AddArticles from "./addArticles/AddArticles";
import Articles from "./articles/Articles";
import Home from "./home/Home"
import { PAGE } from '../constants/Pages';
import PropTypes from 'prop-types';
import UserProfile from "./userProfile/UserProfile";

function Content({currentPage, setUserHook, userData}) {
  return (
    <div className="content">
      {currentPage === PAGE.HOME &&  <Home />}
      {currentPage === PAGE.ARTICLES && <Articles />}
      {currentPage === PAGE.ADDARTICLES && <AddArticles />}
      {currentPage === PAGE.PROFILE && <UserProfile setUserHook={setUserHook} userData={userData}/>}
    </div>
  );
}

Content.propType = {
  currentPage: PropTypes.number,
  setUserHook: PropTypes.func.isRequired,
  userData: PropTypes.func.isRequired
}

Content.defaultProps = {
  currentPage: PAGE.HOME
}


export default Content;