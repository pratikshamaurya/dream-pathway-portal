
import { useState } from 'react';

interface SuccessStoryCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  imageSrc: string;
  index: number;
}

const SuccessStoryCard = ({ 
  name, 
  role, 
  company, 
  quote, 
  imageSrc,
  index 
}: SuccessStoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />
      
      <img 
        src={imageSrc} 
        alt={name} 
        className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105" 
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="transform transition-transform duration-300 translate-y-0 group-hover:-translate-y-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-white/90 text-sm">{role} at {company}</p>
        </div>
        
        <div 
          className={`mt-3 text-sm opacity-0 transform translate-y-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : ''
          }`}
        >
          <p className="line-clamp-3 text-white/90">"{quote}"</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
