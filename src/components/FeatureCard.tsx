import React from 'react';
import { FiShield, FiActivity, FiLock, FiBarChart2 } from 'react-icons/fi';

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="group relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors duration-300 dark:bg-blue-900/50">
        <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300 dark:text-blue-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  </div>
);

// Example usage:
export const FeaturesSection = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    <FeatureCard 
      icon={FiShield} 
      title="Real-time Analysis" 
      description="Instant detection of synthetic voice patterns" 
    />
    <FeatureCard 
      icon={FiActivity} 
      title="Blockchain Verification" 
      description="Immutable verification records" 
    />
    <FeatureCard 
      icon={FiLock} 
      title="Enterprise Security" 
      description="Military-grade encryption" 
    />
    <FeatureCard 
      icon={FiBarChart2} 
      title="Detailed Analytics" 
      description="Comprehensive risk reports" 
    />
  </div>
);

export default FeatureCard;