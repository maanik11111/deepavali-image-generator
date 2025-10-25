
import React from 'react';

interface ModeSelectorProps {
  mode: 'single' | 'couple';
  setMode: (mode: 'single' | 'couple') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  const baseClasses = "w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500";
  const activeClasses = "bg-yellow-500 text-gray-900";
  const inactiveClasses = "bg-gray-700 text-white hover:bg-gray-600";

  return (
    <div className="grid grid-cols-2 gap-4 bg-gray-900 p-2 rounded-xl">
      <button
        onClick={() => setMode('single')}
        className={`${baseClasses} ${mode === 'single' ? activeClasses : inactiveClasses}`}
      >
        Single Image
      </button>
      <button
        onClick={() => setMode('couple')}
        className={`${baseClasses} ${mode === 'couple' ? activeClasses : inactiveClasses}`}
      >
        2 Images
      </button>
    </div>
  );
};

export default ModeSelector;