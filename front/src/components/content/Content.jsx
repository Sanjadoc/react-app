import './Content.scss';

import {Route, Switch} from 'react-router-dom'

import ArticlesListContainer from '../../containers/articles/ArticlesList';
import CreateArticleContainer from '../../containers/articles/singleArticle/CreateArticle';
import Home from "./home/Home"
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
        <Route exact sensitive strict 
          path={["/articles/add", "/articles/:id/edit"]}
          render={propsRoute => <CreateArticleContainer routes={propsRoute} />} />
        <Route exact path="/articles/:id" render = { propsRoute => <SingleArticleContainer routes={propsRoute} /> } />
        <Route exact path="/profile">
          <UserProfile setUserHook={setUserHook} userData={userData}/>
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