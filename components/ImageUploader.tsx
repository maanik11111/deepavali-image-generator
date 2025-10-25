import React, { useState, useCallback } from 'react';
import type { ImageFile } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { XCircleIcon } from './icons/XCircleIcon';


interface ImageUploaderProps {
  id: string;
  title: string;
  image: ImageFile | null;
  onImageUpload: (file: File) => void;
  onClearImage: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ id, title, image, onImageUpload, onClearImage }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    }
  }, [onImageUpload]);

  const borderClasses = isDragging 
    ? 'border-yellow-400 ring-2 ring-yellow-400/50' 
    : 'border-gray-600';

  return (
    <div className="flex flex-col items-center space-y-2">
       <h3 className="font-semibold text-gray-300">{title}</h3>
      <div 
        className={`relative w-full aspect-square bg-gray-900/50 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300 ${borderClasses}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {image ? (
          <>
            <img
              src={`data:${image.mimeType};base64,${image.base64}`}
              alt={title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClearImage}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
              aria-label="Clear image"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </>
        ) : (
          <label htmlFor={id} className="cursor-pointer text-center p-4 w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center text-gray-400">
                <UploadIcon className="w-10 h-10 mb-2" />
                <span className="font-medium">{isDragging ? 'Drop image here' : 'Click or drag & drop'}</span>
                <span className="text-xs">PNG, JPG, WEBP</span>
            </div>
            <input
              id={id}
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;