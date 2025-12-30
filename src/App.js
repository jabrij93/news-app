import { Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" {...props} element={<Login />} /> 
        <Route path="/home" {...props} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
