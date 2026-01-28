
import React, { useRef } from 'react';
import { CameraIcon, CloseIcon } from './icons';

interface ImageUploaderProps {
  imageUrl: string | null;
  onChange: (dataUrl: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUrl, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    onChange(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {imageUrl ? (
        <div className="relative w-full h-32">
          <img src={imageUrl} alt="Proof of collection" className="w-full h-full object-cover rounded-xl shadow-sm" />
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1.5 shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            aria-label="Remove image"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleUploadClick}
          className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:bg-slate-100 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <CameraIcon className="w-8 h-8 text-slate-400 mb-2" />
          <span className="text-sm font-medium">Add Photo</span>
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
