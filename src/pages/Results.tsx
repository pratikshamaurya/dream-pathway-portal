
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Share2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Personality descriptions for each type
const personalityDescriptions: { [key: string]: any } = {
  'INTJ': {
    title: 'Architect',
    description: 'Strategic, innovative thinkers with a plan for everything',
    strengths: ['Strategic planning', 'Analytical thinking', 'Self-confidence', 'Independent work'],
    careers: ['Software Engineer', 'Financial Analyst', 'Scientific Researcher', 'Management Consultant']
  },
  'INTP': {
    title: 'Logician',
    description: 'Innovative inventors with an unquenchable thirst for knowledge',
    strengths: ['Logical analysis', 'Abstract thinking', 'Problem-solving', 'Adaptability'],
    careers: ['Computer Programmer', 'Data Scientist', 'Economist', 'Research Scientist']
  },
  'ENTJ': {
    title: 'Commander',
    description: 'Bold, imaginative leaders who always find a way',
    strengths: ['Leadership', 'Strategic thinking', 'Decision-making', 'Project planning'],
    careers: ['Corporate Executive', 'Entrepreneur', 'Management Consultant', 'Business Analyst']
  },
  'ENTP': {
    title: 'Debater',
    description: 'Smart and curious thinkers who cannot resist an intellectual challenge',
    strengths: ['Innovation', 'Adaptability', 'Debate skills', 'Problem analysis'],
    careers: ['Entrepreneur', 'Lawyer', 'Creative Director', 'Management Consultant']
  },
  'INFJ': {
    title: 'Advocate',
    description: 'Quiet, insightful idealists with a vision for the greater good',
    strengths: ['Insightful', 'Principled', 'Creative', 'Altruistic'],
    careers: ['Counselor', 'HR Manager', 'Writer', 'Non-profit Director']
  },
  'INFP': {
    title: 'Mediator',
    description: 'Poetic, kind and altruistic people, always eager to help a cause',
    strengths: ['Creativity', 'Empathy', 'Adaptability', 'Passionate dedication'],
    careers: ['Writer', 'Counselor', 'UX Designer', 'Social Worker']
  },
  'ENFJ': {
    title: 'Protagonist',
    description: 'Charismatic and inspiring leaders who captivate their audience',
    strengths: ['Leadership', 'Communication', 'Reliability', 'Organization'],
    careers: ['Teacher', 'HR Director', 'Marketing Manager', 'Non-profit Leader']
  },
  'ENFP': {
    title: 'Campaigner',
    description: 'Enthusiastic, creative and free spirits who find connections with others',
    strengths: ['Enthusiasm', 'Creativity', 'Communication', 'Adaptability'],
    careers: ['Public Relations', 'Marketing', 'Counselor', 'Event Planner']
  },
  'ISTJ': {
    title: 'Logistician',
    description: 'Practical and fact-minded individuals who value integrity and order',
    strengths: ['Organization', 'Integrity', 'Practical solutions', 'Responsibility'],
    careers: ['Accountant', 'Project Manager', 'Database Administrator', 'Quality Assurance']
  },
  'ISFJ': {
    title: 'Defender',
    description: 'Very dedicated and warm protectors, always ready to defend their loved ones',
    strengths: ['Supportive', 'Practical', 'Reliable', 'Patient'],
    careers: ['Nurse', 'Administrative Assistant', 'Elementary Teacher', 'HR Specialist']
  },
  'ESTJ': {
    title: 'Executive',
    description: 'Excellent administrators, managing things and people',
    strengths: ['Organization', 'Leadership', 'Dedication', 'Honesty'],
    careers: ['Business Manager', 'School Principal', 'Financial Officer', 'Government Official']
  },
  'ESFJ': {
    title: 'Consul',
    description: 'Extraordinarily caring, social and popular people',
    strengths: ['Supportive', 'Reliable', 'Conscientious', 'Outgoing'],
    careers: ['Healthcare Administrator', 'Sales Representative', 'Teacher', 'Event Coordinator']
  },
  'ISTP': {
    title: 'Virtuoso',
    description: 'Bold and practical experimenters, masters of tools',
    strengths: ['Problem-solving', 'Technical abilities', 'Adaptability', 'Crisis management'],
    careers: ['Engineer', 'Mechanic', 'Forensic Scientist', 'Systems Analyst']
  },
  'ISFP': {
    title: 'Adventurer',
    description: 'Flexible and creative artists, always ready to explore and experience',
    strengths: ['Creativity', 'Aesthetics', 'Flexibility', 'Supportive'],
    careers: ['Artist', 'Designer', 'Veterinarian', 'Physical Therapist']
  },
  'ESTP': {
    title: 'Entrepreneur',
    description: 'Smart, energetic and perceptive people who enjoy living on the edge',
    strengths: ['Problem-solving', 'Adaptability', 'Risk-taking', 'Persuasion'],
    careers: ['Sales Manager', 'Entrepreneur', 'Marketing Executive', 'Sports Coach']
  },
  'ESFP': {
    title: 'Entertainer',
    description: 'Spontaneous, energetic and enthusiastic entertainers',
    strengths: ['Interpersonal skills', 'Adaptability', 'Enthusiasm', 'Practical support'],
    careers: ['Event Planner', 'Sales Representative', 'Tour Guide', 'Public Relations']
  }
};

// Career categories and related jobs
const careerCategories: { [key: string]: any } = {
  'analytical': {
    title: 'Analytical',
    description: 'You excel at analyzing information, solving complex problems, and working with data.',
    careers: ['Data Scientist', 'Financial Analyst', 'Software Engineer', 'Research Scientist', 'Business Analyst', 'Economist'],
    skills: ['Problem-solving', 'Critical thinking', 'Data analysis', 'Logical reasoning', 'Attention to detail']
  },
  'social': {
    title: 'Social',
    description: 'You enjoy working with and helping people, teaching, and communicating ideas effectively.',
    careers: ['Teacher', 'Human Resources Manager', 'Counselor', 'Social Worker', 'Marketing Manager', 'Public Relations Specialist'],
    skills: ['Communication', 'Empathy', 'Leadership', 'Teamwork', 'Conflict resolution']
  },
  'creative': {
    title: 'Creative',
    description: 'You excel at generating new ideas, expressing yourself artistically, and thinking outside the box.',
    careers: ['Graphic Designer', 'Writer', 'UX Designer', 'Architect', 'Marketing Creative', 'Product Designer'],
    skills: ['Creative thinking', 'Visual communication', 'Originality', 'Artistic ability', 'Design thinking']
  },
  'practical': {
    title: 'Practical',
    description: 'You enjoy hands-on work, building things, and seeing tangible results from your efforts.',
    careers: ['Engineer', 'Construction Manager', 'Electrician', 'Physical Therapist', 'Chef', 'Landscape Designer'],
    skills: ['Technical skills', 'Manual dexterity', 'Physical stamina', 'Project management', 'Spatial awareness']
  }
};

// Learning resources for various career paths
const learningResources: { [key: string]: any } = {
  'Software Engineer': [
    { name: 'Fundamentals of Programming', type: 'Course', link: '#' },
    { name: 'Data Structures and Algorithms', type: 'Book', link: '#' },
    { name: 'Build a Web Application Portfolio', type: 'Project', link: '#' }
  ],
  'Data Scientist': [
    { name: 'Statistics and Probability', type: 'Course', link: '#' },
    { name: 'Machine Learning Fundamentals', type: 'Course', link: '#' },
    { name: 'Data Analysis with Python', type: 'Project', link: '#' }
  ],
  'UX Designer': [
    { name: 'User-Centered Design Principles', type: 'Course', link: '#' },
    { name: 'UI/UX Design Tools', type: 'Workshop', link: '#' },
    { name: 'Build a Design Portfolio', type: 'Project', link: '#' }
  ],
  'Marketing Manager': [
    { name: 'Digital Marketing Fundamentals', type: 'Course', link: '#' },
    { name: 'Brand Strategy', type: 'Course', link: '#' },
    { name: 'Marketing Campaign Analysis', type: 'Project', link: '#' }
  ],
  'Financial Analyst': [
    { name: 'Financial Accounting', type: 'Course', link: '#' },
    { name: 'Investment Analysis', type: 'Course', link: '#' },
    { name: 'Financial Modeling', type: 'Project', link: '#' }
  ],
  'Teacher': [
    { name: 'Educational Psychology', type: 'Course', link: '#' },
    { name: 'Curriculum Development', type: 'Course', link: '#' },
    { name: 'Teaching Certification', type: 'Certification', link: '#' }
  ]
};

const Results = () => {
  const [personalityResults, setPersonalityResults] = useState<any>(null);
  const [careerResults, setCareerResults] = useState<any>(null);
  const [topPersonalityType, setTopPersonalityType] = useState<string>("");
  const [topCareerCategory, setTopCareerCategory] = useState<string>("");
  const [recommendedCareers, setRecommendedCareers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("personality");
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    // Load results from localStorage (in a real app, fetch from database)
    const storedPersonalityResults = localStorage.getItem('personalityResults');
    const storedCareerResults = localStorage.getItem('careerResults');
    
    if (storedPersonalityResults) {
      setPersonalityResults(JSON.parse(storedPersonalityResults));
      setTopPersonalityType(JSON.parse(storedPersonalityResults).type);
    }
    
    if (storedCareerResults) {
      setCareerResults(JSON.parse(storedCareerResults));
      
      // Determine top career category
      const categories = JSON.parse(storedCareerResults).categories;
      const topCategory = Object.keys(categories).reduce((a, b) => 
        categories[a] > categories[b] ? a : b
      );
      setTopCareerCategory(topCategory);
    }
    
    // If both results are available, generate recommendations
    if (storedPersonalityResults && storedCareerResults) {
      generateRecommendations(
        JSON.parse(storedPersonalityResults).type, 
        JSON.parse(storedCareerResults).categories
      );
    }
  }, []);
  
  const generateRecommendations = (personalityType: string, careerCategories: any) => {
    // Get careers from personality type
    const personalityCareers = personalityDescriptions[personalityType]?.careers || [];
    
    // Get top career category
    const topCategory = Object.keys(careerCategories).reduce((a, b) => 
      careerCategories[a] > careerCategories[b] ? a : b
    );
    
    // Get careers from top category
    const categoryCareers = careerCategories[topCategory]?.careers || [];
    
    // Find overlapping careers first, then add unique careers from both sources
    const combined = [
      ...new Set([
        ...personalityCareers.filter((career: string) => 
          careerCategories[topCategory]?.careers?.includes(career)
        ),
        ...personalityCareers.slice(0, 2),
        ...categoryCareers.slice(0, 2)
      ])
    ].slice(0, 5);
    
    setRecommendedCareers(combined);
  };
  
  const handleShare = () => {
    toast({
      title: "Sharing feature coming soon",
      description: "In the future, you'll be able to share your results with others."
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "Download feature coming soon",
      description: "In the future, you'll be able to download your results as a PDF."
    });
  };
  
  if (!personalityResults || !careerResults) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
            <p className="text-gray-600 mb-6">
              You haven't completed the personality and career assessments yet.
            </p>
            <Button asChild>
              <Link to="/test/personality">Take the Assessment</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-3">Your Assessment Results</h1>
              <p className="text-gray-600">
                Based on your responses, we've analyzed your personality type and career interests.
              </p>
              
              <div className="flex justify-center space-x-4 mt-6">
                <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
                  <Share2 size={16} /> Share Results
                </Button>
                <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
                  <Download size={16} /> Download PDF
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="personality" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="personality">Personality</TabsTrigger>
                <TabsTrigger value="career">Career Interests</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personality" className="animate-fade-in">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">
                      {topPersonalityType}: {personalityDescriptions[topPersonalityType]?.title || "Your Type"}
                    </h2>
                    <p className="text-gray-600">
                      {personalityDescriptions[topPersonalityType]?.description || "A unique personality type."}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold mb-4">Personality Traits</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Extroversion</span>
                            <span className="text-sm text-gray-600">
                              {Math.round(personalityResults.scores.extroversion * 100)}%
                            </span>
                          </div>
                          <Progress value={personalityResults.scores.extroversion * 100} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Sensing</span>
                            <span className="text-sm text-gray-600">
                              {Math.round(personalityResults.scores.sensing * 100)}%
                            </span>
                          </div>
                          <Progress value={personalityResults.scores.sensing * 100} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Thinking</span>
                            <span className="text-sm text-gray-600">
                              {Math.round(personalityResults.scores.thinking * 100)}%
                            </span>
                          </div>
                          <Progress value={personalityResults.scores.thinking * 100} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Judging</span>
                            <span className="text-sm text-gray-600">
                              {Math.round(personalityResults.scores.judging * 100)}%
                            </span>
                          </div>
                          <Progress value={personalityResults.scores.judging * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">Key Strengths</h3>
                      <ul className="space-y-2">
                        {personalityDescriptions[topPersonalityType]?.strengths.map((strength: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="career" className="animate-fade-in">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">
                      {careerCategories[topCareerCategory]?.title} Orientation
                    </h2>
                    <p className="text-gray-600">
                      {careerCategories[topCareerCategory]?.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold mb-4">Career Interests</h3>
                      
                      <div className="space-y-4">
                        {Object.keys(careerResults.categories).map((category) => (
                          <div key={category}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium capitalize">{category}</span>
                              <span className="text-sm text-gray-600">
                                {Math.round(careerResults.categories[category] * 100)}%
                              </span>
                            </div>
                            <Progress 
                              value={careerResults.categories[category] * 100} 
                              className="h-2" 
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4">Key Skills</h3>
                      <ul className="space-y-2">
                        {careerCategories[topCareerCategory]?.skills.map((skill: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations" className="animate-fade-in">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Recommended Career Paths</h2>
                    <p className="text-gray-600">
                      Based on your personality type ({topPersonalityType}) and career interests ({careerCategories[topCareerCategory]?.title})
                    </p>
                  </div>
                  
                  <div className="space-y-6 mb-8">
                    {recommendedCareers.map((career, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-2">{career}</h3>
                        
                        <h4 className="font-medium text-sm uppercase text-gray-500 mb-2">Suggested Learning Path</h4>
                        <ul className="space-y-2 mb-4">
                          {(learningResources[career] || []).map((resource: any, idx: number) => (
                            <li key={idx} className="flex items-center justify-between">
                              <span className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                                {resource.name}
                              </span>
                              <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                                {resource.type}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="text-center">
              <Button asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  Save to Profile <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
