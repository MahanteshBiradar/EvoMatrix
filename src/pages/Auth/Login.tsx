import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useUser();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/app/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-neutral-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">1x3</span>
            <span className="text-2xl font-bold text-neutral-800">Matrix</span>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-neutral-900">Welcome Back</h1>
              <p className="text-neutral-600 mt-2">Sign in to access your 1x3 Matrix account</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-error bg-opacity-10 text-error text-sm rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="mt-1"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-neutral-600">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full button button-primary py-3 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn size={18} className="mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;