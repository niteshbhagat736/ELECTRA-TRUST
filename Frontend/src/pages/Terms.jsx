import { useTheme } from "../context/ThemeContext";

export default function TermsAndConditions() {
  const { isDarkMode } = useTheme();

  const containerStyle = isDarkMode
    ? "bg-[#0f1c12] text-white"
    : "bg-green-50 text-gray-800";

  const headingStyle =
    "text-4xl font-extrabold mb-8 border-b-4 border-green-500 inline-block pb-2";
  const subheadingStyle =
    "text-2xl font-semibold text-green-600 mt-10 mb-3";
  const paragraphStyle = "mb-4 text-base leading-relaxed text-justify";

  return (
    <div className={`min-h-screen px-6 md:px-20 py-20 transition-all duration-300 ${containerStyle}`}>
      <div className={`max-w-4xl mx-auto ${isDarkMode ? "bg-[#1f2d26] border-green-200  " : "bg-white/80 border-green-700"}  backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-lg border  transition-all duration-300`}>
        <h1 className={headingStyle}>Terms & Conditions</h1>

        <p className={paragraphStyle}>
          By accessing this website, you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>

        <h2 className={subheadingStyle}>1. Use License</h2>
        <p className={paragraphStyle}>
          Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
        </p>

        <h2 className={subheadingStyle}>2. Disclaimer</h2>
        <p className={paragraphStyle}>
          The materials on this website are provided "as is". We make no warranties, expressed or implied, and hereby disclaim all other warranties.
        </p>

        <h2 className={subheadingStyle}>3. Limitations</h2>
        <p className={paragraphStyle}>
          In no event shall we be liable for any damages arising out of the use or inability to use the materials on our website.
        </p>

        <h2 className={subheadingStyle}>4. Revisions and Errata</h2>
        <p className={paragraphStyle}>
          The materials appearing on our site could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate or current.
        </p>

        <h2 className={subheadingStyle}>5. Modifications</h2>
        <p className={paragraphStyle}>
          We may revise these terms of use at any time without notice. By using this site, you agree to be bound by the then-current version of these Terms and Conditions.
        </p>

        <h2 className={subheadingStyle}>6. Governing Law</h2>
        <p className={paragraphStyle}>
          Any claim relating to this website shall be governed by the laws of India without regard to its conflict of law provisions.
        </p>

        <p className="mt-10 text-sm text-gray-600 dark:text-gray-400 italic">
          Last updated: August 4, 2025
        </p>
      </div>
    </div>
  );
}
