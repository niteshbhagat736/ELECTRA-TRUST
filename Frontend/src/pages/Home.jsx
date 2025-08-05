// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';
import Profile from '../components/Profile';
import { useAuth0 } from "@auth0/auth0-react";
import VotePosts from '../components/VotePosts';

const Home = () => {
  const { isDarkMode } = useTheme();
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();

  const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : "http://localhost:3000";


  const fetchVotes = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/votes`, {
        withCredentials: true
      });
      setVotes(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load approved votes");
    } finally {
      setLoading(false);
    }
  };

  const handleVoteToggle = async (voteId) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/votes/${voteId}/toggle`,
        {},
        {
          withCredentials: true,
          headers: {
            'x-user-email': user?.email,
          },
        }
      );

      setVotes((prevVotes) =>
        prevVotes.map((v) =>
          v._id === voteId
            ? { ...v, voters: res.data.voters, totalVotes: res.data.totalVotes }
            : v
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update vote status");
    }
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <div
      className={`pt-20 pb-12 px-4 md:px-10 transition-all duration-300 ${
        isDarkMode ? 'bg-green-950 text-white' : 'bg-green-100/90 text-gray-900'
      }`}
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Approved Voting Events</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Section */}
        <div className="lg:w-1/4 lg:sticky lg:top-24 h-fit">
          <Profile user={user} />
        </div>

        {/* VotePosts Section */}
        <div className="lg:w-3/4 w-full max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : votes.length === 0 ? (
            <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              No approved vote forms yet.
            </div>
          ) : (
            <VotePosts
              votes={votes}
              user={user}
              isDarkMode={isDarkMode}
              onVoteToggle={handleVoteToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
