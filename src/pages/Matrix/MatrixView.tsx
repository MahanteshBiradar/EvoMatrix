import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  ChevronRight, 
  ChevronLeft,
  Clock, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useMatrix } from '../../contexts/MatrixContext';
import { useUser } from '../../contexts/UserContext';
import { useNotification } from '../../contexts/NotificationContext';
import MatrixVisualizer from '../../components/Matrix/MatrixVisualizer';

const MatrixView: React.FC = () => {
  const { level } = useParams<{ level: string }>();
  const currentLevel = parseInt(level || '1', 10);
  const { 
    getPositionsByLevel, 
    getLevelName, 
    getLevelAmount,
    getLevelColor,
    createPosition,
    simulateFill,
    matrixLevels
  } = useMatrix();
  const { user } = useUser();
  const { addNotification } = useNotification();
  
  const [creatingPosition, setCreatingPosition] = useState(false);
  
  const positions = getPositionsByLevel(currentLevel);
  const activePositions = positions.filter(p => !p.cycled);
  const completedPositions = positions.filter(p => p.cycled);
  
  const levelName = getLevelName(currentLevel);
  const levelAmount = getLevelAmount(currentLevel);
  const levelColor = getLevelColor(currentLevel);
  
  const hasNextLevel = currentLevel < matrixLevels.length;
  const hasPrevLevel = currentLevel > 1;
  
  const handleCreatePosition = async () => {
    if (!user) return;
    
    if (user.balance < levelAmount) {
      addNotification({
        type: 'error',
        title: 'Insufficient Balance',
        message: `You need $${levelAmount} to create a position at this level.`
      });
      return;
    }
    
    setCreatingPosition(true);
    
    try {
      const success = await createPosition(currentLevel);
      
      if (success) {
        addNotification({
          type: 'success',
          title: 'Position Created',
          message: `You've created a new position at ${levelName} level.`
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Creation Failed',
          message: 'Failed to create the position. Please try again.'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'An error occurred while creating the position.'
      });
    } finally {
      setCreatingPosition(false);
    }
  };
  
  const handlePositionFill = (positionId: string) => {
    simulateFill(positionId);
    
    // Add notification
    addNotification({
      type: 'success',
      title: 'New Matrix Member',
      message: 'A new member has been added to your matrix!'
    });
  };
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/app/dashboard" className="flex items-center text-neutral-600 hover:text-primary-600 mb-4">
          <ArrowLeft size={16} className="mr-1" />
          Back to Dashboard
        </Link>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              {levelName} Level Matrix
            </h1>
            <p className="text-neutral-600">Position value: ${levelAmount.toFixed(2)}</p>
          </div>
          
          <div className="flex items-center">
            {hasPrevLevel && (
              <Link 
                to={`/app/matrix/${currentLevel - 1}`}
                className="p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 mr-2"
              >
                <ChevronLeft size={20} />
              </Link>
            )}
            
            <button
              onClick={handleCreatePosition}
              disabled={creatingPosition || user?.balance < levelAmount}
              className="button button-primary flex items-center"
            >
              {creatingPosition ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              ) : (
                <Plus size={16} className="mr-2" />
              )}
              Create New Position
            </button>
            
            {hasNextLevel && (
              <Link 
                to={`/app/matrix/${currentLevel + 1}`}
                className="p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 ml-2"
              >
                <ChevronRight size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div 
            className="px-4 py-2 rounded-full text-sm font-medium"
            style={{ backgroundColor: `${levelColor}20`, color: levelColor }}
          >
            Active: {activePositions.length}
          </div>
          <div className="mx-2 text-neutral-300">|</div>
          <div className="flex items-center text-success text-sm font-medium">
            <CheckCircle size={16} className="mr-1" />
            Completed: {completedPositions.length}
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Level Information</h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-neutral-600">Level Name:</span>
                  <span className="font-medium">{levelName}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-600">Position Cost:</span>
                  <span className="font-medium">${levelAmount.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-600">Required Members:</span>
                  <span className="font-medium">3</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-600">Profit Per Cycle:</span>
                  <span className="font-medium">${levelAmount.toFixed(2)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-neutral-600">Your Balance:</span>
                  <span className="font-medium">${user?.balance.toFixed(2) || '0.00'}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">How It Works</h3>
              <ol className="space-y-3 text-neutral-600">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-medium mr-2">
                    1
                  </span>
                  Create a position at this level for ${levelAmount.toFixed(2)}
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-medium mr-2">
                    2
                  </span>
                  Wait for 3 members to fill your matrix
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-medium mr-2">
                    3
                  </span>
                  When your matrix is full, it cycles and you earn ${levelAmount.toFixed(2)}
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary-100 text-primary-700 text-xs font-medium mr-2">
                    4
                  </span>
                  Use your earnings to purchase positions at higher levels
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">
          Active Positions ({activePositions.length})
        </h2>
        
        {activePositions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activePositions.map((position) => (
              <MatrixVisualizer
                key={position.id}
                position={position}
                levelColor={levelColor}
                onFill={() => handlePositionFill(position.id)}
              />
            ))}
          </div>
        ) : (
          <div className="card flex items-center">
            <AlertCircle size={24} className="text-warning mr-4" />
            <div>
              <div className="font-medium text-neutral-800">No active positions</div>
              <p className="text-sm text-neutral-600">
                You don't have any active positions at this level. Create one to get started.
              </p>
            </div>
          </div>
        )}
      </div>
      
      {completedPositions.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">
            Completed Positions ({completedPositions.length})
          </h2>
          
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Position ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Completed Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {completedPositions.map((position) => (
                    <tr key={position.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                        {position.id.substring(0, 8)}...
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {position.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {position.cycledAt?.toLocaleDateString() || '-'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                        {position.members.length}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-success">
                        +${position.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                          <CheckCircle size={12} className="mr-1" />
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixView;