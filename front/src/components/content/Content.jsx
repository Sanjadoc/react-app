import './Content.scss';

import AddArticles from "./addArticles/AddArticles";
import Articles from "./articles/Articles";
import Home from "./home/Home"
import { PAGE } from '../constants/Pages';
import UserProfile from "./userProfile/UserProfile";

function Content({currentPage, setUserHook}) {
  return (
    <div className="content">
      {currentPage === PAGE.HOME &&  <Home />}
      {currentPage === PAGE.ARTICLES && <Articles />}
      {currentPage === PAGE.ADDARTICLES && <AddArticles />}
      {currentPage === PAGE.PROFILE && <UserProfile setUserHook={setUserHook}/>}
    </div>
  );
}

export default Content;