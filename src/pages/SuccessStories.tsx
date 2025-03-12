
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Award, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const successStories = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Software Engineer at Google",
    image: "https://api.dicebear.com/7.x/micah/svg?seed=Emily",
    story: "I was completely lost about my career path after high school. The personality assessment helped me understand that my analytical thinking and problem-solving skills would make me excel in software engineering. Following the roadmap provided, I learned coding, built projects, and landed an internship that turned into a full-time role at Google.",
    quote: "The career guidance system didn't just suggest a job—it helped me discover my passion."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director at Spotify",
    image: "https://api.dicebear.com/7.x/micah/svg?seed=Michael",
    story: "With interests in both creativity and business, I wasn't sure which direction to take. The assessment revealed my strengths in communication and strategic thinking, suggesting marketing as an ideal field. The detailed roadmap guided me through relevant courses, internships, and networking opportunities that led to my current position.",
    quote: "This platform turned my confusion into clarity and helped me find a career that combines all my interests."
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "UX Designer at Adobe",
    image: "https://api.dicebear.com/7.x/micah/svg?seed=Sophia",
    story: "I always loved art but wasn't sure how to turn it into a sustainable career. The assessment highlighted my empathy and visual thinking skills, recommending UX design as a perfect match. Following the suggested courses and building my portfolio according to the roadmap, I was able to transition into tech and secure my dream job.",
    quote: "The personalized roadmap was like having a mentor guiding me every step of the way."
  },
  {
    id: 4,
    name: "David Okafor",
    role: "Data Scientist at Microsoft",
    image: "https://api.dicebear.com/7.x/micah/svg?seed=David",
    story: "I enjoyed math and statistics but didn't know which career would be best. The assessment identified my analytical strengths and suggested data science. The roadmap provided clear steps through university courses, online certifications, and practical projects that helped me stand out to employers.",
    quote: "Without this guidance, I might have missed discovering a field that perfectly matches my abilities and interests."
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Healthcare Administrator",
    image: "https://api.dicebear.com/7.x/micah/svg?seed=Aisha",
    story: "I wanted to work in healthcare but wasn't interested in becoming a doctor or nurse. The assessment highlighted my organizational skills and compassion, suggesting healthcare administration as an ideal fit. The roadmap guided me through the right degree, certifications, and entry-level positions that led to my current leadership role.",
    quote: "This platform showed me there are many ways to make an impact in healthcare beyond the obvious clinical roles."
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Environmental Scientist",
    image: "https://api.dicebear.com/7.x/micah/svg?seed=James",
    story: "I was passionate about the environment but unsure how to channel that into a career. The assessment recognized my scientific aptitude and concern for sustainability, suggesting environmental science. The roadmap helped me choose the right degree, gain field experience, and connect with organizations aligned with my values.",
    quote: "The guidance I received helped me turn my environmental passion into meaningful work that makes a difference."
  }
];

const SuccessStories = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary to-accent text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Success Stories</h1>
              <p className="text-lg md:text-xl mb-8">
                Discover how students like you found their dream careers through our personality and career assessments.
              </p>
              {!isAuthenticated && (
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register" className="flex items-center gap-2">
                    Start Your Journey <ArrowRight size={16} />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
        
        {/* Stories grid */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div 
                  key={story.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{story.name}</h3>
                        <p className="text-sm text-gray-600">{story.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-6">{story.story}</p>
                    
                    <div className="border-l-4 border-primary pl-4 italic text-gray-600">
                      "{story.quote}"
                    </div>
                    
                    <div className="mt-6 flex items-center text-primary">
                      <Award size={16} className="mr-2" />
                      <span className="text-sm font-medium">Success Story</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Write Your Success Story?</h2>
              <p className="text-gray-600 mb-8">
                Join thousands of students who discovered their perfect career path through our assessment system.
              </p>
              {isAuthenticated ? (
                <Button size="lg" asChild>
                  <Link to="/test/personality" className="flex items-center gap-2">
                    Take the Assessment <ArrowRight size={16} />
                  </Link>
                </Button>
              ) : (
                <Button size="lg" asChild>
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

export default SuccessStories;
