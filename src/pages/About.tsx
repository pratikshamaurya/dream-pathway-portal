
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, ArrowRight, Award, BarChart3, Briefcase } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl font-bold mb-6">About DreamPathway</h1>
              <p className="text-xl text-gray-600 mb-8">
                We're on a mission to help students discover their perfect career path through personalized assessment and guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/register">Join Us</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/success-stories">View Success Stories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl transform translate-x-4 translate-y-4" />
                  <div className="relative overflow-hidden rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                      alt="Team collaboration" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  DreamPathway began with a simple observation: too many students were choosing career paths without truly understanding their own strengths, passions, and potential.
                </p>
                <p className="text-gray-600 mb-4">
                  Founded in 2020 by a team of career counselors, educators, and tech innovators, we set out to create a sophisticated yet accessible platform that combines personality assessment with career guidance.
                </p>
                <p className="text-gray-600 mb-6">
                  Our science-backed approach has since helped thousands of students discover careers where they truly thrive, rather than simply settle.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Personalized assessments",
                    "Science-backed methodology",
                    "Actionable career roadmaps",
                    "Continuous improvement"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle size={20} className="text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users size={32} className="text-primary" />,
                  stat: "25,000+",
                  label: "Students Helped"
                },
                {
                  icon: <Briefcase size={32} className="text-primary" />,
                  stat: "500+",
                  label: "Career Paths"
                },
                {
                  icon: <Award size={32} className="text-primary" />,
                  stat: "98%",
                  label: "Satisfaction Rate"
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{item.stat}</h3>
                  <p className="text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Methodology */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Our Methodology</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our assessment is built on decades of research in psychology, career development, and vocational guidance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="animate-fade-in">
                <h3 className="text-2xl font-semibold mb-6">The Science Behind Our Assessment</h3>
                <p className="text-gray-600 mb-6">
                  DreamPathway's assessment draws from established psychological frameworks including the Big Five personality traits, Holland's RIASEC model, and modern career development theory.
                </p>
                <p className="text-gray-600 mb-6">
                  We continually refine our algorithm based on user outcomes and the latest research, ensuring our recommendations stay current with evolving career landscapes.
                </p>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Personality Traits Analysis",
                      description: "We identify key traits that influence work satisfaction and success."
                    },
                    {
                      title: "Interests & Values Mapping",
                      description: "Understanding what motivates you helps match with fulfilling careers."
                    },
                    {
                      title: "Skills & Aptitude Assessment",
                      description: "We help you discover talents you may not know you have."
                    }
                  ].map((item, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="animate-fade-in">
                <div className="relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl transform -translate-x-4 translate-y-4" />
                  <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full">
                    <h3 className="text-2xl font-semibold mb-6">How We Generate Your Results</h3>
                    
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          1
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold">Data Collection</h4>
                          <p className="text-sm text-gray-600">Your responses are securely collected and analyzed.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          2
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold">Pattern Recognition</h4>
                          <p className="text-sm text-gray-600">Our algorithm identifies patterns in your responses.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          3
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold">Profile Creation</h4>
                          <p className="text-sm text-gray-600">A comprehensive profile of your traits is generated.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          4
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold">Career Matching</h4>
                          <p className="text-sm text-gray-600">Your profile is matched against our database of career profiles.</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          5
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold">Roadmap Creation</h4>
                          <p className="text-sm text-gray-600">Personalized guidance is developed for your top matches.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the passionate team behind DreamPathway, combining expertise in psychology, education, and technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Dr. Sarah Kim",
                  role: "Founder & CEO",
                  bio: "Former career counselor with 15+ years experience helping students find their path.",
                  image: "https://api.dicebear.com/7.x/personas/svg?seed=Sarah"
                },
                {
                  name: "Michael Torres",
                  role: "Chief Psychology Officer",
                  bio: "PhD in Organizational Psychology with research focus on career satisfaction factors.",
                  image: "https://api.dicebear.com/7.x/personas/svg?seed=Michael"
                },
                {
                  name: "Aisha Johnson",
                  role: "Head of Technology",
                  bio: "Tech innovator with background in AI and personalization algorithms.",
                  image: "https://api.dicebear.com/7.x/personas/svg?seed=Aisha"
                },
                {
                  name: "David Chen",
                  role: "Career Research Director",
                  bio: "Leading our ongoing research into emerging careers and industry trends.",
                  image: "https://api.dicebear.com/7.x/personas/svg?seed=David"
                }
              ].map((member, index) => (
                <div 
                  key={member.name} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-primary text-sm mb-2">{member.role}</p>
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
              <p className="text-white/90 mb-8">
                Start your journey today and discover a career path that aligns with who you truly are.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/register" className="flex items-center gap-2">
                  Get Started <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
