import './UserProfile.scss';

import LoginForm from './coponents/form/LoginForm';
import PropTypes from 'prop-types';
import { userDataType } from './userProfileType/UserProfileType';

function UserProfile({setUserHook, userData}) {

  console.log(userData);

  return (
    <div className="user-profile">
      <h1>User profile page</h1>
      <LoginForm setUserHook={setUserHook}/>
    </div>
  );
}

UserProfile.propType = {
  setUserHook: PropTypes.func.isRequired,
  userData: userDataType
}

export default UserProfile;