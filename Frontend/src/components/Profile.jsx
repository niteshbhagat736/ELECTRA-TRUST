import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaUserCircle, FaCheckCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = ({ user }) => {
  const { isDarkMode } = useTheme();
  const { loginWithRedirect } = useAuth0();

  const [imgSrc, setImgSrc] = useState('/rounduser.jpg');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user?.picture) {
      const img = new Image();
      img.src = user.picture;

      img.onload = () => {
        setImgSrc(user.picture);
        setIsLoaded(true);
      };

      img.onerror = () => {
        // Keeps default fallback avatar
        setIsLoaded(true);
      };
    }
  }, [user?.picture]);

  return (
    <div
      className={`rounded-2xl shadow-lg p-6 w-full max-w-sm transition-all duration-300 
      ${isDarkMode ? 'bg-green-900 text-white' : 'bg-green-100 text-gray-900'}`}
    >
      {user ? (
        <div className="flex flex-col items-center text-center">
          <img
            src={imgSrc}
            alt="User Profile"
            className="w-24 h-24 rounded-full shadow-md mb-4 border-4 border-emerald-500 object-cover"
          />
          <h2 className="text-xl font-bold flex items-center gap-2">
            {user?.name || 'Anonymous'}
            <FaCheckCircle className="text-emerald-500" />
          </h2>
          <p className="text-sm">{user?.email}</p>
          <p className="text-xs mt-1 italic">Member since: {user?.since || '2024'}</p>

          <Link to="/vote">
            <button
              className="mt-5 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-medium shadow hover:scale-105"
            >
              Raise Your Vote
            </button>
          </Link>

          <p className={`mt-3 text-sm ${isDarkMode ? "text-green-50" : "text-green-950"}`}>
            Your voice matters. Make it heard!
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <FaUserCircle className="text-emerald-400 text-8xl mb-4 drop-shadow-md" />
          <h3 className="text-lg font-semibold">You're not signed in</h3>
          <button
            onClick={() => loginWithRedirect()}
            className="mt-4 px-5 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all shadow hover:scale-105"
          >
            Create Account Now
          </button>

          <p className={`mt-3 text-sm ${isDarkMode ? "text-green-50" : "text-green-950"}`}>
            Join the movement & raise your first vote today.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
