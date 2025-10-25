
import React, { useState, useCallback } from 'react';
import type { ImageFile } from './types';
import { generateDeepavaliImage } from './services/geminiService';
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import ImageUploader from './components/ImageUploader';
import GeneratedImageDisplay from './components/GeneratedImageDisplay';
import { SparklesIcon } from './components/icons/SparklesIcon';

type Mode = 'single' | 'couple';

const App: React.FC = () => {
  const [mode, setMode] = useState<Mode>('single');
  const [personOneImage, setPersonOneImage] = useState<ImageFile | null>(null);
  const [personTwoImage, setPersonTwoImage] = useState<ImageFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File, person: 'one' | 'two') => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      const imageFile: ImageFile = {
        base64: base64String,
        mimeType: file.type,
      };
      if (person === 'one') {
        setPersonOneImage(imageFile);
      } else {
        setPersonTwoImage(imageFile);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleGenerate = useCallback(async () => {
    if (!personOneImage || (mode === 'couple' && !personTwoImage)) {
      setError("Please upload all required photos.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateDeepavaliImage(
        personOneImage,
        mode === 'couple' ? personTwoImage : null
      );
      setGeneratedImage(result);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [mode, personOneImage, personTwoImage]);

  const isGenerateDisabled = isLoading || !personOneImage || (mode === 'couple' && !personTwoImage);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        <Header />
        <main className="mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-yellow-500/20 flex flex-col space-y-6">
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3">1. Select Mode</h2>
                <ModeSelector mode={mode} setMode={setMode} />
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-yellow-400 mb-3">2. Upload Photos</h2>
                <div className={`grid gap-4 ${mode === 'couple' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                  <ImageUploader
                    id="person1"
                    title="Image 1"
                    image={personOneImage}
                    onImageUpload={(file) => handleImageUpload(file, 'one')}
                    onClearImage={() => setPersonOneImage(null)}
                  />
                  {mode === 'couple' && (
                    <ImageUploader
                      id="person2"
                      title="Image 2"
                      image={personTwoImage}
                      onImageUpload={(file) => handleImageUpload(file, 'two')}
                      onClearImage={() => setPersonTwoImage(null)}
                    />
                  )}
                </div>
              </div>

              <div className="flex-grow"></div>

              <div className="pt-4">
                 <button
                    onClick={handleGenerate}
                    disabled={isGenerateDisabled}
                    className="w-full flex items-center justify-center text-lg font-bold bg-yellow-500 text-gray-900 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <SparklesIcon className="w-6 h-6 mr-3" />
                    {isLoading ? 'Generating Your Portrait...' : 'Generate Image'}
                  </button>
              </div>
            </div>

            {/* Output Display */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-yellow-500/20">
               <h2 className="text-xl font-bold text-yellow-400 mb-4">3. Your Festive Portrait</h2>
              <GeneratedImageDisplay
                isLoading={isLoading}
                error={error}
                generatedImage={generatedImage}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;