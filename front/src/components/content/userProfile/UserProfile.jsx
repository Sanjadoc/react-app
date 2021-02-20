import './UserProfile.scss';

import LoginForm from './coponents/form/LoginForm';
import PropTypes from 'prop-types';

function UserProfile({setUserHook}) {

  return (
    <div className="user-profile">
      <h1>User profile page</h1>
      <LoginForm setUserHook={setUserHook}/>
    </div>
  );
}

UserProfile.propType = {
  setUserHook: PropTypes.func.isRequired
}

export default UserProfile;