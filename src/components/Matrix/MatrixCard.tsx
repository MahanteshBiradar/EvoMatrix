import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, Users, ChevronRight } from 'lucide-react';
import { MatrixPosition } from '../../contexts/MatrixContext';

interface MatrixCardProps {
  position: MatrixPosition;
  levelName: string;
  levelColor: string;
  onFill: () => void;
}

const MatrixCard: React.FC<MatrixCardProps> = ({ 
  position, 
  levelName, 
  levelColor,
  onFill
}) => {
  const progress = (position.filled / 3) * 100;
  const progressBarStyle = {
    width: `${progress}%`,
    backgroundColor: levelColor,
  };

  return (
    <div className="card hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span 
            className="inline-block px-3 py-1 text-xs font-medium rounded-full" 
            style={{ backgroundColor: `${levelColor}20`, color: levelColor }}
          >
            {levelName}
          </span>
          
          <h3 className="mt-2 text-lg font-semibold">
            ${position.amount.toFixed(2)}
          </h3>
        </div>
        
        <div className="flex items-center">
          {position.cycled ? (
            <span className="flex items-center text-success text-sm font-medium">
              <CheckCircle size={16} className="mr-1" />
              Completed
            </span>
          ) : (
            <span className="flex items-center text-warning text-sm font-medium">
              <Clock size={16} className="mr-1" />
              In Progress
            </span>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-neutral-600">Fill Progress:</span>
          <span className="text-sm font-medium">{position.filled} of 3</span>
        </div>
        
        <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-500" 
            style={progressBarStyle}
          ></div>
        </div>
      </div>
      
      <div className="text-sm text-neutral-600 mb-4">
        <div className="flex items-center mb-1">
          <Users size={16} className="mr-2" />
          <span>
            {position.members.length > 0 
              ? `${position.members.length} members in position` 
              : 'No members yet'}
          </span>
        </div>
        
        <div>
          Created: {position.createdAt.toLocaleDateString()}
        </div>
        
        {position.cycledAt && (
          <div>
            Completed: {position.cycledAt.toLocaleDateString()}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-4">
        {!position.cycled && (
          <button 
            onClick={onFill}
            className="button button-primary flex items-center"
            disabled={position.filled >= 3}
          >
            {position.filled >= 3 ? 'Matrix Filled' : 'Simulate Fill'}
          </button>
        )}
        
        <Link 
          to={`/app/matrix/${position.level}`} 
          className="flex items-center text-sm text-primary-600 hover:text-primary-700"
        >
          View Details
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default MatrixCard;