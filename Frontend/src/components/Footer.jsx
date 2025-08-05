import { Link } from 'react-router-dom';
import {
  FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaYoutube
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDarkMode } = useTheme();

  const bg = isDarkMode ? 'bg-green-950' : 'bg-green-100';
  const text = isDarkMode ? 'text-white' : 'text-green-900';
  const border = isDarkMode ? 'border-green-700' : 'border-green-300';
  const mutedText = isDarkMode ? 'text-gray-400' : 'text-gray-700';

  return (
    <footer className={`${bg} ${text} border-t ${border} font-sans pt-10 pb-6 px-6 md:px-20 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* Tabs / Quick Links */}
        <Section title="Explore" items={[
          <NavItem key="home" to="/">Home</NavItem>,
          <NavItem key="form" to="/vote">Submit Vote</NavItem>,
          <NavItem key="blog" to="/blog">Blogs</NavItem>,
          <NavItem key="contact" to="/contact">Contact</NavItem>,
          <NavItem key="about" to="/about">About</NavItem>,
          <NavItem key="terms" to="/terms">Terms & Condition</NavItem>,
          <NavItem key="privacy" to="/privacy">Privacy</NavItem>,
        ]} />

        {/* Project Summary */}
        <Section title="ElectraTrust" items={[
          'Secure & Anonymous Voting',
          'Built for Institutions & Modern Democracies',
          'Empowering Transparent Digital Elections',
        ]} />

        {/* Social Links */}
        <div>
          <h3 className="text-green-600 uppercase font-semibold mb-4 tracking-wide">Connect</h3>
          <ul className={`space-y-3 text-sm ${mutedText}`}>
            <SocialLink Icon={MdEmail} label="support@electratrust.org" />
            <SocialLink Icon={FaLinkedin} label="LinkedIn" href="#" />
            <SocialLink Icon={FaInstagram} label="Instagram" href="#" />
            <SocialLink Icon={FaTwitter} label="Twitter" href="#" />
            <SocialLink Icon={FaYoutube} label="YouTube" href="#" />
            <SocialLink Icon={FaGithub} label="GitHub" href="#" />
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-white/10 pt-6 text-xs text-center text-gray-400">
        <p>© {new Date().getFullYear()} ElectraTrust. All rights reserved.</p>
        <p>Built with 💚 React, TailwindCSS, ExpressJS & Community Power</p>
      </div>
    </footer>
  );
}

function Section({ title, items }) {
  return (
    <div>
      <h3 className="text-green-500 uppercase font-semibold mb-4 tracking-wide">{title}</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}

function NavItem({ to, children }) {
  return (
    <Link to={to} className="hover:text-yellow-300 transition-colors duration-200">
      {children}
    </Link>
  );
}

function SocialLink({ Icon, label, href }) {
  return (
    <li className="flex items-center gap-2 hover:text-yellow-300 transition">
      {Icon && <Icon className="text-green-400" />}
      {href
        ? <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
        : <span>{label}</span>}
    </li>
  );
}
