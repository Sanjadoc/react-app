import LoginPage from "../../components/content/loginPage/LoginPage";
import useAuth from "../../hooks/useAuth";

function LoginPageContainer() {
  const { login } = useAuth();
  return <LoginPage login={login}/>;
}

export default LoginPageContainer;
