
import { useState } from 'react';

export interface Question {
  id: number;
  text: string;
  options: string[];
}

interface TestQuestionProps {
  question: string;
  questionId: number;
  onAnswer: (questionId: number, value: number) => void;
  selectedValue?: number;
}

const TestQuestion = ({
  question,
  questionId,
  onAnswer,
  selectedValue
}: TestQuestionProps) => {
  const options = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
  ];

  const handleOptionSelect = (value: number) => {
    onAnswer(questionId, value);
  };

  return (
    <div className="w-full">
      {/* Question */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          {question}
        </h3>
        <p className="text-gray-500 text-sm">Select how much you agree with this statement</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index + 1)}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              selectedValue === index + 1
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div 
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedValue === index + 1 
                    ? 'border-primary bg-primary' 
                    : 'border-gray-300'
                }`}
              >
                {selectedValue === index + 1 && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="ml-3">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestQuestion;
