// src/components/VotePosts.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiChevronLeft, FiChevronRight, FiShare2, FiMaximize2 } from "react-icons/fi";

const VotePosts = ({ votes, user, isDarkMode, onVoteToggle }) => {
  const [expandedReasonId, setExpandedReasonId] = useState(null);
  const [imageIndexes, setImageIndexes] = useState({});
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const toggleReason = (id) => {
    setExpandedReasonId(expandedReasonId === id ? null : id);
  };

  const handleImageNav = (id, direction, total) => {
    setImageIndexes((prev) => {
      const current = prev[id] || 0;
      let next = direction === "next" ? current + 1 : current - 1;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      return { ...prev, [id]: next };
    });
  };

  const handleShare = (vote) => {
    const shareUrl = `${window.location.origin}/vote/${vote._id}`;
    if (navigator.share) {
      navigator
        .share({
          title: vote.title,
          text: vote.description,
          url: shareUrl,
        })
        .catch(() => toast.error("Share failed"));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {votes.map((vote) => {
        const currentIndex = imageIndexes[vote._id] || 0;
        const images = vote.images || [];
        const isVoted = vote.voters?.includes(user?.email);

        return (
          <div
            key={vote._id}
            className={`rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.01] ${
              isDarkMode ? "bg-slate-800 text-white" : "bg-white text-black"
            }`}
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">👤 {vote.name}</h3>

              <div className="mb-3 text-sm">
                {vote.reason?.length > 200 ? (
                  <>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          expandedReasonId === vote._id
                            ? vote.reason
                            : vote.reason.slice(0, 200) + "...",
                      }}
                    />
                    <button
                      onClick={() => toggleReason(vote._id)}
                       className="text-green-500 w-fit bg-green-50 px-4 py-1 m-1 rounded-md ml-1 cursor-pointer"
                    >
                      {expandedReasonId === vote._id ? "less" : "more"}
                    </button>
                  </>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: vote.reason || "" }} />
                )}
              </div>

              {images.length > 0 && (
                <div className="mb-4 relative rounded overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src={images[currentIndex]}
                      alt="blur"
                      className="w-full h-full object-cover filter blur-md scale-110"
                    />
                  </div>
                  <div
                    className="relative z-10 w-full flex justify-center items-center backdrop-blur-sm"
                    style={{ height: '240px' }}
                  >
                    <img
                      src={images[currentIndex]}
                      alt="Vote visual"
                      className="object-contain max-h-[220px] rounded-md"
                    />
                    <button
                      className="absolute top-2 right-2 text-white bg-black/40 p-1 rounded"
                      onClick={() => setFullscreenImage(images[currentIndex])}
                    >
                      <FiMaximize2 />
                    </button>
                    {images.length > 1 && (
                      <div className="absolute bottom-2 right-2 flex items-center text-white text-xs gap-2 bg-black/40 px-2 py-1 rounded">
                        <FiChevronLeft
                          onClick={() => handleImageNav(vote._id, "prev", images.length)}
                          className="cursor-pointer"
                        />
                        <span>{currentIndex + 1} / {images.length}</span>
                        <FiChevronRight
                          onClick={() => handleImageNav(vote._id, "next", images.length)}
                          className="cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-400">
                Vote Duration : {vote.start_date && new Date(vote.start_date).toLocaleDateString()} —  {vote.end_date && new Date(vote.end_date).toLocaleDateString()}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-400">Total Votes: {vote.totalVotes || 0}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleShare(vote)}
                    className="flex items-center gap-1 px-3 py-1 border rounded-md text-sm hover:bg-gray-200 dark:hover:bg-slate-600"
                  >
                    <FiShare2 /> Share
                  </button>
                  <button
                    onClick={() => {
                      if (!user) {
                        toast.info("Please login to contribute");
                        return;
                      }
                      onVoteToggle(vote._id);
                    }}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      isVoted
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white"
                    }`}
                  >
                    {isVoted ? "Withdraw" : "Vote"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setFullscreenImage(null)}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default VotePosts;
