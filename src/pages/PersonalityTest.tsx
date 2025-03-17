
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestQuestion from '../components/TestQuestion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Brain, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const personalityQuestions = [
  {
    id: 1,
    question: "I prefer working in groups rather than alone.",
    type: "extroversion"
  },
  {
    id: 2,
    question: "I enjoy being the center of attention.",
    type: "extroversion"
  },
  {
    id: 3,
    question: "I prefer having a wide circle of acquaintances to a small group of close friends.",
    type: "extroversion"
  },
  {
    id: 4,
    question: "I feel comfortable in unfamiliar social situations.",
    type: "extroversion"
  },
  {
    id: 5,
    question: "I prefer practical solutions over theoretical concepts.",
    type: "sensing"
  },
  {
    id: 6,
    question: "I focus more on details than the big picture.",
    type: "sensing"
  },
  {
    id: 7,
    question: "I prefer following established methods rather than improvising.",
    type: "sensing"
  },
  {
    id: 8,
    question: "I trust experience more than theoretical possibilities.",
    type: "sensing"
  },
  {
    id: 9,
    question: "I make decisions based on logical analysis rather than personal values.",
    type: "thinking"
  },
  {
    id: 10,
    question: "I value honesty more than tactfulness.",
    type: "thinking"
  },
  {
    id: 11,
    question: "I prefer clear standards and principles over individual circumstances.",
    type: "thinking"
  },
  {
    id: 12,
    question: "I enjoy debating and pointing out flaws in arguments.",
    type: "thinking"
  },
  {
    id: 13,
    question: "I prefer having a detailed plan rather than being spontaneous.",
    type: "judging"
  },
  {
    id: 14,
    question: "I like to keep my options open rather than make a final decision.",
    type: "judging",
    reverse: true
  },
  {
    id: 15,
    question: "I prefer to have things settled and decided rather than open-ended.",
    type: "judging"
  },
  {
    id: 16,
    question: "I prefer a structured schedule to a flexible routine.",
    type: "judging"
  }
];

const PersonalityTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [personalityResults, setPersonalityResults] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const goToNextQuestion = () => {
    if (answers[personalityQuestions[currentQuestion].id] === undefined) {
      toast({
        title: "Please answer the question",
        description: "Select a response before moving to the next question.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Show completion toast
      toast({
        title: "Personality Assessment Complete!",
        description: "Great job! Proceeding to Career Assessment...",
        action: (
          <div className="h-8 w-8 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        ),
      });
      calculateResults();
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const calculateResults = () => {
    // In a real app, this would be more sophisticated
    const extroversionScore = calculateTraitScore("extroversion");
    const sensingScore = calculateTraitScore("sensing");
    const thinkingScore = calculateTraitScore("thinking");
    const judgingScore = calculateTraitScore("judging");
    
    const results = {
      extroversion: extroversionScore > 0.5 ? "E" : "I",
      sensing: sensingScore > 0.5 ? "S" : "N",
      thinking: thinkingScore > 0.5 ? "T" : "F",
      judging: judgingScore > 0.5 ? "J" : "P"
    };
    
    const personalityType = `${results.extroversion}${results.sensing}${results.thinking}${results.judging}`;
    
    // Store results in localStorage (in a real app, save to database)
    localStorage.setItem('personalityResults', JSON.stringify({
      type: personalityType,
      scores: {
        extroversion: extroversionScore,
        sensing: sensingScore,
        thinking: thinkingScore,
        judging: judgingScore
      }
    }));
    
    // Proceed to career test
    navigate('/test/career');
  };
  
  const calculateTraitScore = (trait: string) => {
    const questionsOfType = personalityQuestions.filter(q => q.type === trait);
    
    if (questionsOfType.length === 0) return 0;
    
    const sum = questionsOfType.reduce((acc, q) => {
      const value = answers[q.id] || 0;
      return acc + (q.reverse ? 5 - value : value);
    }, 0);
    
    // Normalize to 0-1 scale
    return sum / (questionsOfType.length * 5);
  };
  
  const progress = ((currentQuestion + 1) / personalityQuestions.length) * 100;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Brain size={32} />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Personality Assessment</h1>
              <p className="text-gray-600 mb-6">
                Discover your personality type to find careers that match your natural strengths and preferences.
              </p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {personalityQuestions.length}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 animate-fade-in">
              {currentQuestion < personalityQuestions.length && (
                <TestQuestion
                  question={personalityQuestions[currentQuestion].question}
                  questionId={personalityQuestions[currentQuestion].id}
                  onAnswer={handleAnswer}
                  selectedValue={answers[personalityQuestions[currentQuestion].id]}
                />
              )}
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={goToPreviousQuestion}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Previous
              </Button>
              
              <Button 
                onClick={goToNextQuestion}
                className="flex items-center gap-2"
              >
                {currentQuestion < personalityQuestions.length - 1 ? (
                  <>Next <ArrowRight size={16} /></>
                ) : (
                  <>Continue to Career Assessment <ArrowRight size={16} /></>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PersonalityTest;
