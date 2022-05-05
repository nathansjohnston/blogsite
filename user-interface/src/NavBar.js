import './NavBar.css';
import { useContext } from 'react';
import { UserContext } from './App';
import { Login, Logout } from './Utilities';

function NavBar () {
  const userContext = useContext(UserContext);
  if (userContext.user.username) {
    return (
      <div className='NavBar'>
        <h3>{`Welcome, ${userContext.user.first_name} ${userContext.user.last_name}!`}</h3>
        <div className='NavLinks'>
          <Logout />
        </div>
      </div>
    );
  } else {
    return (
      <div className='NavBar'>
        <div className='NavLinks'>
          <Login />
        </div>
      </div>
    );
  }
}

export default NavBar;