import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Board from './Board';
import Signup from './Signup';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  );
}

export default App;
