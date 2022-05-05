import './App.css';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { MyPosts } from './PostComponents';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <NavBar />
        <Router>
          <Routes>
            <Route path='/' element={<MyPosts />}/>
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export { UserContext };
export default App;