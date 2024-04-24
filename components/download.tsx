"use client"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, ChangeEvent } from 'react';
export function Downloader() {
  const [inputValue, setInputValue] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDownload = () => {
    if (inputValue.trim() === '') {
      toast.error('Input cannot be empty!');
      return;
    }
    setDownloading(true); 
    const sunoId = inputValue.replace('https://suno.com/song/', ''); 
    const fileUrl = `https://cdn1.suno.ai/${sunoId}.mp3`; // Construct file URL
    fetch(fileUrl)
      .then(res => res.blob())
      .then(blob => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        const filename = `${sunoId}.mp3`;
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        setDownloading(false); // Hide modal after download completes
      })
      .catch(error => {
        console.error('Download failed:', error);
        setDownloading(false); // Hide modal if download fails
      });
      toast.success('Download success!');
  };

  return (
    <div className="grid min-l-screen place-items-center p-4">
      <div className="w-full">
        <input type="email" placeholder="https://app.suno.ai/song/b27fd-efb85c84..." className="w-full rounded-md border-0 px-4 py-3 placeholder-gray-400 shadow" 
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleDownload} 
          className="mt-2 block w-full rounded-md bg-gradient-to-r from-purple-300 to-purple-400 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-500 hover:-hue-rotate-90">Download</button>
        {downloading && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-lg font-semibold">Downloading...</p>
            </div>
          </div>
        )}
        <ToastContainer />        
      </div>
    </div>
  )
}
