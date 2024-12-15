import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  isActive: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, isActive }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && isActive) {
      iframe.src = `${videoUrl}?autoplay=1&enablejsapi=1`;
    }
  }, [videoUrl, isActive]);

  return (
    <div className="relative w-full pt-[56.25%] bg-gray-900 rounded-lg overflow-hidden shadow-xl">
      <iframe
        ref={iframeRef}
        className="absolute top-0 left-0 w-full h-full"
        src={`${videoUrl}?enablejsapi=1`}
        title="Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;

