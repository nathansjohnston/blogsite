// GAPI programming/rationale derived from https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const GAPI_CLIENT_ID = "313590509283-1poq1lkeqt0aj7ctg4ibje7tiislbdn0.apps.googleusercontent.com";

function Login() {
  const onSuccess = (response) => {
    console.log('Login Successful', response.profileObj);
    console.log('User\'s Token:', response.tokenObj);
    initializeTokenRefresh(response);
  };

  const onFailure = (response) => {
    console.log('Login Failed', response);
  };

  return (
    <GoogleLogin
      clientId={GAPI_CLIENT_ID}
      buttonText='Login with Google!'
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
};

function Logout() {
  const onSuccess = () => {
    console.log('You have been logged out.');
  };

  return (
    <GoogleLogout
      clientId={GAPI_CLIENT_ID}
      buttonText='Logout'
      onLogoutSuccess={onSuccess}
    />
  );
};

function initializeTokenRefresh(response) {
  let refreshInterval = (response.tokenObj.expires_in || 3300) * 1000;

  const refreshToken = async () => {
    const authorizationResponse = await response.reloadAuthResponse();
    refreshInterval = (authorizationResponse.tokenObj.expires_in || 3300) * 1000;
    console.log(authorizationResponse.id_token);
    setTimeout(refreshToken, refreshInterval);
  };

  setTimeout(refreshToken, refreshInterval);
}

export { Login, Logout };