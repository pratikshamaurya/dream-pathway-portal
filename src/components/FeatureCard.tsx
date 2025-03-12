
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
  variant?: 'default' | 'accent' | 'secondary';
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  delay = 0, 
  variant = 'default' 
}: FeatureCardProps) => {
  // Determine gradient and colors based on variant
  const gradients = {
    default: "from-primary/10 to-primary/5",
    accent: "from-accent/10 to-accent/5",
    secondary: "from-secondary/10 to-secondary/5"
  };
  
  const iconBg = {
    default: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    secondary: "bg-secondary/10 text-secondary"
  };

  return (
    <div 
      className="relative group rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in bg-white"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex flex-col gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg[variant]}`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradients[variant]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </div>
  );
};

export default FeatureCard;
