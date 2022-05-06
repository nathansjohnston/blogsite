import './App.css';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { MyPosts, AllPosts } from './PostComponents';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route path='/profile' element={<MyPosts />} />
            <Route path='/' element={<AllPosts />} />
          </Routes>
        </Router>
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}

export { UserContext };
export default App;