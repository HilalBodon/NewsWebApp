import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import HomePage from './Views/HomePage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/home" element={<HomePage/>} />

        </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;


