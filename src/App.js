import './App.css';
import MainHeader from './components/header/MainHeader';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChallengePage from "./pages/challenge/ChallengePage";
import SignUpPageChallengePage from "./pages/challenge/SignUpChallengePage"
import MeddlePage from "./pages/meddling/MeddlingPage";

function App() {
  return (
    <Router>
      <MainHeader />
      <Routes>
        <Route path='/meddling' element={<MeddlePage/>} />
        <Route path="/challenges" element={<ChallengePage />} />
        <Route path="/challenges/signup-challenge" element={<SignUpPageChallengePage />} />
   
      </Routes>
     </Router>
  )
}

export default App;
