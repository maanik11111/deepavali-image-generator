
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface GeneratedImageDisplayProps {
  isLoading: boolean;
  error: string | null;
  generatedImage: string | null;
}

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
     <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
     <p className="text-lg text-yellow-400">Crafting your portrait...</p>
     <p className="text-sm text-gray-400 text-center">This may take a moment. The AI is lighting the deepas!</p>
  </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center space-y-4 text-gray-500">
        <SparklesIcon className="w-16 h-16" />
        <p className="text-lg font-medium">Your generated portrait will appear here.</p>
        <p className="text-sm text-center">Upload your photos and click "Generate" to see the magic!</p>
    </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center space-y-3 text-red-400 bg-red-900/20 p-6 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-lg font-bold">Oops! Something went wrong.</p>
        <p className="text-sm text-center">{message}</p>
    </div>
);

const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ isLoading, error, generatedImage }) => {
  return (
    <div className="w-full aspect-square bg-gray-900/50 rounded-lg flex items-center justify-center p-4">
      {isLoading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} />
      ) : generatedImage ? (
        <img
          src={`data:image/png;base64,${generatedImage}`}
          alt="Generated Deepavali Portrait"
          className="w-full h-full object-contain rounded-md"
        />
      ) : (
        <InitialState />
      )}
    </div>
  );
};

export default GeneratedImageDisplay;
