import './Content.scss';

import {Redirect, Route, Switch} from 'react-router-dom'

import ArticlesListContainer from '../../containers/articles/ArticlesList';
import Home from "./home/Home"
import LoginPageContainer from '../../containers/loginPage/LoginPage';
import NotFound from './404/NotFound';
import SingleArticleContainer from '../../containers/articles/singleArticle/SingleArticle';
import UserProfile from "../../containers/users/userProfile/UserProfile";

function Content() {
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
          <LoginPageContainer/>
        </Route>
         <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default Content;