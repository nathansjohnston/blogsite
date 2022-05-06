import './App.css';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { MyPosts, AllPosts, Post } from './PostComponents';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [post, setPost] = useState(0);

  return (
    <UserContext.Provider value={{user, setUser, post, setPost}}>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path='/profile' element={<MyPosts />} />
            <Route path='/' element={<AllPosts />} />
            <Route path='/post/:id' element={<Post />} />
          </Routes>
        </Router>
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export { UserContext };
export default App;