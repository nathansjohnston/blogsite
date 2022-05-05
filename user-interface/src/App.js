import './App.css';
import { createContext, useState } from 'react';
import NavBar from './NavBar';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <NavBar />
      </div>
    </UserContext.Provider>
  );
}

export { UserContext };
export default App;