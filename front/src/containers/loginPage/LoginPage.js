import LoginPage from "../../components/content/loginPage/LoginPage";

function LoginPageContainer({setUserHook}) {
    return (
    <>
      <LoginPage setUserHook={setUserHook} />
    </>
  );  
}

export default LoginPageContainer;
