import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import ApprovalTable from "./ApprovalTable";
import { toast } from 'react-toastify';
import { useAuth0 } from "@auth0/auth0-react";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

export default function AdminPanel() {
  const { isDarkMode } = useTheme();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [voters, setVoters] = useState([]);


  const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : "http://localhost:3000";


  const fetchVoters = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/votes/all`, {
        headers: {
          'x-user-email': user.email
        },
        withCredentials: true
      });
      setVoters(Array.isArray(res.data) ? res.data : res.data.voters || []);
    } catch (error) {
      console.error("Error fetching voters:", error);
      setVoters([]);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      fetchVoters();
    }
  }, [isAuthenticated, user]);

  const handleApprove = async (id) => {


    try {
      await axios.put(`${API_URL}/api/votes/approve/${id}`, {}, {
        headers: {
          'x-user-email': user.email
        },
        withCredentials: true
      });
      fetchVoters();
      toast.success("Voter approved!");
    } catch (err) {
      console.error("Approval failed:", err);
      toast.error("Failed to approve");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vote?");
    if (!confirmDelete) return;


    try {
      await axios.delete(`${API_URL}/api/votes/${id}`, {
        headers: {
          'x-user-email': user.email
        },
        withCredentials: true
      });
      fetchVoters();
      toast.success("Vote deleted.");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete.");
    }
  };

  if (!isAuthenticated || user?.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return (
      <section className={`min-h-screen flex items-center justify-center transition-colors ${isDarkMode ? "bg-black text-white" : "bg-green-100 text-black"}`}>
        <p className="text-xl font-semibold">Access Denied</p>
      </section>
    );
  }

  return (
    <section className={`min-h-screen pt-20 px-4 py-10 transition-colors ${isDarkMode ? "bg-black text-white" : "bg-green-100 text-black"}`}>
      <h2 className={`text-3xl font-extrabold mb-6 text-center font-[Cinzel] ${isDarkMode ? "text-green-300" : "text-green-700"}`}>
       Admin Panel
      </h2>

      <ApprovalTable
        voters={voters}
        onApprove={handleApprove}
        onDelete={handleDelete}
        isDarkMode={isDarkMode}
      />
    </section>
  );
}
