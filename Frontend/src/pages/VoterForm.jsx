import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from "../context/ThemeContext";
import { useAuth0 } from '@auth0/auth0-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloudinaryUploader from "../components/Cloudinary";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  name: '',
  email: '',
  reason: '',
  country: '',
start_date: null,  
  end_date: null,
  images: []
};

export default function VoterForm() {
  const { isDarkMode } = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [useToday, setUseToday] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user]);

useEffect(() => {
  if (useToday) {
    setFormData(prev => ({ ...prev, start_date: new Date() }));
  }
}, [useToday]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL_PROD
    : "http://localhost:3000";


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || isLoading) return toast.error('Please login to post vote.');
    if (!formData.reason.trim()) return toast.warning("Reason can't be empty.");

  if (!formData.start_date || !formData.end_date) {
  return toast.error("Start and End date are required.");
}


    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/votes`, formData, {
        withCredentials: true
      });
      toast.success('Submitted successfully. Awaiting admin approval.');
      setFormData({ ...initialState, name: user.name, email: user.email });
      setUseToday(false);
    } catch (err) {
      toast.error('Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`min-h-screen pt-20 py-10 px-4 md:px-16 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-8 text-center font-[Cinzel]">Voter Registration Form</h2>

      <form onSubmit={handleSubmit} className={`max-w-3xl mx-auto space-y-6 p-6 rounded-xl border shadow-xl ${isDarkMode ? 'bg-green-950 border-green-200' : 'bg-green-50 border-green-950'}`}>
        <InputField label="Name" name="name" value={formData.name} disabled />
        <InputField label="Email" name="email" value={formData.email} disabled type="email" />
        <InputField label="Country" name="country" value={formData.country} onChange={handleChange} required />

    <DateField
  label="Start Date"
  selected={formData.start_date}
  onChange={(date) => setFormData(prev => ({ ...prev, start_date: date }))}
  todayToggle={true}
  useToday={useToday}
  onTodayToggle={() => setUseToday(!useToday)}
  isDarkMode={isDarkMode}
/>

<DateField
  label="End Date"
  selected={formData.end_date}
  onChange={(date) => setFormData(prev => ({ ...prev, end_date: date }))}
  isDarkMode={isDarkMode}
/>

        <TextAreaField
          label="Reason for Voting (you can paste links too)"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
        />

        <div className="space-y-2">
          <label className="block font-medium">Upload Related Images</label>
          <CloudinaryUploader
            value=""
            onUpload={(url) =>
              setFormData(prev => ({ ...prev, images: [...prev.images, url] }))
            }
          />

          {formData.images.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} alt="uploaded" className="w-24 h-24 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index)
                      }))
                    }
                    className="absolute -top-2 -right-2 bg-white text-red-600 p-1 rounded-full shadow-md group-hover:opacity-100 opacity-0 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, images: [] }))}
                className="text-xs text-red-500 underline hover:text-red-700 ml-2"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 transition text-white font-semibold rounded-md"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Vote'}
        </button>
      </form>
    </section>
  );
}

function InputField({ label, name, value, onChange, type = 'text', required = false, disabled = false }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder={label}
        className="w-full border px-3 py-2 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-60"
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, required = false }) {
  return (
    <div>
      <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        placeholder="Write freely or paste any useful links..."
        className="w-full border px-3 py-2 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}

function DateField({ label, selected, onChange, todayToggle = false, useToday = false, onTodayToggle, isDarkMode }) {
  return (
    <div className="space-y-2">
      <label className="block font-medium">{label}</label>
      <DatePicker
        selected={selected}
        onChange={onChange}
        className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        placeholderText="Select a date"
        dateFormat="yyyy-MM-dd"
      />
      {todayToggle && (
        <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={useToday}
            onChange={onTodayToggle}
            className="accent-green-500 ml-2"
          />
          Use today's date
        </label>
      )}
    </div>
  );
}
