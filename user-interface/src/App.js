import './App.css';
import { createContext, useState } from 'react';
import { Login, Logout } from './Utilities'

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <header className="App-header">
          <Login />
          <Logout />
          <p>
            Placeholder content.
          </p>
        </header>
      </div>
    </UserContext.Provider>
  );
}

export { UserContext };
export default App;