import './Articles.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { articlesDataType } from './articlesType/articlesType';

function Articles({articlesData}) {
  return (
    <div className="articles">
      <h1>Articles list page</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed tempor sapien. Suspendisse tellus lorem, tempus ac orci in</p>
      <div className="articles__list">
        { articlesData.map((item, i) => (
          <Link key={i} to={`/articles/${item.id}`}  className="articles__list__item"> 
              <h2>{item.id}. {item.p_title} </h2> 
              <p>Small descriptions: {item.p_descriptions}</p>
              <p>Create by user id: {item.userId}</p>
          </Link>
        )) }
      </div>
    </div>
  );
}

Articles.propType = {
  articlesData:  PropTypes.arrayOf(articlesDataType)
}

Articles.defaultProps = {
  articlesData: []
} 

export default Articles;