import './App.css';
import MainHeader from './components/header/MainHeader';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChallengePage from "./pages/challenge/ChallengePage";
import SignUpPageChallengePage from "./pages/challenge/SignUpChallengePage"
import ChallengeDetailPage from './pages/challenge/ChallengeDetailPage';

function App() {
  return (
    <Router>
      <MainHeader />
      <Routes>
        <Route path="/challenges" element={<ChallengePage />} />
        <Route path="/challenges/signup-challenge" element={ <SignUpPageChallengePage/>} />
   
      </Routes>
     </Router>
  )
}

export default App;
