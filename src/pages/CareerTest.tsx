
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestQuestion from '../components/TestQuestion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const careerQuestions = [
  {
    id: 1,
    question: "I enjoy solving complex mathematical problems.",
    category: "analytical"
  },
  {
    id: 2,
    question: "I am good at persuading others to see my point of view.",
    category: "social"
  },
  {
    id: 3,
    question: "I enjoy creating artwork or designing things.",
    category: "creative"
  },
  {
    id: 4,
    question: "I like working with tools and building things with my hands.",
    category: "practical"
  },
  {
    id: 5,
    question: "I enjoy researching and analyzing information.",
    category: "analytical"
  },
  {
    id: 6,
    question: "I am good at teaching or explaining concepts to others.",
    category: "social"
  },
  {
    id: 7,
    question: "I enjoy writing stories, poetry, or other creative content.",
    category: "creative"
  },
  {
    id: 8,
    question: "I like fixing things that are broken.",
    category: "practical"
  },
  {
    id: 9,
    question: "I enjoy working with numbers and statistical data.",
    category: "analytical"
  },
  {
    id: 10,
    question: "I am good at resolving conflicts between people.",
    category: "social"
  },
  {
    id: 11,
    question: "I enjoy thinking of innovative solutions to problems.",
    category: "creative"
  },
  {
    id: 12,
    question: "I like working outdoors and with nature.",
    category: "practical"
  },
  {
    id: 13,
    question: "I enjoy learning about scientific concepts and theories.",
    category: "analytical"
  },
  {
    id: 14,
    question: "I am comfortable speaking in front of groups.",
    category: "social"
  },
  {
    id: 15,
    question: "I enjoy expressing myself through art, music, or performance.",
    category: "creative"
  },
  {
    id: 16,
    question: "I like work that produces tangible, visible results.",
    category: "practical"
  }
];

const CareerTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const goToNextQuestion = () => {
    if (answers[careerQuestions[currentQuestion].id] === undefined) {
      toast({
        title: "Please answer the question",
        description: "Select a response before moving to the next question.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentQuestion < careerQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const calculateResults = () => {
    // Calculate scores for each career category
    const analyticalScore = calculateCategoryScore("analytical");
    const socialScore = calculateCategoryScore("social");
    const creativeScore = calculateCategoryScore("creative");
    const practicalScore = calculateCategoryScore("practical");
    
    // Store results (in a real app, save to database)
    localStorage.setItem('careerResults', JSON.stringify({
      categories: {
        analytical: analyticalScore,
        social: socialScore,
        creative: creativeScore,
        practical: practicalScore
      }
    }));
    
    // Navigate to results page
    navigate('/results');
  };
  
  const calculateCategoryScore = (category: string) => {
    const questionsInCategory = careerQuestions.filter(q => q.category === category);
    
    if (questionsInCategory.length === 0) return 0;
    
    const sum = questionsInCategory.reduce((acc, q) => {
      return acc + (answers[q.id] || 0);
    }, 0);
    
    // Normalize to 0-1 scale
    return sum / (questionsInCategory.length * 5);
  };
  
  const progress = ((currentQuestion + 1) / careerQuestions.length) * 100;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <Briefcase size={32} />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Career Assessment</h1>
              <p className="text-gray-600 mb-6">
                Discover your career interests and strengths to find the perfect professional path.
              </p>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-accent h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {careerQuestions.length}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 animate-fade-in">
              {currentQuestion < careerQuestions.length && (
                <TestQuestion
                  question={careerQuestions[currentQuestion].question}
                  questionId={careerQuestions[currentQuestion].id}
                  onAnswer={handleAnswer}
                  selectedValue={answers[careerQuestions[currentQuestion].id]}
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
                {currentQuestion < careerQuestions.length - 1 ? (
                  <>Next <ArrowRight size={16} /></>
                ) : (
                  <>View Results <ArrowRight size={16} /></>
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

export default CareerTest;
