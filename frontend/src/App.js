import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import HomePage from './Views/HomePage/HomePage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;


