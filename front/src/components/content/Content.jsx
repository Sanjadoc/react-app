import './Content.scss';

import {Route, Switch} from 'react-router-dom'

import ArticlesListContainer from '../../containers/articles/ArticlesList';
import Home from "./home/Home"
import LoginPageContainer from '../../containers/loginPage/LoginPage';
import NotFound from './404/NotFound';
import PropTypes from 'prop-types';
import SingleArticleContainer from '../../containers/articles/singleArticle/SingleArticle';
import UserProfile from "./userProfile/UserProfile";

function Content({setUserHook, userData}) {
  return (
    <div className="content">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/articles">
          <ArticlesListContainer />
        </Route>
        <Route exact sensitive path="/articles/:id" render = { propsRoute => <SingleArticleContainer routes={propsRoute} /> } />
        <Route exact path="/profile">
          <UserProfile/>
        </Route>
        <Route exact path="/login">
          <LoginPageContainer setUserHook={setUserHook}/>
        </Route>
         <Route component={NotFound} />
      </Switch>
    </div>
  );
}

Content.propType = {
  setUserHook: PropTypes.func.isRequired,
  userData: PropTypes.func.isRequired
}

export default Content;