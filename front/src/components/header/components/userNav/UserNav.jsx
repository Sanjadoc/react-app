import './UserNav.scss';

import DropDownItem from './components/dropDownItem/DropDownItem';
import PropTypes from 'prop-types';
import userPlaceholder from './user-placeholder.svg';
import { userType } from '../../../content/userProfile/userType/userType';

function UserNav({user, handleLogout}) {
    
    const { REACT_APP_SERVER_API_URL } = process.env;
    const imgSrc = `${REACT_APP_SERVER_API_URL}/user/${user?.id}/avatar/`
    
    return (
        <div className="header__user">
            <div className="header__user__name">
                {user ? (user?.first_name + " " + user.last_name) : " "}
            </div>
            <div className="header__user__avatar">
                <img
                    src={user ? imgSrc : userPlaceholder}
                    alt="avatar"
                />
            </div>
            <DropDownItem user={user} handleLogout={handleLogout} />
        </div>
    );
}

// UserNav.propTypes = {
//     user: PropTypes.arrayOf(userType),
// }

UserNav.defaultProps = {
    name: 'Log in'
}

export default UserNav;
