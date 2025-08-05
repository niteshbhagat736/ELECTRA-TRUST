import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import AdminPanel from './admin/AdminPanel';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import VoterForm from './pages/VoterForm';
import VotePostDetail from './pages/VotePostDetail';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
import ProtectedAdminRoute from './middleware/ProtectedAdminRoute';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
        
        {/* ✅ Top Navigation Bar */}
        <Navbar />

        {/* ✅ Routes */}
        <main className="flex-grow">
          <Routes>
            {/* <Route path="/" element={<Navigate to="/home" />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/vote" element={<VoterForm />} />
          <Route path="/vote/:id" element={<VotePostDetail />} />
          <Route path="/admin" element={
  <ProtectedAdminRoute>
    <AdminPanel />
  </ProtectedAdminRoute>
} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>

        {/* ✅ Footer */}
        <Footer />

        {/* ✅ Toasts */}
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}

export default App;
