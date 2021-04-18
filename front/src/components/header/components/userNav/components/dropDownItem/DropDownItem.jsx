import './DropDownItem.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userType } from '../../../../../content/userProfile/userType/userType';

function DropDownItem({user, handleLogout}) {
    return (
        <div className="header__user__drop">
         {user ? <Link to='/profile'>Profile</Link> : <Link to='/login'>Login</Link>}
         {user && <Link to='/' onClick={handleLogout}>Logout</Link>}
        </div>
    );
}


// DropDownItem.propTypes = {
//     user: PropTypes.arrayOf(userType),
// }

export default DropDownItem;

