import './App.css';
import { Login, Logout } from './Utilities'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
        <Logout />
        <p>
          Placeholder content.
        </p>
      </header>
    </div>
  );
}

export default App;