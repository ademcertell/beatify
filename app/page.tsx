"use client"

import { useState, useEffect } from 'react';
import TopTracks from '@/components/TopTracks';
import Image from 'next/image';

interface CurrentlyPlaying {
  albumImageUrl: string;
  title: string;
  artist: string;
  album: string;
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
    <div className="min-h-screen mt-10 flex flex-col items-center justify-center">
      {currentlyPlaying && (
        <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
          <div className="relative w-full h-60 mb-4">
            <Image
              src={currentlyPlaying.albumImageUrl}
              alt="Album Cover"
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">{currentlyPlaying.title}</h2>
            <p className="text-lg font-semibold text-rose-500">{currentlyPlaying.artist}</p>
            <p className="text-base text-gray-400 mb-4">{currentlyPlaying.album}</p>
            <a href={currentlyPlaying.songUrl} className="text-rose-500 no:underline">Listen on Spotify</a>
          </div>
        </div>
      )}
      <TopTracks />
    </div>
  );
};

export default Home;

