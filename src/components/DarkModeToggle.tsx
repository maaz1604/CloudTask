'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const DarkModeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-label="Toggle dark mode"
    >
      <div className="w-6 h-6 flex items-center justify-center text-gray-700 dark:text-gray-300">
        {theme === 'light' ? (
          <MdDarkMode size={24} />
        ) : (
          <MdLightMode size={24} />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;