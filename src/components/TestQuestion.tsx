
import { useState } from 'react';

export interface Question {
  id: number;
  text: string;
  options: string[];
}

interface TestQuestionProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswerSelected: (questionId: number, answer: string) => void;
  selectedAnswer: string | null;
  isVisible: boolean;
}

const TestQuestion = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswerSelected,
  selectedAnswer,
  isVisible
}: TestQuestionProps) => {
  const handleOptionSelect = (option: string) => {
    onAnswerSelected(question.id, option);
  };

  return (
    <div 
      className={`w-full transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10 pointer-events-none absolute'
      }`}
    >
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-1">
          {question.text}
        </h3>
        <p className="text-gray-500 text-sm">Select the option that best describes you</p>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(option)}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              selectedAnswer === option
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div 
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  selectedAnswer === option 
                    ? 'border-primary bg-primary' 
                    : 'border-gray-300'
                }`}
              >
                {selectedAnswer === option && (
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
