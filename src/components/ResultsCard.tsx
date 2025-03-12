
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface CareerResult {
  title: string;
  description: string;
  matchPercentage: number;
  skills: string[];
  education: string[];
  outlook: string;
}

interface ResultsCardProps {
  career: CareerResult;
  index: number;
}

const ResultsCard = ({ career, index }: ResultsCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{career.title}</h3>
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <circle 
                  cx="18" cy="18" r="16" 
                  fill="none" 
                  stroke="#f3f4f6" 
                  strokeWidth="2"
                />
                <circle 
                  cx="18" cy="18" r="16" 
                  fill="none" 
                  stroke={getMatchColor(career.matchPercentage)} 
                  strokeWidth="2"
                  strokeDasharray={`${(2 * Math.PI * 16) * (career.matchPercentage / 100)} ${2 * Math.PI * 16}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                {career.matchPercentage}%
              </span>
            </div>
            <span className="text-sm font-medium">Match</span>
          </div>
        </div>

        <p className="mt-3 text-gray-600">
          {expanded ? career.description : `${career.description.substring(0, 120)}...`}
        </p>

        <div className={`mt-4 grid gap-4 transition-all duration-300 ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Key Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Education Path</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {career.education.map((edu, i) => (
                    <li key={i}>{edu}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Career Outlook</h4>
              <p className="text-sm text-gray-600">{career.outlook}</p>
            </div>
          </div>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full justify-center"
        >
          {expanded ? (
            <span className="flex items-center gap-1">
              <ChevronUp size={16} />
              Show less
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <ChevronDown size={16} />
              Show more
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ResultsCard;
