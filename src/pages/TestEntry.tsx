
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Briefcase, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const TestEntry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const startTest = (testType: 'personality' | 'career') => {
    toast({
      title: "Test Starting",
      description: `You're about to begin the ${testType === 'personality' ? 'Personality' : 'Career'} Assessment.`,
      action: (
        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
          <CheckCircle className="h-5 w-5 text-primary" />
        </div>
      ),
    });
    
    // Navigate to the corresponding test page
    navigate(`/test/${testType}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Your Ideal Career Path</h1>
              <p className="text-lg text-gray-600">
                Complete our assessments to get personalized career recommendations based on your personality and preferences.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Personality Test Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Brain size={32} />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center mb-2">Personality Assessment</h2>
                <p className="text-gray-600 mb-6 text-center">
                  Discover your personality type and natural strengths through our comprehensive assessment.
                </p>
                <Button 
                  onClick={() => startTest('personality')} 
                  className="w-full flex items-center justify-center gap-2"
                >
                  Start Personality Test <ArrowRight size={16} />
                </Button>
              </div>
              
              {/* Career Test Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <Briefcase size={32} />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center mb-2">Career Assessment</h2>
                <p className="text-gray-600 mb-6 text-center">
                  Identify your professional interests and discover career paths aligned with your preferences.
                </p>
                <Button 
                  onClick={() => startTest('career')} 
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  Start Career Test <ArrowRight size={16} />
                </Button>
              </div>
            </div>
            
            <div className="mt-10 bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h3 className="text-lg font-semibold mb-2">How It Works</h3>
              <ol className="space-y-3 list-decimal list-inside text-gray-700">
                <li>Complete the personality assessment to understand your core strengths</li>
                <li>Take the career assessment to identify your professional interests</li>
                <li>Receive personalized career recommendations based on your results</li>
                <li>Explore detailed insights about potential career paths</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TestEntry;
