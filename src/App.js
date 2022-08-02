import './App.css';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import { UserContextProvider, useUserContext } from './contexts/userContext';
import { CartContextProvider, useCartContext } from './contexts/cartContext';
import { Button } from 'reactstrap';

function App() {
  const { user, setUser } = useUserContext();
  
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      setUser(firebaseUser);
    }
  });

  const handleLogout = () => {
    signOut(auth);
    window.location.pathname = "/login";
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">View Cart</Link>
        {user?
          <>
            <div className="logout"><Button color="warning" outline onClick={handleLogout}>Log Out</Button></div>
          </> : <>
            <Link to="/login">Login</Link>
          </>}
      </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
