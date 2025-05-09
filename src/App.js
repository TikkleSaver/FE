import './App.css';
import MainHeader from './components/header/MainHeader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengePage from './pages/challenge/ChallengePage';
import SignUpPageChallengePage from './pages/challenge/SignUpChallengePage';
import ProductPage from './pages/product/ProductPage';
import MeddlePage from './pages/meddling/MeddlingPage';
import ExpenseCalendar from './pages/expense/ExpenseCalendar';
import './App.css';
import SignUp from './pages/login/SignUp';
import Login from './pages/login/Login';
import Expense from './pages/expense/Expense';
import ChallengeDetailPage from './pages/challenge/ChallengeDetailPage';
import MyWishPage from './pages/wish/MyWishPage';
import FriendWishPage from './pages/wish/FriendWishPage';
import GlobalStyle from './styles/GlobalStyle';
import Category from './pages/onboarding/Category';
import Goal from './pages/onboarding/Goal';

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
        <Route path="/my-wish" element={<MyWishPage />} />
        <Route path="/friend-wish" element={<FriendWishPage />} />
        <Route path="/challenge-info" element={ <ChallengeDetailPage/>} />
        <Route path="/onboarding/category" element={<Category />} />
        <Route path="/onboarding/goal" element={<Goal />} />

      </Routes>
    </Router>
  );
}

export default App;
