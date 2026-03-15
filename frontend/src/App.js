import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lessons from "./pages/Lessons";
import Lesson from "./pages/Lesson";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import DashboardPage from './pages/DashboardPage';
import { AnimatePresence } from "framer-motion";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />

        <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lesson/:id" element={<Lesson />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/lesson/:id/quiz" element={<Quiz />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/progress" element={<DashboardPage />} />
        </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
