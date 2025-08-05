import { useState, useRef, useEffect } from 'react';
import { XCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Loader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-black/50 rounded z-10">
    <div className="w-10 h-10 border-[4px] border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const CloudinaryUploader = ({
  onUpload,
  value = "",
  previewClassName = "",
  overlayClassName = ""
}) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    setPreview(value || null);
    setFileName("");
  }, [value]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const tempURL = URL.createObjectURL(file);
    setPreview(tempURL);
    setLoading(true);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
        setPreview(data.secure_url);
      }
    } catch (err) {
      console.error('Cloudinary Upload Error:', err);
      setPreview(value || null);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setFileName("");
    onUpload(""); // reset parent state
  };

  return (
    <div
      className={`relative w-full max-w-xs min-h-[140px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg px-3 py-4 mx-auto transition-colors
        ${isDarkMode ? 'bg-[#111] border-gray-600 text-orange-300' : 'bg-white border-orange-400 text-amber-700'}
        ${overlayClassName}
      `}
      onClick={() => !loading && inputRef.current?.click()}
      style={{ cursor: loading ? "not-allowed" : "pointer" }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleImageUpload}
        disabled={loading}
        className="hidden"
      />

      {loading && <Loader />}

      {!preview && !loading && (
        <span className="font-medium text-sm text-center">Click or tap to upload image</span>
      )}

      {preview && !loading && (
        <>
          <img
            src={preview}
            alt="Preview"
            className={`max-h-32 object-contain mx-auto rounded shadow ${previewClassName}`}
          />
          {fileName && (
            <span className="block text-xs mt-2 break-all text-center">{fileName}</span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering upload again
              removeImage();
            }}
            className="absolute top-1 right-1 text-red-500 hover:text-red-700"
          >
            <XCircle size={20} />
          </button>
        </>
      )}

      {!preview && fileName && !loading && (
        <span className="block text-xs mt-2 break-all text-center">{fileName}</span>
      )}
    </div>
  );
};

export default CloudinaryUploader;
