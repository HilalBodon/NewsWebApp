import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import HomePage from './Views/HomePage/HomePage';
// import Login from './Components/Login/Login';
import FullScreenPost from './Components/PostCard/FullScreenPost'; // Adjust the path

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<HomePage/>} />
          <Route path="/posts/:postId" element={<FullScreenPost />} />
        </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;


// const handleLogin = (token) => {
//   console.log('Logged in with token:', token);
// };

{/* <Route path="/Login" element={<Login/>}/> */}
{/* // onLogin={handleLogin} */}