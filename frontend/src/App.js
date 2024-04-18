import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar.js";
import Signup from './Components/Signup.js';
import SignIn from './Components/Signin.js';
import Todo from './Components/Todo.js';
import SignUp from './Components/Signup.js';

function App() {
  return (
    // <div className="App">
       <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/to-do-list" element={<Todo />} />
        </Routes>
      </Router>
  
    
    // </div>
  );
}

export default App;
