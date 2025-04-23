import React, { createContext, useState, useContext, ReactNode } from 'react';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  sponsor?: string;
  balance: number;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, sponsor?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  updateUser: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching user data
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          joinDate: new Date(parsedUser.joinDate),
        });
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      const storedUserString = localStorage.getItem('user');
      const storedHashedPassword = localStorage.getItem('hashedPassword');

      if (!storedUserString || !storedHashedPassword) {
        console.warn('User not found');
        return false;
      }

      const storedUser = JSON.parse(storedUserString);
      
      if (storedUser.email !== email) {
        console.warn('Email does not match');
        return false;
      }
  
      const isMatch = await bcrypt.compare(password, storedHashedPassword);
  
      if (!isMatch) {
        console.warn('Incorrect password');
        return false;
      }

      const mockUser: User = {
        ...storedUser,
        joinDate: new Date(storedUser.joinDate),
      };

      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string, 
    email: string, 
    password: string, 
    sponsor?: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const mockUser: User = {
        id: Math.random().toString(36).slice(2, 11),
        username,
        email,
        joinDate: new Date(),
        sponsor,
        balance: 0,
      };
      
      // Save hashedPassword separately (normally sent to backend)
      localStorage.setItem('hashedPassword', hashedPassword);
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
