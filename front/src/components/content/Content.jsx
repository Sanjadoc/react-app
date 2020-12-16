import './Content.scss';

import AddArticles from "./addArticles/AddArticles";
import Articles from "./articles/Articles";
import Home from "./home/Home"
import UserProfile from "./userProfile/UserProfile";

function Content({currentPage, setUserHook}) {
  return (
    <div className="content">
      {currentPage === 'homePage' &&  <Home />}
      {currentPage === 'aritclePage' && <Articles />}
      {currentPage === 'addArticlesPage' && <AddArticles />}
      {currentPage === 'userPage' && <UserProfile setUserHook={setUserHook}/>}
    </div>
  );
}

export default Content;