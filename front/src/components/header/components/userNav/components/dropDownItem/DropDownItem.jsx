import './DropDownItem.scss';

import { Link } from 'react-router-dom';

function DropDownItem() {
    return (
        <div className="header__user__drop">
         <Link to='/profile'>Profile</Link>
         <Link to='/'>Logout</Link>
        </div>
    );
}

export default DropDownItem;

