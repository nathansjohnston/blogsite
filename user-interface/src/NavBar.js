import './NavBar.css';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './App';
import { Login, Logout } from './Utilities';

function NavBar () {
  const userContext = useContext(UserContext);
  const navigateTo = useNavigate();
  if (userContext.user.username) {
    return (
      <div className='NavBar'>
        <h3>{`Welcome, ${userContext.user.first_name} ${userContext.user.last_name}!`}</h3>
        <button className='NavButton' onClick={() => {
          navigateTo('/');
        }}>All Posts</button>
        <button className='NavButton' onClick={() => {
          navigateTo('/profile');
        }}>My Posts</button>
        <div className='NavLinks'>
          <Logout />
        </div>
      </div>
    );
  } else {
    return (
      <div className='NavBar'>
        <button className='NavButton' onClick={() => {
          navigateTo('/');
        }}>All Posts</button>
        <div className='NavLinks'>
          <Login />
        </div>
      </div>
    );
  }
}

export default NavBar;