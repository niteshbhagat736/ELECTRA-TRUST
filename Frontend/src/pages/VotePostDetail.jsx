// src/pages/VotePostDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import { useAuth0 } from "@auth0/auth0-react";
import { FiChevronLeft, FiChevronRight, FiShare2, FiMaximize2 } from 'react-icons/fi';
import { CircleUser } from 'lucide-react';

const VotePostDetail = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const { user } = useAuth0();
  const [vote, setVote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const [fullView, setFullView] = useState(false);
  const [showFullReason, setShowFullReason] = useState(false);

  const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : "http://localhost:3000";


  useEffect(() => {
    const fetchVote = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/votes/${id}`);
        setVote(res.data);
      } catch (err) {
        toast.error("Failed to fetch vote detail");
      } finally {
        setLoading(false);
      }
    };

    fetchVote();
  }, [id]);

  const handleImageNav = (direction) => {
    if (!vote?.images?.length) return;
    let next = imgIndex + (direction === 'next' ? 1 : -1);
    if (next < 0) next = vote.images.length - 1;
    if (next >= vote.images.length) next = 0;
    setImgIndex(next);
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({ title: vote.title, text: vote.description, url: shareUrl })
        .catch(() => toast.error("Share failed"));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    }
  };

  if (loading) return <div className="text-center pt-20">Loading...</div>;
  if (!vote) return <div className="text-center pt-20 text-red-500">Vote not found</div>;

  const isVoted = vote.voters?.includes(user?.email);

  return (
    <div className={`pt-20 min-h-screen px-4 md:px-10 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg relative">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <CircleUser className="w-8 h-8" />
          {vote.name || "Unknown"}
        </h1>

        <div className="mb-4">
          <p className="text-sm">
            {vote.reason.length > 400 && !showFullReason ? (
              <>
                {vote.reason.slice(0, 400)}...
                <button onClick={() => setShowFullReason(true)} className="text-green-500 w-fit bg-green-50 px-4 py-1 m-1 rounded-md ml-1 cursor-pointer">more</button>
              </>
            ) : (
              <>
                {vote.reason}
                {vote.reason.length > 400 && (
                  <button onClick={() => setShowFullReason(false)} className="text-blue-500 ml-1 underline">less</button>
                )}
              </>
            )}
          </p>
        </div>

        {vote.images?.length > 0 && (
          <div className="mb-4 relative rounded overflow-hidden">
            <div className="relative bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${vote.images[imgIndex]})`, filter: 'blur(8px)', height: '16rem' }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={vote.images[imgIndex]}
                alt="vote visual"
                className="max-h-64 max-w-full object-contain rounded shadow-lg z-10"
              />
              <button
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
                onClick={() => setFullView(true)}
              >
                <FiMaximize2 color="black" size={18} />
              </button>
              {vote.images.length > 1 && (
                <div className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded">
                  {imgIndex + 1} / {vote.images.length}
                </div>
              )}
              {vote.images.length > 1 && (
                <div className="absolute w-full flex justify-between px-2">
                  <button onClick={() => handleImageNav('prev')} className="bg-black/50 text-white p-1 rounded-full"><FiChevronLeft /></button>
                  <button onClick={() => handleImageNav('next')} className="bg-black/50 text-white p-1 rounded-full"><FiChevronRight /></button>
                </div>
              )}
            </div>
          </div>
        )}

        <p className="text-sm text-gray-400 mb-2">
          🗓️ {new Date(vote.start_date).toLocaleDateString()} — {new Date(vote.end_date).toLocaleDateString()}
        </p>

        <p className="text-sm mb-4">Total Votes: {vote.totalVotes}</p>

        <div className="flex justify-between items-center">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            <FiShare2 /> Share
          </button>
          <button
            onClick={() => toast.info("Voting from detail page not implemented.")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isVoted ? "bg-red-600 hover:bg-red-700 text-white" : "bg-emerald-500 hover:bg-emerald-600 text-white"
            }`}
          >
            {isVoted ? "Withdraw" : "Vote"}
          </button>
        </div>
      </div>

      {fullView && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center" onClick={() => setFullView(false)}>
          <img src={vote.images[imgIndex]} alt="fullscreen" className="max-h-[90vh] max-w-[90vw] object-contain rounded" />
        </div>
      )}
    </div>
  );
};

export default VotePostDetail;
