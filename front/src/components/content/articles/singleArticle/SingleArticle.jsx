import './SingleArticle.scss';

import AddEditArticlesBtn from '../../../../containers/articles/singleArticle/AddEditArticlesBtn';
import NotFound from '../../404/NotFound';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { articleDataType } from '../articlesType/articlesType';

// import Button from '../../../header/components/button/Button';




function SingleArticle(data) {
  
  const articleData = data?.articlesData;
  const {id, title, text, userId, access, dataCreate, dataEdit} = articleData;

  return (
    <div className="article">
      { 
        articleData ?
        <>
          <h1>Single Article page: {title}</h1>
          <div className="article__block">
            <h2>{id}. {title} </h2> 
            <p>{text}</p>
            <p>Create by user id: {userId}</p>
            <br/>
            <p>Available to: {access}</p>
            <p>Create date: {dataCreate}</p>
            <p>Edit date: {dataEdit}</p>
            <AddEditArticlesBtn isCreate={false} id={id} />
          </div> 
        </> 
        : <Redirect to='/404' component={NotFound}/> 
      }
    </div>
  );
}

SingleArticle.propType = {
  SingleArticle:  PropTypes.arrayOf(articleDataType).isRequired
}

export default SingleArticle;