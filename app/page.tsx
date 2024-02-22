"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface CurrentlyPlaying {
  albumImageUrl: string;
  title: string;
  artist: string;
  album: string;
  isPlaying: boolean;
  songUrl: string;
}

const Home = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlaying | null>(null);

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      try {
        const response = await fetch('/api/now-playing');
        if (response.ok) {
          const data = await response.json();
          setCurrentlyPlaying(data);
        } else {
          console.error('Failed to fetch currently playing song:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching currently playing song:', error);
      }
    };

    fetchCurrentlyPlaying();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {currentlyPlaying && (
        <div className='bg-white rounded-lg p-6 shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-800'>Now Playing</h2>
          <div className='flex flex-col items-center justify-center'>
            <img className='w-48 h-48 rounded-md border mb-4' src={currentlyPlaying.albumImageUrl}/>
            <p className='text-lg font-bold text-gray-900'>{currentlyPlaying.title}</p>
            <p className='text-base font-semibold text-gray-700'>{currentlyPlaying.artist}</p>
            <p className='text-base text-gray-700'>{currentlyPlaying.album}</p>
            <p className='text-base mt-4 text-gray-500'>
              Is Playing: {currentlyPlaying.isPlaying ? <span className='text-green-500'>Yes</span> : <span className='text-red-500'>No</span>}
            </p>
            <p className='mt-4'>
              <a className='text-blue-500 hover:underline' href={currentlyPlaying.songUrl}>Listen on Spotify</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
