import './App.css';
import MainHeader from './components/header/MainHeader';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChallengePage from "./pages/challenge/ChallengePage";
import SignUpPageChallengePage from "./pages/challenge/SignUpChallengePage"
import ProductPage from './pages/product/ProductPage';
import MeddlePage from "./pages/meddling/MeddlingPage";
import ExpenseCalendar from "./pages/expense/ExpenseCalendar";
import "./App.css";
import SignUp from "./pages/login/SignUp";
import Login from "./pages/login/Login";
import Expense from "./pages/expense/Expense";
import ChallengeDetailPage from './pages/challenge/ChallengeDetailPage';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <MainHeader />
      <Routes>
        <Route path="/meddling" element={<MeddlePage />} />
        <Route path="/challenges" element={<ChallengePage />} />
        <Route
          path="/challenges/signup-challenge"
          element={<SignUpPageChallengePage />}
        />
        <Route path="/expenseCalendar" element={<ExpenseCalendar />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/challenge-info" element={ <ChallengeDetailPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
