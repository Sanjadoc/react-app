import './SingleArticle.scss';

import NotFound from '../../404/NotFound';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function SingleArticle({ articlesData, props }) {

  const result = articlesData.find(item => JSON.stringify(item.id) === props.match.params.id);

  return (
    <div className="article">
      { 
        result ?
        <div className="article-block">
          <h1>Single Atricle page: {result.title}</h1>
          <p>{result.desription}</p>
        </div> : 
        <Redirect to='/404' component={NotFound}/> 
      }
    </div>
  );
}

SingleArticle.propType = {
  articlesData: PropTypes.func.isRequired,
  props: PropTypes.func.isRequired
}

export default SingleArticle;