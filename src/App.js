import { Routes, Route } from 'react-router-dom';
import { Register } from "./pages/register" 
import './App.css';

function App() {
  return (
    <>
       <Routes>
          <Route path="/register" element={<Register />} />
       </Routes>
    </>
  );
}

export default App;
