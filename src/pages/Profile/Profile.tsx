import React, { useState } from 'react';
import { Save, User, Mail, Lock, AtSign, CreditCard } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useNotification } from '../../contexts/NotificationContext';

const Profile: React.FC = () => {
  const { user, updateUser } = useUser();
  const { addNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update user profile
      updateUser({
        username: formData.username,
        email: formData.email,
      });
      
      // Add notification
      addNotification({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been successfully updated.'
      });
      
      setIsSaving(false);
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }, 1000);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      addNotification({
        type: 'error',
        title: 'Password Mismatch',
        message: 'New password and confirmation do not match.'
      });
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add notification
      addNotification({
        type: 'success',
        title: 'Password Updated',
        message: 'Your password has been successfully updated.'
      });
      
      setIsSaving(false);
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }, 1000);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Profile Settings</h1>
        <p className="text-neutral-600">Manage your account information and security</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <h2 className="text-lg font-semibold text-neutral-800 mb-6">Account Information</h2>
            
            <form onSubmit={handleProfileUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={16} className="text-neutral-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Your username"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={16} className="text-neutral-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Your email address"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="button button-primary flex items-center"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save size={16} className="mr-2" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
          
          <div className="card mb-8">
            <h2 className="text-lg font-semibold text-neutral-800 mb-6">Change Password</h2>
            
            <form onSubmit={handlePasswordUpdate}>
              <div className="grid grid-cols-1 gap-6 mb-6">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={16} className="text-neutral-400" />
                    </div>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={16} className="text-neutral-400" />
                      </div>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={16} className="text-neutral-400" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="button button-primary flex items-center"
                >
                  {isSaving ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save size={16} className="mr-2" />
                  )}
                  Update Password
                </button>
              </div>
            </form>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-semibold text-neutral-800 mb-6">Payment Methods</h2>
            
            <p className="text-neutral-600 mb-4">
              Add a payment method to purchase matrix positions or withdraw earnings.
            </p>
            
            <button className="button button-outline flex items-center">
              <CreditCard size={16} className="mr-2" />
              Add Payment Method
            </button>
          </div>
        </div>
        
        <div>
          <div className="card mb-6">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-primary-100 mx-auto flex items-center justify-center text-primary-700 text-3xl font-semibold mb-4">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              
              <h3 className="text-lg font-semibold text-neutral-900">
                {user?.username || 'User'}
              </h3>
              <p className="text-neutral-600">Member since {user?.joinDate.toLocaleDateString()}</p>
              
              <button className="mt-4 button button-outline w-full">
                Change Profile Picture
              </button>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Account Details</h3>
            
            <ul className="space-y-4">
              <li className="flex items-center">
                <AtSign size={18} className="text-neutral-500 mr-3" />
                <div>
                  <div className="text-sm text-neutral-600">Your ID</div>
                  <div className="font-medium">{user?.id}</div>
                </div>
              </li>
              
              <li className="flex items-center">
                <Mail size={18} className="text-neutral-500 mr-3" />
                <div>
                  <div className="text-sm text-neutral-600">Email</div>
                  <div className="font-medium">{user?.email}</div>
                </div>
              </li>
              
              {user?.sponsor && (
                <li className="flex items-center">
                  <User size={18} className="text-neutral-500 mr-3" />
                  <div>
                    <div className="text-sm text-neutral-600">Sponsor</div>
                    <div className="font-medium">{user.sponsor}</div>
                  </div>
                </li>
              )}
            </ul>
            
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="text-sm text-neutral-600 mb-2">Referral Link</div>
              <div className="flex items-center">
                <input
                  type="text"
                  value={`https://1x3matrix.com/register?ref=${user?.id}`}
                  readOnly
                  className="text-xs text-neutral-500 bg-neutral-50"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://1x3matrix.com/register?ref=${user?.id}`);
                    addNotification({
                      type: 'success',
                      title: 'Copied!',
                      message: 'Referral link copied to clipboard.'
                    });
                  }}
                  className="ml-2 button button-outline text-xs py-2"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;