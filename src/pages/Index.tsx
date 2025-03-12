
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { Button } from "@/components/ui/button";
import { Compass, Brain, BarChart3, Award, BookOpen, ArrowRight } from 'lucide-react';

const features = [
  {
    title: "Personality Assessment",
    description: "Discover your unique personality traits, strengths, and work preferences.",
    icon: <Brain size={24} />
  },
  {
    title: "Career Matching",
    description: "Get matched with careers that align with your personality and preferences.",
    icon: <Compass size={24} />
  },
  {
    title: "Skills Analysis",
    description: "Identify your key skills and areas for growth to excel in your chosen career.",
    icon: <BarChart3 size={24} />
  },
  {
    title: "Learning Roadmaps",
    description: "Follow custom learning paths designed to help you achieve your career goals.",
    icon: <BookOpen size={24} />
  }
];

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Discover Your Perfect Career Path</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our comprehensive assessment helps you understand your strengths, interests, and ideal work environment to match you with the perfect career.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our simple three-step process will help you discover the perfect career path for your unique personality and goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Take the Assessment",
                  description: "Complete our comprehensive personality and career assessment in just 15-20 minutes."
                },
                {
                  step: "02",
                  title: "Get Your Results",
                  description: "Receive a detailed analysis of your personality traits and matched career options."
                },
                {
                  step: "03",
                  title: "Follow Your Path",
                  description: "Access personalized roadmaps and resources to pursue your ideal career."
                }
              ].map((item, index) => (
                <div 
                  key={item.step} 
                  className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -top-4 left-8 bg-primary text-white text-sm font-bold py-1 px-3 rounded-full">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 mt-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16 animate-fade-in">
              {isAuthenticated ? (
                <Button size="lg" asChild>
                  <Link to="/test" className="flex items-center gap-2">
                    Start Your Assessment <ArrowRight size={16} />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" asChild>
                  <Link to="/register" className="flex items-center gap-2">
                    Create Free Account <ArrowRight size={16} />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Thousands of students have discovered their dream careers with our assessment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Emily Johnson",
                  role: "Software Engineer",
                  quote: "The assessment was spot-on! I was unsure about my career path, but DreamPathway matched me with software engineering, and I couldn't be happier."
                },
                {
                  name: "Michael Chen",
                  role: "Marketing Director",
                  quote: "I was surprised to find marketing as my top career match, but the detailed explanation made perfect sense. Five years later, I'm thriving in this field!"
                },
                {
                  name: "Sophia Rodriguez",
                  role: "UX Designer",
                  quote: "DreamPathway helped me discover my passion for design. The roadmap they provided guided me through learning the right skills and landing my dream job."
                }
              ].map((testimonial, index) => (
                <div 
                  key={testimonial.name} 
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={`https://api.dicebear.com/7.x/micah/svg?seed=${testimonial.name}`}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  <div className="mt-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className="w-5 h-5 text-yellow-400" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/success-stories" 
                className="text-primary font-medium hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                View all success stories <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl font-bold mb-6">Ready to Discover Your Dream Career?</h2>
              <p className="text-white/90 mb-8">
                Join thousands of students who have found their perfect career path. Start your journey today!
              </p>
              {isAuthenticated ? (
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/test" className="flex items-center gap-2">
                    Take the Assessment <ArrowRight size={16} />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register" className="flex items-center gap-2">
                    Get Started for Free <ArrowRight size={16} />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
