import './Articles.scss';

import Button from "../../header/components/button/Button";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { articlesDataType } from './articlesType/articlesType';

function Articles({articlesData, isFetching , submitLimit}) {
  return (
    <div className="articles">
      <h1>Articles list page</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed tempor sapien. Suspendisse tellus lorem, tempus ac orci in</p>
      <div className="articles__list">
        { isFetching && <p>Wait, article is loading...</p> }
        { !isFetching && articlesData.map((item, i) => (
          <Link key={i} to={`/articles/${item.id}`}  className="articles__list__item"> 
            <h2>{item.id}. {item.title} </h2> 
            <p>Small descriptions: {item.text}</p>
            <p>Create by user id: {item.userId}</p>
            <br/>
            <p>Available to: {item.access}</p>
            <p>Create date: {item.dataCreate}</p>
            <p>Edit date: {item.dataEdit}</p>
          </Link>
        )) }
      </div>
      <Button title={'Show more'} onClick={submitLimit} />
    </div>
  );
}

Articles.propType = {
  articlesData:  PropTypes.arrayOf(articlesDataType),
  isFetching: PropTypes.bool,
  submitLimit: PropTypes.func.isRequired
}

Articles.defaultProps = {
  articlesData: [],
  isFetching: false
} 

export default Articles;