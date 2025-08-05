import { useTheme } from "../context/ThemeContext";

export default function Privacy() {
  const { isDarkMode } = useTheme();

  const containerStyle = isDarkMode
    ? "bg-green-950 text-white"
    : "bg-green-50 text-green-900";

  const headingStyle = `text-3xl md:text-4xl font-bold mb-6 border-b-4 ${
    isDarkMode ? "border-green-400" : "border-green-500"
  } inline-block pb-2`;

  const subHeadingStyle = "text-2xl font-semibold mt-8 mb-4";
  const paragraphStyle = "mb-4 leading-relaxed";

  return (
    <div
      className={`min-h-screen px-6 md:px-20 py-20 transition-all duration-300 ${containerStyle}`}
    >
        <div className={`max-w-4xl mx-auto ${isDarkMode ? "bg-[#1f2d26] border-green-200  " : "bg-white/80 border-green-700"}  backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-lg border  transition-all duration-300`}>
        <h1 className={headingStyle}>Privacy Policy</h1>

        <p className={paragraphStyle}>
          Your privacy is critically important to us. This Privacy Policy
          outlines the types of information we collect and how we use, disclose,
          and protect that information.
        </p>

        <h2 className={subHeadingStyle}>Information We Collect</h2>
        <p className={paragraphStyle}>
          We may collect personal information such as your name, email address,
          and any other details you provide when contacting us or signing up for
          services.
        </p>

        <h2 className={subHeadingStyle}>How We Use Your Information</h2>
        <p className={paragraphStyle}>
          The information we collect is used to respond to your inquiries,
          improve our services, and send you relevant updates if you opt-in for
          them.
        </p>

        <h2 className={subHeadingStyle}>Data Protection</h2>
        <p className={paragraphStyle}>
          We implement industry-standard security measures to protect your
          personal data. However, no method of transmission over the Internet is
          100% secure.
        </p>

        <h2 className={subHeadingStyle}>Third-Party Services</h2>
        <p className={paragraphStyle}>
          We do not sell or share your personal information with third parties
          except as necessary to provide our services or comply with legal
          requirements.
        </p>

        <h2 className={subHeadingStyle}>Changes to This Policy</h2>
        <p className={paragraphStyle}>
          We may update our Privacy Policy from time to time. All updates will be
          posted on this page.
        </p>

        <p className="mt-10 text-sm text-green-600 dark:text-green-300">
          Last updated: August 4, 2025
        </p>
      </div>
    </div>
  );
}
