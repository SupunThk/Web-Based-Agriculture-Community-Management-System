import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Blogs from './pages/Blogs';
import KnowledgeBase from './pages/KnowledgeBase';
import Marketplace from './pages/Marketplace';
import Events from './pages/Events';
import AskExpert from './pages/AskExpert';
import AdminPanel from './pages/AdminPanel';
import AI from './pages/AI';

const Layout = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/admin'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/events" element={<Events />} />
          <Route path="/ask-an-expert" element={<AskExpert />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/ai" element={<AI />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
