
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
        Deepavali AI Portrait Generator
      </h1>
      <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
        Transform your photos into beautiful Deepavali-themed portraits. Celebrate the festival of lights with a unique, AI-generated image.
      </p>
    </header>
  );
};

export default Header;
