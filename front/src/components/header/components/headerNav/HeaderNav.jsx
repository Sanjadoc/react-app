import './HeaderNav.scss';

import DropDownItem from './components/dropDownItem/DropDownItem';
import userPlaceholder from './user-placeholder.svg';

function HeaderNav() {
    return (
        <div className="header__nav">
            <div className="header__nav__user">
                Your name
            </div>
            <img
                className="header__nav__avatar"
                src={userPlaceholder}
                alt="avatar"
            />
            <DropDownItem />
        </div>
    );
}

export default HeaderNav;
