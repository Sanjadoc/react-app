import "./LoginPage.scss";

import * as Yup from "yup";

import { Field, Form, Formik } from "formik";

import Button from "@material-ui/core/Button";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import SocialButton from "./coponents/socialButton/SocialButton";
import axios from "axios";
import useAuth from "../../../containers/users/hooks/useAuth";
import { useCallback } from "react";
import { useMutation } from "react-query";
import useRequireAuth from "../../../containers/users/hooks/useRequireAuth";

function LoginPage() {
  const { REACT_APP_GOOGLE_APP_ID, REACT_APP_FACEBOOK_APP_ID, REACT_APP_SERVER_API_URL } = process.env;

  const postLinkGoogle = `${REACT_APP_SERVER_API_URL}/auth/social/google`;
  const postLinkFacebook = `${REACT_APP_SERVER_API_URL}/auth/social/facebook`;

   // Login
   useRequireAuth(true);
   const { login } = useAuth();
 
   const mutation = useMutation(login);
 
   const postLogin = useCallback(
     async (formData) => {
       try {
         await mutation.mutate(formData);
       } catch (e) {
         console.error(e);
       }
     },
     [mutation]
   );

  //social
  const handleSocialLogin = (user) => {
    console.log("handleSocialLogin user: ", user);

    if (user._provider === "google") {
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
  };

  const LoginShema = Yup.object().shape({
    email: Yup.string()
      .min(5, "Too short!")
      .max(200, "Too long!")
      .required("Required, need add information"),
    password: Yup.string()
      .min(5, "Too short!")
      .max(200, "Too long!")
      .required("Required, need add information"),
  });

  return (
    <div className="login-page">
      <h1>User login page</h1>

      {mutation.data?.message && (
        <div className="Error">
          {mutation.data?.message}
        </div>
      )}

      <div className="login-page__sign-in">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginShema}
          onSubmit={postLogin}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form className="login__form">
              <div>
                <label htmlFor="email" className="login__form__label">
                  Email:
                </label>
                <Field
                  id="email"
                  className="styled"
                  name="email"
                  placeholder="Write email..."
                  autoComplete="off"
                />
                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="login__form__label"
                >
                  Password:
                </label>
                <Field
                  id="password"
                  className="styled"
                  name="password"
                  type="password"
                  placeholder="Write password..."
                  autoComplete="off"
                />
                {errors.password && touched.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </div>
              <Button
                variant="contained"
                color="primary"
                aria-label="Submit"
                type="submit"
                endIcon={<SendIcon />}
              >
                Submit
              </Button>
              <br /> <br />
              <Divider light />
              <Link to="/registration">
                <Button variant="outlined" color="primary" type="submit">
                  Registration
                </Button>
              </Link>
            </Form>
          )}
        </Formik>

        <div className="login-page__sign-in actions">
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

export default LoginPage;
