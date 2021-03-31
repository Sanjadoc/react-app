import './DropDownItem.scss';

import { Link } from 'react-router-dom';

function DropDownItem({ifUser}) {
    return (
        <div className="header__user__drop">
         {ifUser ? <Link to='/profile'>Profile</Link> : <Link to='/login'>Login</Link>}
         <Link to='/'>Logout</Link>
        </div>
    );
}

export default DropDownItem;

