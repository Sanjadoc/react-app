import "./SocialButton.scss";

import React from 'react'
import SocialLogin from 'react-social-login'

class SocialButton extends React.Component {
    render() {
      return (
        <button className="social-btn" onClick={this.props.triggerLogin} {...this.props}>
          {this.props.children}
        </button>
      );
    }
  }

export default SocialLogin(SocialButton); 