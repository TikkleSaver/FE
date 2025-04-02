import './App.css';
import MainHeader from './components/header/Mainheader';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <MainHeader />
    <MainHeader/>
     <h1>Hello React</h1>
     </Router>
  )
}

export default App;
