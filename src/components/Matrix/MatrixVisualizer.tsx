import React, { useState, useEffect } from 'react';
import { Users, UserPlus, CheckCircle } from 'lucide-react';
import { MatrixPosition } from '../../contexts/MatrixContext';

interface MatrixVisualizerProps {
  position: MatrixPosition;
  levelColor: string;
  onFill: () => void;
}

const MatrixVisualizer: React.FC<MatrixVisualizerProps> = ({ 
  position, 
  levelColor,
  onFill
}) => {
  const [animate, setAnimate] = useState(false);
  
  // Set initial animation state
  useEffect(() => {
    setAnimate(true);
  }, []);
  
  // Generate placeholders for unfilled positions
  const filledSlots = [...position.members];
  while (filledSlots.length < 3) {
    filledSlots.push('');
  }
  
  // Check if position is completely filled
  const isFilled = position.filled >= 3;
  
  return (
    <div className="card overflow-hidden">
      <div className="text-center mb-8">
        <div 
          className="w-16 h-16 rounded-full bg-primary-100 mx-auto flex items-center justify-center mb-2"
          style={{ backgroundColor: `${levelColor}20`, color: levelColor }}
        >
          <Users size={24} />
        </div>
        <div className="text-lg font-medium">You</div>
        <div className="text-sm text-neutral-500">Position ID: {position.id.substring(0, 8)}</div>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute w-0.5 h-6 bg-neutral-300 left-1/2 -translate-x-1/2 top-0"></div>
        <div className="absolute w-full h-0.5 bg-neutral-300 top-6"></div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {filledSlots.map((member, index) => {
          const isMemberFilled = !!member;
          const delay = `${index * 0.2}s`;
          
          return (
            <div 
              key={index}
              className={`flex flex-col items-center transition-all duration-500 ${
                animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: delay }}
            >
              <div className="relative">
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${
                    isMemberFilled 
                      ? `bg-success bg-opacity-10 text-success` 
                      : 'bg-neutral-200 text-neutral-400'
                  }`}
                >
                  {isMemberFilled ? (
                    <CheckCircle size={24} />
                  ) : (
                    <UserPlus size={24} />
                  )}
                  
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white bg-primary-600">
                    {index + 1}
                  </div>
                </div>
              </div>
              
              <div className="text-sm font-medium text-center">
                {isMemberFilled ? `Member ${member.split('-')[1]}` : 'Empty'}
              </div>
              <div className="text-xs text-neutral-500 text-center">
                {isMemberFilled ? 'Filled' : 'Waiting'}
              </div>
            </div>
          );
        })}
      </div>
      
      {!position.cycled && (
        <div className="mt-8 text-center">
          <button 
            onClick={onFill}
            className={`button ${isFilled ? 'button-secondary' : 'button-primary'} px-6`}
            disabled={isFilled}
          >
            {isFilled ? 'Matrix Filled' : 'Simulate Fill'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MatrixVisualizer;