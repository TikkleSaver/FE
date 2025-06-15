import './App.css';
import MainHeader from './components/header/MainHeader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengePage from './pages/challenge/ChallengePage';
import SignUpPageChallengePage from './pages/challenge/SignUpChallengePage';
import ProductPage from './pages/product/ProductPage';
import ProductDetailPage from './pages/product/ProductDetailPage';
import MeddlePage from './pages/meddling/MeddlingPage';
import ExpenseCalendar from './pages/expense/ExpenseCalendar';
import SignUp from './pages/login/SignUp';
import Login from './pages/login/Login';
import Expense from './pages/expense/Expense';
import ChallengeDetailPage from './pages/challenge/ChallengeDetailPage';
import CreateChallengePage from './pages/challenge/CreateChallengePage';
import WishInfoPage from './pages/wish/WishInfoPage';
import MyWishPage from './pages/wish/MyWishPage';
import FriendWishPage from './pages/wish/FriendWishPage';
import AddWishExistPage from './pages/wish/AddWishExistPage';
import AddWishNotExistPage from './pages/wish/AddWishNotExistPage';
import UpdateWishExistPage from './pages/wish/UpdateWishExistPage';
import UpdateWishNotExistPage from './pages/wish/UpdateWishNotExistPage';
import GlobalStyle from './styles/GlobalStyle';
import Category from './pages/onboarding/Category';
import Goal from './pages/onboarding/Goal';
import MyProfile from './pages/myprofile/MyProfile';
import SavedChallenge from './pages/myprofile/SavedChallenge';
import SearchFreindPage from './pages/friend/SearchFreindPage';
import FriendProfile from './pages/friend/FriendProfile';
import FriendsPage from './pages/friend/FriendsPage';
import ExpenseAnalysis from './pages/expense/ExpenseAnalysis';
import MainPage from './pages/home/MainPage';
import ChallengeSearchPage from './pages/challenge/ChallengeSearchPage';
import ChallengeListPage from './pages/challenge/ChallengeListPage';
import EditMember from './pages/myprofile/EditMember';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <MainHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/meddling" element={<MeddlePage />} />
        <Route path="/challenges" element={<ChallengePage />} />
        <Route
          path="/challenges/signup-challenge/:challengeId"
          element={<SignUpPageChallengePage />}
        />
        <Route path="/expense-calendar" element={<ExpenseCalendar />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/expense-analysis" element={<ExpenseAnalysis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/challenge-info/:challengeId" element={ <ChallengeDetailPage/>} />
        <Route path="/challenges/create-challenge" element={<CreateChallengePage />} />
        <Route path="/product-info" element={<ProductDetailPage />} />
        <Route path="/wish-info" element={<WishInfoPage />} />
        <Route path="/wish/mine" element={<MyWishPage />} />
        <Route path="/wish/friend" element={<FriendWishPage />} />
        <Route path="/wish/add/exist" element={<AddWishExistPage />} />
        <Route path="/wish/add/not-exist" element={<AddWishNotExistPage />} />
        <Route path="/wish/update/exist" element={<UpdateWishExistPage />} />
        <Route
          path="/wish/update/not-exist"
          element={<UpdateWishNotExistPage />}
        />
        <Route path="/challenge-info" element={<ChallengeDetailPage />} />
        <Route path="/onboarding/category" element={<Category />} />
        <Route path="/onboarding/goal" element={<Goal />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/editprofile" element={<EditMember />} />
        <Route path="/savedChallenge" element={<SavedChallenge />} />
        <Route path="/searchFreind" element={<SearchFreindPage />} />
        <Route path="/friendprofile" element={<FriendProfile />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route
          path="/challenges/search"
          element={<ChallengeSearchPage />}
        />
        <Route
          path="/challenges/challenge-list"
          element={<ChallengeListPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
