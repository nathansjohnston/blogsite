import './PostComponents.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './App';

const API_ADDRESS = 'http://localhost:3001';

function postContentHandler (postContent) {
  if (postContent.length > 100) {
    return postContent.slice(0, 100) + '...';
  } else {
    return postContent;
  }
}

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
            <header className='PostTitle'>
              <h5>{post.title}</h5>
              <h6>Posted on: {post.creation_date.slice(0, post.creation_date.indexOf('T'))}</h6>
            </header>
            <p>{postContentHandler(post.content)}</p>
          </div>
        );
      })}
    </div>
  );
};

function AllPosts () {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(API_ADDRESS + `/posts`)
        .then(reply => reply.json())
        .then(data => setPosts(data));
  }, [])

  return (
    <div className='PostContainer'>
      {posts.map(post => {
        return (
          <div key={post.id} className='PostIndividual'>
            <header className='PostTitle'>
              <h5>{post.title}</h5>
              <h6>Posted on: {post.creation_date.slice(0, post.creation_date.indexOf('T'))}</h6>
            </header>
            <p>{postContentHandler(post.content)}</p>
          </div>
        );
      })}
    </div>
  );
};

export { MyPosts, AllPosts };