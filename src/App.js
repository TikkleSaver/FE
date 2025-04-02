import './App.css';
import MainHeader from './components/header/MainHeader';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChallengePage from "./pages/challenge/ChallengePage";

function App() {
  return (
    <Router>
      <MainHeader />
      <Routes>
        <Route path="/challenges" element={<ChallengePage />} />
      </Routes>
     </Router>
  )
}

export default App;
