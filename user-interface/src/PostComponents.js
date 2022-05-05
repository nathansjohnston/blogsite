import './PostComponents.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './App';

const API_ADDRESS = 'http://localhost:3001';

function MyPosts () {
  const userContext = useContext(UserContext);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    if (userContext.user.username) {
      fetch(API_ADDRESS + `/users/${userContext.user.id}/posts`)
        .then(reply => reply.json())
        .then(data => setMyPosts(data));
    } else {
      setMyPosts([]);
    }
  }, [userContext.user])

  return (
    <div className='PostContainer'>
      {myPosts.map(post => {
        return (
          <div key={post.id} className='PostIndividual'>
            <h5>{post.title}</h5>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export { MyPosts };