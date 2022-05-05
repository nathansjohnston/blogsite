// GAPI programming/rationale derived from https://dev.to/sivaneshs/add-google-login-to-your-react-apps-in-10-mins-4del
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useContext } from 'react';
import { UserContext } from './App';

const GAPI_CLIENT_ID = "313590509283-1poq1lkeqt0aj7ctg4ibje7tiislbdn0.apps.googleusercontent.com";
const API_ADDRESS = 'http://localhost:3001'

function Login() {
  const userContext = useContext(UserContext);

  const initializeTokenRefresh = (response) => {
    let refreshInterval = (response.tokenObj.expires_in || 3300) * 1000;

    const refreshToken = async () => {
      const authorizationResponse = await response.reloadAuthResponse();
      refreshInterval = (authorizationResponse.tokenObj.expires_in || 3300) * 1000;
      userContext.setUser(Object.assign(userContext.user, {secret: authorizationResponse.id_token}));
      await fetch(API_ADDRESS + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userContext.username,
          secret: authorizationResponse.id_token
        })
      }).then(reply => {
        if (reply.status === 201) {
          console.log('User database record updated.');
        }
      });
      setTimeout(refreshToken, refreshInterval);
    };

    setTimeout(refreshToken, refreshInterval);
  }

  const onSuccess = async (response) => {
    console.log(`User ${response.profileObj.email} logged on.`);
    initializeTokenRefresh(response);
    await fetch(API_ADDRESS + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        username: response.profileObj.email,
        secret: response.tokenObj.id_token
      })
    }).then(reply => {
      if (reply.status === 201) {
        console.log('User database record updated.');
      }
    });
    await fetch(API_ADDRESS + `/users/?username=${response.profileObj.email}&token=${response.tokenObj.id_token}`)
    .then(response => response.json())
    .then(data => {
      userContext.setUser(data);
    })
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
  const userContext = useContext(UserContext);

  const onSuccess = () => {
    userContext.setUser({});
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

export { Login, Logout };