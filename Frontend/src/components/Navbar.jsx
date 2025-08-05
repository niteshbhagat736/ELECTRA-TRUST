import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, LogIn, LogOut } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const BladeNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated && user?.email === ADMIN_EMAIL) {
      toast.success("Welcome, Admin!", { position: "top-center" });
    }
  }, [isAuthenticated, user]);

  const handleLogin = async () => {
    await loginWithRedirect();
    toast.success("Logged in successfully", { position: "top-center" });
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    toast.info("Logged out", { position: "top-center" });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Vote", path: "/vote" },
  ];

  const isAdmin = isAuthenticated && user?.email === ADMIN_EMAIL;

  const getActiveLink = () => {
    return navLinks.find((link) => location.pathname === link.path)?.name || "";
  };

  const bladeClass = isDarkMode
    ? "bg-black/30 text-white"
    : "bg-white/10 text-black";

  const getBladeTabClass = (active) =>
    `${isDarkMode ? "blade-tab-dark" : "blade-tab"}${active ? " active" : ""}`;

  const getMobileBladeTabClass = (active) =>
    `${isDarkMode ? "mobile-blade-tab-dark" : "mobile-blade-tab"}${active ? " active" : ""}`;

  return (
    <div className="font-sans">
      <nav
        className={`backdrop-blur-xl ${bladeClass} fixed top-0 left-0 right-0 z-40 px-6 py-3 h-16 flex items-center justify-between transition-colors duration-500`}
      >
        <button onClick={handleHomeClick} className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-12 h-12  rounded-lg flex items-center justify-center transform rotate-45">
              <span className="transform -rotate-45">
                <img src="/logo.png" alt="Logo" />
              </span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent tracking-wider">
            ElectraTrust
          </div>
        </button>

        <div className="hidden md:flex items-center h-12">
          {navLinks.map((link) => {
            const isActive = getActiveLink() === link.name;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`${getBladeTabClass(isActive)} h-full px-5 flex items-center justify-center relative rounded-md transition-colors duration-300 mx-[1px]`}
              >
                <span className="blade-label font-medium text-sm uppercase tracking-wider">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 rounded-md border flex items-center justify-center transition-colors duration-300 ${isDarkMode ? "bg-[#1F1F1F] border-[#2A2A2A] text-white" : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`${getBladeTabClass(false)} hidden sm:flex px-4 py-2 rounded-md border text-sm font-medium`}
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hidden md:flex px-4 py-2 rounded-md border text-sm font-medium"
              >
                <LogOut size={16} className="mr-2" /> Logout
              </button>
              <div className="hidden md:flex items-center gap-2">
              <img
  src={user?.picture || '/rounduser.jpg'}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/rounduser.jpg';
  }}
  alt="profile"
  className="w-8 h-8 rounded-full"
/>

              </div>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="hidden md:flex px-4 py-2 rounded-md border text-sm font-medium"
            >
              <LogIn size={16} className="mr-2" /> Login
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${isDarkMode ? "text-white" : "text-gray-700"} md:hidden`}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className={`md:hidden fixed top-24 left-0 right-0 z-50 p-4 transition-colors ${isDarkMode ? "bg-[#1F1F1F] text-white" : "bg-white text-gray-700"}`}>
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = getActiveLink() === link.name;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`${getMobileBladeTabClass(isActive)} py-3 px-4 rounded-md`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="blade-label font-medium text-sm uppercase tracking-wider">
                    {link.name}
                  </span>
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                to="/admin"
                className={`${getMobileBladeTabClass(false)} py-3 px-4 rounded-md`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}

            <button
              onClick={toggleTheme}
              className={`w-full flex justify-between items-center py-3 px-4 rounded-md mt-2 ${isDarkMode ? "bg-[#2A2A2A] hover:bg-[#3A3A3A]" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              <span>Theme</span>
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="mt-2 flex items-center justify-center px-4 py-2 rounded-md border text-sm font-medium"
              >
                <LogOut size={16} className="mr-2" /> Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="mt-2 flex items-center justify-center px-4 py-2 rounded-md border text-sm font-medium"
              >
                <LogIn size={16} className="mr-2" /> Login
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BladeNavbar;