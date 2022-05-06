import './PostComponents.css';
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      <h2>My Posts</h2>
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
      <h2>All Posts</h2>
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
          { (postContext.user.username && postContext.user.id === currentPost.author_id) ? <button onClick={deletePost} >Delete Post</button> : <></>}
        </div>
      </div>
    );
  } else {
    return (
      <p>Loading...</p>
    );
  }
}

function PostCreator () {
  const context = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleUpdate = event => {
    setTitle(event.target.value);
  };

  const handleContentUpdate = event => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    await fetch(API_ADDRESS + '/posts', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        'author_id': context.user.id,
        'title': title,
        'content': content
      })
    }).then(reply => console.log(reply));
    event.preventDefault();
  }

  return (
    <div className='PostCreator'>
      <form onSubmit={handleSubmit}>
        <label className='PostCreatorLabel'>
          Title:
          <input type='text' value={title} onChange={handleTitleUpdate} className='PostCreatorField'/>
        </label>
        <label className='PostCreatorLabel'>
          Content:
          <textarea type='text' value={content} onChange={handleContentUpdate} className='PostCreatorField'/>
        </label>
        <input type='submit' value='Create Post!' className='PostCreatorSubmit'/>
      </form>
    </div>
  );
}

export { MyPosts, AllPosts, Post, PostCreator };