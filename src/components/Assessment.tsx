import { useState } from "react";

const Assessment = ({ questions, onNextTask }: any) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const handleInputChange = (questionId: number, value: string) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: value }));
  };

  const handleSubmit = () => {
    setIsAnswered(true);
    onNextTask();
  };

  return (
    <div className="mt-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Assessment</h2>
      </div>
      {questions.map((question: any, index: any) => (
        <div key={index} className="mb-4">
          <div className="mb-2 font-medium">{question}</div>
          {question.includes("multiple-choice") ? (
            <div className="flex space-x-4">
              <input
                type="radio"
                id={`question-${index}-option1`}
                name={`question-${index}`}
                value="option1"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <label htmlFor={`question-${index}-option1`}>Option 1</label>
              <input
                type="radio"
                id={`question-${index}-option2`}
                name={`question-${index}`}
                value="option2"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <label htmlFor={`question-${index}-option2`}>Option 2</label>
            </div>
          ) : (
            <input
              type="text"
              value={answers[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="border p-2 rounded-md text-black"
              placeholder="Your answer here..."
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        disabled={isAnswered}
      >
        {isAnswered ? "Completed" : "Submit"}
      </button>
    </div>
  );
};

export default Assessment;
