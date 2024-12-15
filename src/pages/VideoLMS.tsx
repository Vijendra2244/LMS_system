import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Assessment from "../components/Assessment";
import dummyData from "../dummy.json";

const VideoLMS: React.FC = () => {
  const [courseData, setCourseData] = useState<any>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  useEffect(() => {
    setCourseData(dummyData);
  }, []);

  const handleNextTask = () => {
    if (currentTaskIndex < courseData.length - 1) {
      setCurrentTaskIndex((prev) => prev + 1);
      const nextVideo = document.getElementById(
        `video-${currentTaskIndex + 1}`
      );
      nextVideo?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (courseData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 py-6 px-4 mb-8 sticky top-0 z-10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-white text-center">
            Video Learning Management system
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto space-y-16">
          {courseData.map((task: any, index: any) => (
            <div key={task.id} className="space-y-8">
              <div
                id={`video-${index}`}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <VideoPlayer
                  videoUrl={task.videoUrl}
                  isActive={index === currentTaskIndex}
                />
              </div>

              <Assessment
                questions={task.assessment}
                onNextTask={handleNextTask}
                isActive={index === currentTaskIndex}
              />

              <div className="text-gray-400 text-center">
                Lesson {index + 1} of {courseData.length}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VideoLMS;
