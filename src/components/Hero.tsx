
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-0" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0 animate-float" />
      <div className="absolute bottom-1/3 left-1/5 w-72 h-72 bg-accent/10 rounded-full blur-3xl z-0" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-up">
            <div className="py-1 px-3 bg-primary/10 rounded-full inline-flex items-center mb-6 animate-fade-in">
              <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
              <span className="text-sm font-medium text-primary">Discover Your Path</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Find Your Perfect <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Career Path</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Take our comprehensive career assessment to discover your strengths, interests, and the perfect career pathway aligned with your unique personality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Button size="lg" asChild>
                  <Link to="/test" className="flex items-center gap-2">
                    Take the Test <ArrowRight size={16} />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link to="/register" className="flex items-center gap-2">
                      Get Started <ArrowRight size={16} />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/about">Learn More</Link>
                  </Button>
                </>
              )}
            </div>
            
            <div className="mt-12 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                      alt={`User ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">4.9</span> from over 2,000 students
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl transform translate-x-4 translate-y-4" />
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-50 animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Student discovering career path" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
