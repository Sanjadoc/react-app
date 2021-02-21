import "./UserProfile.scss";

import LoginForm from "./coponents/form/LoginForm";
import PropTypes from "prop-types";
import SocialButton from "./coponents/socialButton/SocialButton";
import axios from "axios";
import { userDataType } from "./userProfileType/UserProfileType";

function UserProfile({ setUserHook, userData }) {
  // console.log("userData for test:", userData);

  const { REACT_APP_GOOGLE_APP_ID, REACT_APP_FACEBOOK_APP_ID } = process.env;

  const postLinkGoogle = "http://localhost:3000/auth/social/google";
  const postLinkFacebook = "http://localhost:3000/auth/social/facebook";

  const handleSocialLogin = (user) => {
    console.log("handleSocialLogin user: ", user);

    if (user._provider === "google") {
      // console.log("userGoogleData", user);
      // console.log("accessGoogleToken: ", user._token.accessToken);
      axios
        .post(postLinkGoogle, user)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (user._provider === "facebook") {
      // console.log("userFacebookData", user);
      // console.log("accessFacebookToken: ", user._token.accessToken);
      axios
        .post(postLinkFacebook, user)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
    // window.location.reload();
  };

  return (
    <div className="user-profile">
      <h1>User profile page</h1>

      <div className="user-profile__sign-in">
        <LoginForm setUserHook={setUserHook} />
      <div className="user-profile__sign-in actions">
        <h3>Social Login</h3>
        <SocialButton
          className="social-btn google"
          provider="google"
          appId={REACT_APP_GOOGLE_APP_ID}
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Sign in with Google
        </SocialButton>
        <br />
        <SocialButton
          className="social-btn facebook"
          provider="facebook"
          appId={REACT_APP_FACEBOOK_APP_ID}
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          Sign in with Facebook
        </SocialButton>
        </div>
      </div>
    </div>
  );
}

UserProfile.propType = {
  setUserHook: PropTypes.func.isRequired,
  userData: userDataType,
};

export default UserProfile;
