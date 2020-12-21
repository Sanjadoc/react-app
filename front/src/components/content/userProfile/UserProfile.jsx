import './UserProfile.scss';

import LoginForm from './coponents/form/LoginForm';

function UserProfile({setUserHook}) {
  return (
    <div className="user-profile">
      <h1>User profile page</h1>
      <LoginForm setUserHook={setUserHook}/>
    </div>
  );
}

export default UserProfile;