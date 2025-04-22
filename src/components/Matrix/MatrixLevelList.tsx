import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { useMatrix } from '../../contexts/MatrixContext';

const MatrixLevelList: React.FC = () => {
  const { matrixLevels, getPositionsByLevel } = useMatrix();
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-800">Matrix Levels</h3>
      </div>
      
      <div className="divide-y divide-neutral-200">
        {matrixLevels.map((level) => {
          const positions = getPositionsByLevel(level.level);
          const activePositions = positions.filter(p => !p.cycled).length;
          const completedPositions = positions.filter(p => p.cycled).length;
          const hasPositions = positions.length > 0;
          
          return (
            <Link
              key={level.level}
              to={`/app/matrix/${level.level}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                  style={{ backgroundColor: `${level.color}20`, color: level.color }}
                >
                  <TrendingUp size={20} />
                </div>
                
                <div>
                  <div className="text-sm font-medium text-neutral-900">{level.name}</div>
                  <div className="text-xs text-neutral-500">${level.amount.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                {hasPositions ? (
                  <div className="text-right mr-4">
                    <div className="text-sm font-medium text-neutral-900">
                      {activePositions > 0 ? `${activePositions} Active` : 'No Active'}
                    </div>
                    {completedPositions > 0 && (
                      <div className="text-xs text-success">
                        {completedPositions} Completed
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-xs text-neutral-500 mr-4">No positions yet</div>
                )}
                
                <ChevronRight size={16} className="text-neutral-400" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MatrixLevelList;