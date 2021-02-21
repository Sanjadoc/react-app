import './Content.scss';

import {Route, Switch} from 'react-router-dom'

import AddArticles from "./articles/addArticles/AddArticles";
import ArticlesListContainer from '../../containers/articles/ArticlesList';
import Home from "./home/Home"
import NotFound from './404/NotFound';
import PropTypes from 'prop-types';
import SingleArticle from './articles/singleArticle/SingleArticle';
import UserProfile from "./userProfile/UserProfile";

function Content({setUserHook, userData}) {
  return (
    <div className="content">
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/articles'>
          <ArticlesListContainer />
        </Route>
        <Route exact path='/articles/add' component={AddArticles}/>
        <Route exact path='/articles/:id'
          render = { propsRoute => 
            <SingleArticle props={propsRoute} />
          } 
        >
        </Route>
        <Route exact path='/profile'>
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