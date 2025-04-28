import './App.css';
import MainHeader from './components/header/MainHeader';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChallengePage from "./pages/challenge/ChallengePage";
import SignUpPageChallengePage from "./pages/challenge/SignUpChallengePage"
import MeddlePage from "./pages/meddling/MeddlingPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengePage from './pages/challenge/ChallengePage';
import SignUpPageChallengePage from './pages/challenge/SignUpChallengePage';
import ExpenseCalendar from './pages/challenge/ExpenseCalendar';
import './App.css';
import SignUp from './pages/login/SignUp';
import Login from './pages/login/Login';

function App() {
  return (
    <Router>
      <MainHeader />
      <Routes>
        <Route path='/meddling' element={<MeddlePage/>} />
        <Route path="/challenges" element={<ChallengePage />} />
        <Route
          path="/challenges/signup-challenge"
          element={<SignUpPageChallengePage />}
        />
        <Route path="/expenseCalendar" element={<ExpenseCalendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
