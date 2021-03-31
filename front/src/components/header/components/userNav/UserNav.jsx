import './UserNav.scss';

import DropDownItem from './components/dropDownItem/DropDownItem';
import PropTypes from 'prop-types';
import userPlaceholder from './user-placeholder.svg';

function UserNav({name}) {
    
    const userId = '45';
    const { REACT_APP_SERVER_API_URL } = process.env;
    const imgSrc = `${REACT_APP_SERVER_API_URL}/user/${userId}/avatar/`
    
    return (
        <div className="header__user">
            <div className="header__user__name">
                {name}
            </div>
            <div className="header__user__avatar">
                <img
                    src={userId ? imgSrc : userPlaceholder}
                    alt="avatar"
                />
            </div>
            <DropDownItem ifUser={name}/>
        </div>
    );
}

UserNav.propType = {
    name: PropTypes.string
}

UserNav.defaultProps = {
    name: 'Log in'
}

export default UserNav;
