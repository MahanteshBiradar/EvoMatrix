import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register } = useUser();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Please fill out all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      const success = await register(username, email, password, sponsor);
      
      if (success) {
        navigate('/app/dashboard');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration');
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
              <h1 className="text-2xl font-bold text-neutral-900">Create Your Account</h1>
              <p className="text-neutral-600 mt-2">Join the 1x3 Matrix program and start earning</p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-error bg-opacity-10 text-error text-sm rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  required
                  className="mt-1"
                />
              </div>
              
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
                  placeholder="Create a password"
                  required
                  className="mt-1"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="mt-1"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sponsor">Sponsor ID (Optional)</label>
                <input
                  id="sponsor"
                  type="text"
                  value={sponsor}
                  onChange={(e) => setSponsor(e.target.value)}
                  placeholder="Enter your sponsor's ID"
                  className="mt-1"
                />
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary-600 border-neutral-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-neutral-600">
                    I agree to the{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>
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
                    <UserPlus size={18} className="mr-2" />
                    Create Account
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;