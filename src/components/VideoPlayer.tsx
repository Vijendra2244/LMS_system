import React, { useEffect } from "react";

interface VideoLMSProps {
  videoUrl: string;
  onVideoEnd: () => void;
}

const VideoLMS: React.FC<VideoLMSProps> = ({ videoUrl, onVideoEnd }) => {
  const videoId = videoUrl.split("/").pop() || "";

  useEffect(() => {
    const iframe = document.querySelector(
      `#video-${videoId}`
    ) as HTMLIFrameElement;

    const handleVideoEnd = () => {
      onVideoEnd();
    };

    if (iframe) {
      iframe.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [videoId, onVideoEnd]);

  return (
    <div className="mb-10">
      <iframe
        id={`video-${videoId}`}
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        title={`video-${videoId}`}
      ></iframe>
    </div>
  );
};

export default VideoLMS;
