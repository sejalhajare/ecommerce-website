import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleScrollToTop(); }} className="text-2xl font-bold text-primary dark:text-pink-400">
              Sejal<span className="text-secondary dark:text-purple-400">.dev</span>
            </a>
            <p className="text-slate-500 dark:text-gray-400 mt-2 max-w-sm">
              Building beautiful and functional digital experiences with modern web technologies.
            </p>
          </div>
          
          <div className="flex space-x-4 text-slate-600 dark:text-gray-400">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-colors">
              <FiGithub size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-colors">
              <FiLinkedin size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-pink-500 dark:hover:text-white transition-colors">
              <FiTwitter size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sejal Hajare. All rights reserved.
          </p>
          
          <button 
            onClick={handleScrollToTop}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:shadow-lg transition-shadow animate-bounce"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
