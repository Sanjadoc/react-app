import './Articles.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Articles({articlesData}) {

  // console.log(articlesData);

  return (
    <div className="articles">
      <h1>Articles list page</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed tempor sapien. Suspendisse tellus lorem, tempus ac orci in</p>
      <div className="articles__list">
        { articlesData.map((item, i) => (
          <Link key={i} to={`/articles/${item.id}`}  className="articles__list__item"> 
  
              <h2>{item.title}</h2> 
              <p>{item.desription}</p>

          </Link>
        )) }
      </div>
    </div>
  );
}

Articles.propType = {
  articlesData: PropTypes.func.isRequired
}

export default Articles;