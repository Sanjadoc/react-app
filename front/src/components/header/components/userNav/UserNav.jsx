import './UserNav.scss';

import DropDownItem from './components/dropDownItem/DropDownItem';
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

export default UserNav;
