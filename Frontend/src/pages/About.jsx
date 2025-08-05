import { useTheme } from "../context/ThemeContext";

export default function About() {
  const { isDarkMode } = useTheme();

  const bgColor = isDarkMode ? 'bg-green-950 text-white' : 'bg-green-50 text-green-900';
  const borderColor = isDarkMode ? 'border-green-400' : 'border-green-500';
  const emailColor = isDarkMode ? 'text-green-300' : 'text-green-600';

  return (
    <div className={`min-h-screen py-20 px-6 md:px-20 transition-colors duration-300 ${bgColor}`}>
      <div className="max-w-5xl mx-auto">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 inline-block pb-2 border-b-4 ${borderColor}`}>
          About Us
        </h1>

        <p className="text-lg mb-6">
          Welcome to our platform – a space where transparency meets innovation.
          We built this application with the mission of giving users a voice through a secure and accessible voting system.
        </p>

        <p className="text-lg mb-6">
          Whether it's posting ideas, participating in polls, or getting approvals from trusted admins, everything is built around trust, privacy, and simplicity.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Why We Exist</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>To promote verified and moderated community submissions.</li>
          <li>To provide an admin-controlled approval system for quality assurance.</li>
          <li>To encourage fair, anonymous voting on shared public content.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Meet the Developer</h2>
        <p className="text-lg">
          Built with 💚 by Nitesh Bhagat, a passionate developer focused on secure, scalable, and visually appealing web applications using the MERN stack and modern tools like Tailwind, Firebase, and MongoDB Atlas.
        </p>

        <div className="mt-10">
          <p className="text-sm text-green-700 dark:text-green-300">
            For collaborations or technical queries, reach out at{" "}
            <a href="mailto:" className={`underline ${emailColor}`}>
            XYZ_email
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
