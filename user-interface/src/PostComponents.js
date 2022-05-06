import './PostComponents.css';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
            <Link to={`/post/${post.id}`} onClick={() => {
              userContext.setPost(post.id);
            }}>Full Post</Link>
          </div>
        );
      })}
    </div>
  );
};

function AllPosts () {
  const [posts, setPosts] = useState([]);
  const userContext = useContext(UserContext);

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
            <Link to={`/post/${post.id}`} onClick={() => {
              userContext.setPost(post.id);
            }}>Full Post</Link>
          </div>
        );
      })}
    </div>
  );
};

function Post () {
  const navigateTo = useNavigate();
  const postContext = useContext(UserContext);
  const [currentPost, setCurrentPost] = useState({});

  const deletePost = async () => {
    await fetch(API_ADDRESS + `/posts/${currentPost.id}`, {
      method: 'DELETE'
    }).then(reply => {
      if (reply.status === 200) {
        console.log('Post deleted.');
      };
    });
    navigateTo('/profile');
  }

  useEffect(() => {
    fetch(API_ADDRESS + `/posts/${postContext.post}`)
    .then(reply => reply.json())
    .then(data => setCurrentPost(data));
  }, [postContext.post])

  if (currentPost.title) {
    return (
      <div className='PostContainer'>
        <div key={currentPost.id} className='PostIndividual'>
          <header className='PostTitle'>
            <h5>{currentPost.title}</h5>
            <h6>Posted on: {currentPost.creation_date.slice(0, currentPost.creation_date.indexOf('T'))}</h6>
          </header>
          <p>{currentPost.content}</p>
          <button onClick={deletePost} >Delete Post</button>
        </div>
      </div>
    );
  } else {
    return (
      <p>Loading...</p>
    );
  }
}

export { MyPosts, AllPosts, Post };