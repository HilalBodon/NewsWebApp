import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import HomePage from './Views/HomePage/HomePage';
import Login from './Components/Login/Login';

function App() {

  // const handleLogin = (token) => {
  //   console.log('Logged in with token:', token);
  // };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<HomePage/>} />
          <Route path="/Login" element={<Login/>}/>
          {/* // onLogin={handleLogin} */}
        </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;


