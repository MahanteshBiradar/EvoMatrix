import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, ArrowUp, AlertCircle, PlusCircle } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useMatrix } from '../../contexts/MatrixContext';
import { useNotification } from '../../contexts/NotificationContext';
import MatrixCard from '../../components/Matrix/MatrixCard';
import MatrixLevelList from '../../components/Matrix/MatrixLevelList';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const { 
    activePositions, 
    historicalPositions, 
    totalEarnings, 
    pendingEarnings,
    getLevelName,
    getLevelColor,
    simulateFill
  } = useMatrix();
  const { addNotification } = useNotification();
  
  // Welcome message when a user logs in
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome && user) {
      // Add a welcome notification
      addNotification({
        type: 'info',
        title: 'Welcome to your dashboard!',
        message: 'Here you can manage your matrix positions and track your progress.'
      });
      
      localStorage.setItem('hasSeenWelcome', 'true');
    }
  }, [user, addNotification]);
  
  const recentPositions = activePositions
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);
  
  const completedPositions = historicalPositions
    .sort((a, b) => (b.cycledAt?.getTime() || 0) - (a.cycledAt?.getTime() || 0))
    .slice(0, 3);
  
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
        <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600">Welcome back, {user?.username}!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-700 text-white">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-white bg-opacity-20 mr-4">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="text-sm text-white text-opacity-80">Total Earnings</div>
              <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="mt-4 border-t border-white border-opacity-20 pt-4">
            <div className="flex items-center text-sm">
              <div className="flex-1">Pending earnings</div>
              <div className="font-medium">${pendingEarnings.toFixed(2)}</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-500 bg-opacity-10 text-secondary-500 mr-4">
              <Users size={24} />
            </div>
            <div>
              <div className="text-sm text-neutral-600">Active Positions</div>
              <div className="text-2xl font-bold text-neutral-900">{activePositions.length}</div>
            </div>
          </div>
          
          <div className="mt-4 border-t border-neutral-200 pt-4">
            <div className="flex items-center text-sm">
              <div className="flex-1">Completed positions</div>
              <div className="font-medium">{historicalPositions.length}</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-400 bg-opacity-10 text-accent-500 mr-4">
              <ArrowUp size={24} />
            </div>
            <div>
              <div className="text-sm text-neutral-600">Available Balance</div>
              <div className="text-2xl font-bold text-neutral-900">${user?.balance.toFixed(2) || '0.00'}</div>
            </div>
          </div>
          
          <div className="mt-4 border-t border-neutral-200 pt-4">
            <Link to="/app/transactions" className="text-sm text-primary-600 hover:text-primary-700">
              View transaction history
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-800">Active Matrix Positions</h2>
            <Link 
              to="/app/matrix/1" 
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              View all positions
            </Link>
          </div>
          
          {activePositions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPositions.map((position) => (
                <MatrixCard
                  key={position.id}
                  position={position}
                  levelName={getLevelName(position.level)}
                  levelColor={getLevelColor(position.level)}
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
                  You don't have any active matrix positions yet. Create one to get started.
                </p>
              </div>
            </div>
          )}
          
          {activePositions.length > 0 && (
            <div className="mt-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-800">Recently Completed</h2>
              </div>
              
              {completedPositions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {completedPositions.map((position) => (
                    <MatrixCard
                      key={position.id}
                      position={position}
                      levelName={getLevelName(position.level)}
                      levelColor={getLevelColor(position.level)}
                      onFill={() => {}}
                    />
                  ))}
                </div>
              ) : (
                <div className="card">
                  <p className="text-neutral-600">
                    You haven't completed any matrix positions yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-800">Matrix Levels</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
              <PlusCircle size={16} className="mr-1" />
              Create New
            </button>
          </div>
          
          <MatrixLevelList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;