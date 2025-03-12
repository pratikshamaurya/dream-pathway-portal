
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BookOpen, Clock, History, User } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [personalityResults, setPersonalityResults] = useState<any>(null);
  const [careerResults, setCareerResults] = useState<any>(null);
  
  useEffect(() => {
    // Load results from localStorage (in a real app, fetch from database)
    const storedPersonalityResults = localStorage.getItem('personalityResults');
    const storedCareerResults = localStorage.getItem('careerResults');
    
    if (storedPersonalityResults) {
      setPersonalityResults(JSON.parse(storedPersonalityResults));
    }
    
    if (storedCareerResults) {
      setCareerResults(JSON.parse(storedCareerResults));
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                  
                  <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    {personalityResults && (
                      <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {personalityResults.type}
                      </div>
                    )}
                    
                    {careerResults && (() => {
                      const categories = careerResults.categories;
                      const topCategory = Object.keys(categories).reduce((a, b) => 
                        categories[a] > categories[b] ? a : b
                      );
                      return (
                        <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium capitalize">
                          {topCategory} Oriented
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="results" className="mb-8">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="profile">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="hidden sm:inline">Profile</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="results">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} />
                    <span className="hidden sm:inline">Assessment Results</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="history">
                  <div className="flex items-center gap-2">
                    <History size={16} />
                    <span className="hidden sm:inline">Test History</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your account information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Full Name</p>
                        <p className="font-medium">{user?.name}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Member Since</p>
                        <p className="font-medium">June 2023</p>
                      </div>
                      
                      <Button className="w-full sm:w-auto">Edit Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="results" className="animate-fade-in">
                {(personalityResults || careerResults) ? (
                  <div className="space-y-6">
                    {personalityResults && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Personality Assessment Results</CardTitle>
                          <CardDescription>
                            Completed on {new Date().toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <h3 className="font-semibold text-lg mb-1">
                              {personalityResults.type}
                            </h3>
                            <p className="text-gray-600 mb-4">
                              {personalityResults.type.split('').map((letter: string, index: number) => {
                                const labels = [
                                  ['Extrovert', 'Introvert'],
                                  ['Sensing', 'Intuitive'],
                                  ['Thinking', 'Feeling'],
                                  ['Judging', 'Perceiving']
                                ];
                                const trait = index === 0 && letter === 'E' ? labels[0][0] : 
                                             index === 0 && letter === 'I' ? labels[0][1] :
                                             index === 1 && letter === 'S' ? labels[1][0] :
                                             index === 1 && letter === 'N' ? labels[1][1] :
                                             index === 2 && letter === 'T' ? labels[2][0] :
                                             index === 2 && letter === 'F' ? labels[2][1] :
                                             index === 3 && letter === 'J' ? labels[3][0] :
                                             labels[3][1];
                                return (
                                  <span key={index} className="mr-2">{trait}{index < 3 ? ',' : ''}</span>
                                );
                              })}
                            </p>
                          </div>
                          
                          <Button variant="outline" asChild className="w-full sm:w-auto">
                            <Link to="/results" className="flex items-center gap-2">
                              View Full Results <ArrowRight size={16} />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                    
                    {careerResults && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Career Assessment Results</CardTitle>
                          <CardDescription>
                            Completed on {new Date().toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <h3 className="font-semibold text-lg mb-1">
                              Top Interest Areas
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {Object.entries(careerResults.categories)
                                .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
                                .map(([category, score]: [string, any], index: number) => (
                                  <div 
                                    key={category} 
                                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                                      index === 0 ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-gray-700'
                                    }`}
                                  >
                                    {category} ({Math.round(score * 100)}%)
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                          
                          <Button variant="outline" asChild className="w-full sm:w-auto">
                            <Link to="/results" className="flex items-center gap-2">
                              View Full Results <ArrowRight size={16} />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-8 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">No Assessment Results Yet</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't completed any assessments. Take an assessment to see your results here.
                    </p>
                    <Button asChild>
                      <Link to="/test/personality">Take the Assessment</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history" className="animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment History</CardTitle>
                    <CardDescription>Your past assessments and results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {(personalityResults || careerResults) ? (
                      <div className="space-y-4">
                        {personalityResults && (
                          <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">Personality Assessment</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock size={14} className="mr-1" /> {new Date().toLocaleDateString()}
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link to="/results">View</Link>
                            </Button>
                          </div>
                        )}
                        
                        {careerResults && (
                          <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div>
                              <h3 className="font-semibold">Career Assessment</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock size={14} className="mr-1" /> {new Date().toLocaleDateString()}
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <Link to="/results">View</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-gray-600 mb-6">
                          You haven't taken any assessments yet.
                        </p>
                        <Button asChild>
                          <Link to="/test/personality">Take the Assessment</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
