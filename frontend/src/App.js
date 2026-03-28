import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lessons from "./pages/Lessons";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import DashboardPage from './pages/DashboardPage';
import Leaderboard from "./pages/Leaderboard";

// Выносим роуты в отдельный компонент, чтобы использовать useLocation
function AnimatedRoutes() {
  const location = useLocation();

  return (
    // mode="wait" заставляет старую страницу сначала исчезнуть, 
    // и только потом появиться новой
    <AnimatePresence mode="wait">
      {/* Ключ location.pathname — это магия, которая запускает анимацию */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/lesson/:id/quiz" element={<Quiz />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/progress" element={<DashboardPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen animated-bg text-white">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;