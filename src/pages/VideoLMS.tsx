import React, { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Assessment from "../components/Assessment";
import dummyData from "../dummy.json";

const VideoLMS: React.FC = () => {
  const [currentTask, setCurrentTask] = useState(0);

  const handleVideoEnd = () => {
    const assessment = document.getElementById(`assessment-${currentTask}`);
    assessment?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNextTask = () => {
    if (currentTask < dummyData.length - 1) {
      setCurrentTask((prev) => prev + 1);
      const nextVideo = document.getElementById(`video-${currentTask + 1}`);
      nextVideo?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="snap-y snap-mandatory overflow-y-scroll bg-black text-white">
      {dummyData.map((task, index) => (
        <div
          key={task.id}
          id={`video-${index}`}
          className="flex flex-col items-center justify-center snap-center"
        >
     
          <VideoPlayer videoUrl={task.videoUrl} onVideoEnd={handleVideoEnd} />

          {currentTask === index && (
            <div
              id={`assessment-${index}`}
              className="mt-6 w-full bg-gray-800 p-6 rounded-lg text-center"
            >
              <Assessment questions={task.assessment} />
              <button
                onClick={handleNextTask}
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Next Task
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VideoLMS;
