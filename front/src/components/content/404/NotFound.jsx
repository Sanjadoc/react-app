import './NotFound.scss';

import { Link } from 'react-router-dom';
import notFound from './assets/404.svg';

function NotFound() {
  return (
    <div className="not-found">
    <h1> Page is not found.</h1>
    <Link to="/"> Go to home) </Link>
    <img src={notFound} alt="404" />
    </div>
  );
}

export default NotFound;