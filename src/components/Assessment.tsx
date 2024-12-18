import  { useState, useEffect } from 'react';



const Assessment = ({ questions, onNextTask, isActive }:any) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsSubmitted(false);
      setAnswers({});
    }
  }, [isActive]);

  const handleInputChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onNextTask();
  };

  if (!isActive && !isSubmitted) {
    return null;
  }

  return (
    <div className={`bg-gray-800 rounded-lg p-6 space-y-6 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
      <h2 className="text-2xl font-bold text-white mb-6">Assessment Questions</h2>
      <div className="space-y-6">
        {questions.map((question:any) => (
          <div key={question.id} className="bg-gray-700 p-6 rounded-lg">
            <p className="text-white text-lg mb-4">{question.text}</p>
            {question.type === 'text' ? (
              <textarea
                className="w-full bg-gray-600 text-white rounded-lg p-4 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Type your answer here..."
                value={answers[question.id] || ''}
                onChange={(e) => handleInputChange(question.id, e.target.value)}
                disabled={isSubmitted || !isActive}
              />
            ) : (
              <div className="space-y-2">
                {question.options?.map((option:any, index:any) => (
                  <label key={index} className="flex items-center space-x-2 text-white">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={answers[question.id] === option}
                      onChange={() => handleInputChange(question.id, option)}
                      disabled={isSubmitted || !isActive}
                      className="form-radio text-blue-500 focus:ring-blue-500"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {isActive && !isSubmitted && (
        <button
          onClick={handleSubmit}
          className="w-full py-3 px-6 rounded-lg text-white font-semibold transition-colors bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          Next task
        </button>
      )}
      {isSubmitted && (
        <div className="text-green-500 font-semibold text-center">
          Assessment completed! Scroll down for the next video.
        </div>
      )}
    </div>
  );
};

export default Assessment;

