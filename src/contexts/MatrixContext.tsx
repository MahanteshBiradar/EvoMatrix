import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useUser } from './UserContext';

export interface MatrixPosition {
  id: string;
  level: number;
  amount: number;
  filled: number; // 0, 1, 2, or 3 spots filled
  cycled: boolean;
  members: string[]; // IDs of members in the position
  createdAt: Date;
  cycledAt?: Date;
}

export interface MatrixLevel {
  level: number;
  name: string;
  amount: number;
  color: string;
  positions: MatrixPosition[];
}

interface MatrixContextType {
  matrixLevels: MatrixLevel[];
  activePositions: MatrixPosition[];
  historicalPositions: MatrixPosition[];
  totalEarnings: number;
  pendingEarnings: number;
  createPosition: (level: number) => Promise<boolean>;
  getPositionsByLevel: (level: number) => MatrixPosition[];
  getLevelName: (level: number) => string;
  getLevelAmount: (level: number) => number;
  getLevelColor: (level: number) => string;
  simulateFill: (positionId: string) => void;
}

const MatrixContext = createContext<MatrixContextType>({
  matrixLevels: [],
  activePositions: [],
  historicalPositions: [],
  totalEarnings: 0,
  pendingEarnings: 0,
  createPosition: async () => false,
  getPositionsByLevel: () => [],
  getLevelName: () => '',
  getLevelAmount: () => 0,
  getLevelColor: () => '',
  simulateFill: () => {},
});

export const useMatrix = () => useContext(MatrixContext);

interface MatrixProviderProps {
  children: ReactNode;
}

// Define the matrix levels with doubling amounts
const MATRIX_LEVELS: Omit<MatrixLevel, 'positions'>[] = [
  { level: 1, name: 'Starter', amount: 3, color: '#6366f1' },
  { level: 2, name: 'Bronze', amount: 6, color: '#a5b4fc' },
  { level: 3, name: 'Silver', amount: 12, color: '#94a3b8' },
  { level: 4, name: 'Gold', amount: 24, color: '#fbbf24' },
  { level: 5, name: 'Platinum', amount: 48, color: '#d1d5db' },
  { level: 6, name: 'Ruby', amount: 96, color: '#ef4444' },
  { level: 7, name: 'Emerald', amount: 192, color: '#10b981' },
  { level: 8, name: 'Sapphire', amount: 384, color: '#3b82f6' },
  { level: 9, name: 'Diamond', amount: 768, color: '#a5f3fc' },
  { level: 10, name: 'Double Diamond', amount: 1536, color: '#38bdf8' },
  { level: 11, name: 'Triple Diamond', amount: 3072, color: '#2563eb' },
  { level: 12, name: 'Royal Diamond', amount: 6144, color: '#4338ca' },
  { level: 13, name: 'Black Diamond', amount: 12288, color: '#1e293b' },
  { level: 14, name: 'Double Black Diamond', amount: 24576, color: '#0f172a' },
  { level: 15, name: 'Crown Diamond', amount: 49152, color: '#fcd34d' },
];

export const MatrixProvider: React.FC<MatrixProviderProps> = ({ children }) => {
  const { user, updateUser } = useUser();
  const [matrixLevels, setMatrixLevels] = useState<MatrixLevel[]>(
    MATRIX_LEVELS.map(level => ({ ...level, positions: [] }))
  );
  const [activePositions, setActivePositions] = useState<MatrixPosition[]>([]);
  const [historicalPositions, setHistoricalPositions] = useState<MatrixPosition[]>([]);
  
  // Load mock data for demo
  useEffect(() => {
    if (user) {
      // Load from localStorage if available
      const storedPositions = localStorage.getItem('matrixPositions');
      
      if (storedPositions) {
        try {
          const parsed = JSON.parse(storedPositions);
          
          // Convert string dates to Date objects
          const positions = parsed.map((pos: any) => ({
            ...pos,
            createdAt: new Date(pos.createdAt),
            cycledAt: pos.cycledAt ? new Date(pos.cycledAt) : undefined
          }));
          
          const active = positions.filter((p: MatrixPosition) => !p.cycled);
          const historical = positions.filter((p: MatrixPosition) => p.cycled);
          
          setActivePositions(active);
          setHistoricalPositions(historical);
          
          // Update matrixLevels with positions
          const updatedLevels = [...matrixLevels];
          positions.forEach((position: MatrixPosition) => {
            const levelIndex = position.level - 1;
            if (updatedLevels[levelIndex]) {
              updatedLevels[levelIndex].positions = [
                ...(updatedLevels[levelIndex].positions || []),
                position
              ];
            }
          });
          
          setMatrixLevels(updatedLevels);
        } catch (error) {
          console.error('Failed to parse stored matrix positions', error);
          localStorage.removeItem('matrixPositions');
          
          // Create initial position if none exists
          createInitialPosition();
        }
      } else {
        // Create initial position if none exists
        createInitialPosition();
      }
    }
  }, [user]);

  const createInitialPosition = async () => {
    if (user) {
      const initialPosition: MatrixPosition = {
        id: Math.random().toString(36).substr(2, 9),
        level: 1,
        amount: MATRIX_LEVELS[0].amount,
        filled: 0,
        cycled: false,
        members: [],
        createdAt: new Date(),
      };
      
      setActivePositions([initialPosition]);
      
      const updatedLevels = [...matrixLevels];
      updatedLevels[0].positions = [initialPosition];
      setMatrixLevels(updatedLevels);
      
      localStorage.setItem('matrixPositions', JSON.stringify([initialPosition]));
      
      // Update user balance
      if (user.balance >= 3) {
        updateUser({ balance: user.balance - 3 });
      } else {
        // Give them a starting balance for demo purposes
        updateUser({ balance: 10 });
      }
    }
  };

  const createPosition = async (level: number): Promise<boolean> => {
    if (!user) return false;
    
    const levelInfo = MATRIX_LEVELS.find(l => l.level === level);
    if (!levelInfo) return false;
    
    // Check if user has enough balance
    if (user.balance < levelInfo.amount) return false;
    
    const newPosition: MatrixPosition = {
      id: Math.random().toString(36).substr(2, 9),
      level,
      amount: levelInfo.amount,
      filled: 0,
      cycled: false,
      members: [],
      createdAt: new Date(),
    };
    
    // Update active positions
    const updatedActive = [...activePositions, newPosition];
    setActivePositions(updatedActive);
    
    // Update matrix levels
    const updatedLevels = [...matrixLevels];
    updatedLevels[level - 1].positions = [
      ...(updatedLevels[level - 1].positions || []),
      newPosition
    ];
    setMatrixLevels(updatedLevels);
    
    // Update localStorage
    const allPositions = [...updatedActive, ...historicalPositions];
    localStorage.setItem('matrixPositions', JSON.stringify(allPositions));
    
    // Update user balance
    updateUser({ balance: user.balance - levelInfo.amount });
    
    return true;
  };

  const simulateFill = (positionId: string) => {
    // Find the position
    const positionIndex = activePositions.findIndex(p => p.id === positionId);
    if (positionIndex === -1) return;
    
    const position = { ...activePositions[positionIndex] };
    
    // If already cycled, do nothing
    if (position.cycled) return;
    
    // Add a new member (simulate)
    position.filled += 1;
    position.members.push(`member-${Math.random().toString(36).substr(2, 5)}`);
    
    // Check if fully filled (cycled)
    if (position.filled >= 3) {
      position.cycled = true;
      position.cycledAt = new Date();
      
      // Move to historical positions
      const updatedActive = activePositions.filter(p => p.id !== positionId);
      setActivePositions(updatedActive);
      setHistoricalPositions([...historicalPositions, position]);
      
      // Update user balance with earnings from the cycle
      updateUser({ balance: (user?.balance || 0) + position.amount });
      
      // Update the matrix levels
      const levelIndex = position.level - 1;
      if (matrixLevels[levelIndex]) {
        const updatedLevel = { ...matrixLevels[levelIndex] };
        updatedLevel.positions = updatedLevel.positions.map(p => 
          p.id === position.id ? position : p
        );
        
        const updatedLevels = [...matrixLevels];
        updatedLevels[levelIndex] = updatedLevel;
        setMatrixLevels(updatedLevels);
      }
    } else {
      // Just update the position
      const updatedActive = [...activePositions];
      updatedActive[positionIndex] = position;
      setActivePositions(updatedActive);
      
      // Update the matrix level
      const levelIndex = position.level - 1;
      if (matrixLevels[levelIndex]) {
        const updatedLevel = { ...matrixLevels[levelIndex] };
        updatedLevel.positions = updatedLevel.positions.map(p => 
          p.id === position.id ? position : p
        );
        
        const updatedLevels = [...matrixLevels];
        updatedLevels[levelIndex] = updatedLevel;
        setMatrixLevels(updatedLevels);
      }
    }
    
    // Update localStorage
    const allPositions = [...activePositions, ...historicalPositions];
    localStorage.setItem('matrixPositions', JSON.stringify(allPositions));
  };

  const getPositionsByLevel = (level: number): MatrixPosition[] => {
    const levelIndex = level - 1;
    if (!matrixLevels[levelIndex]) return [];
    
    return matrixLevels[levelIndex].positions || [];
  };

  const getLevelName = (level: number): string => {
    const levelInfo = MATRIX_LEVELS.find(l => l.level === level);
    return levelInfo?.name || `Level ${level}`;
  };

  const getLevelAmount = (level: number): number => {
    const levelInfo = MATRIX_LEVELS.find(l => l.level === level);
    return levelInfo?.amount || 0;
  };

  const getLevelColor = (level: number): string => {
    const levelInfo = MATRIX_LEVELS.find(l => l.level === level);
    return levelInfo?.color || '#6366f1';
  };

  // Calculate total and pending earnings
  const totalEarnings = historicalPositions.reduce(
    (sum, pos) => sum + pos.amount,
    0
  );
  
  const pendingEarnings = activePositions.reduce(
    (sum, pos) => sum + (pos.amount * pos.filled / 3),
    0
  );

  return (
    <MatrixContext.Provider
      value={{
        matrixLevels,
        activePositions,
        historicalPositions,
        totalEarnings,
        pendingEarnings,
        createPosition,
        getPositionsByLevel,
        getLevelName,
        getLevelAmount,
        getLevelColor,
        simulateFill,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
};