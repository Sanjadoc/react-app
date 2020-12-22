import './UserNav.scss';

import DropDownItem from './components/dropDownItem/DropDownItem';
import PropTypes from 'prop-types';
import userPlaceholder from './user-placeholder.svg';

function UserNav({name}) {
    return (
        <div className="header__user">
            <div className="header__user__name">
                {name}
            </div>
            <div className="header__user__avatar">
                <img
                    src={userPlaceholder}
                    alt="avatar"
                />
            </div>
            <DropDownItem/>
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
