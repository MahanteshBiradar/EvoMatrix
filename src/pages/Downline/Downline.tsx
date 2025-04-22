import React, { useState } from 'react';
import { Users, Search, UserPlus, ChevronDown, ChevronRight } from 'lucide-react';
import { useMatrix } from '../../contexts/MatrixContext';
import { useUser } from '../../contexts/UserContext';
import { useNotification } from '../../contexts/NotificationContext';

// Mock downline data for demonstration
const MOCK_DOWNLINE = [
  {
    id: 'user1',
    name: 'John Smith',
    email: 'john@example.com',
    level: 3,
    joined: new Date(2023, 2, 15),
    active: true,
    earnings: 234,
    referrals: 4,
    children: [
      {
        id: 'user4',
        name: 'Michael Brown',
        email: 'michael@example.com',
        level: 2,
        joined: new Date(2023, 4, 10),
        active: true,
        earnings: 96,
        referrals: 2,
        children: [],
      },
      {
        id: 'user5',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        level: 1,
        joined: new Date(2023, 5, 20),
        active: true,
        earnings: 24,
        referrals: 0,
        children: [],
      },
    ],
  },
  {
    id: 'user2',
    name: 'Emma Davis',
    email: 'emma@example.com',
    level: 2,
    joined: new Date(2023, 3, 5),
    active: true,
    earnings: 156,
    referrals: 3,
    children: [
      {
        id: 'user6',
        name: 'David Wilson',
        email: 'david@example.com',
        level: 1,
        joined: new Date(2023, 6, 12),
        active: false,
        earnings: 12,
        referrals: 0,
        children: [],
      },
    ],
  },
  {
    id: 'user3',
    name: 'Robert Taylor',
    email: 'robert@example.com',
    level: 1,
    joined: new Date(2023, 4, 25),
    active: false,
    earnings: 42,
    referrals: 1,
    children: [],
  },
];

interface DownlineMember {
  id: string;
  name: string;
  email: string;
  level: number;
  joined: Date;
  active: boolean;
  earnings: number;
  referrals: number;
  children: DownlineMember[];
}

const Downline: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUsers, setExpandedUsers] = useState<string[]>([]);
  const { matrixLevels } = useMatrix();
  const { addNotification } = useNotification();
  
  // For demo, we'll use the mock data
  const downlineMembers = MOCK_DOWNLINE;
  
  const toggleExpand = (userId: string) => {
    setExpandedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };
  
  const isExpanded = (userId: string) => expandedUsers.includes(userId);
  
  const handleInvite = () => {
    // Generate a random referral code for demo
    const referralCode = Math.random().toString(36).substring(2, 10);
    
    // Copy to clipboard
    navigator.clipboard.writeText(`https://1x3matrix.com/register?ref=${referralCode}`);
    
    // Show notification
    addNotification({
      type: 'success',
      title: 'Referral Link Copied',
      message: 'Your referral link has been copied to clipboard!'
    });
  };
  
  // Recursive function to render the downline tree
  const renderDownlineTree = (members: DownlineMember[], level = 0) => {
    if (!members.length) return null;
    
    return members
      .filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(member => (
        <React.Fragment key={member.id}>
          <tr className={`hover:bg-neutral-50 ${level > 0 ? 'bg-neutral-50' : ''}`}>
            <td className="px-4 py-4 whitespace-nowrap">
              <div 
                className="flex items-center"
                style={{ paddingLeft: `${level * 2}rem` }}
              >
                {member.children.length > 0 ? (
                  <button
                    onClick={() => toggleExpand(member.id)}
                    className="p-1 rounded-md text-neutral-500 hover:text-primary-600 hover:bg-neutral-100 mr-2"
                  >
                    {isExpanded(member.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                ) : (
                  <div className="w-6 mr-2"></div>
                )}
                
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold mr-3">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">{member.name}</div>
                    <div className="text-sm text-neutral-500">{member.email}</div>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
              {matrixLevels[member.level - 1]?.name || `Level ${member.level}`}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
              {member.joined.toLocaleDateString()}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
              {member.active ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-200 text-neutral-600">
                  Inactive
                </span>
              )}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
              ${member.earnings.toFixed(2)}
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
              {member.referrals}
            </td>
          </tr>
          
          {isExpanded(member.id) && member.children.length > 0 && (
            renderDownlineTree(member.children, level + 1)
          )}
        </React.Fragment>
      ));
  };
  
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Downline</h1>
          <p className="text-neutral-600">Manage and view your referral network</p>
        </div>
        
        <button
          onClick={handleInvite}
          className="button button-primary flex items-center"
        >
          <UserPlus size={16} className="mr-2" />
          Invite New Members
        </button>
      </div>
      
      <div className="card mb-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-4">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Downline Summary</h3>
              <p className="text-neutral-600">Total members: {downlineMembers.length}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-neutral-600">Total Active</div>
              <div className="text-xl font-semibold text-neutral-900">
                {downlineMembers.filter(m => m.active).length}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-neutral-600">Total Earnings</div>
              <div className="text-xl font-semibold text-neutral-900">
                ${downlineMembers.reduce((sum, m) => sum + m.earnings, 0).toFixed(2)}
              </div>
            </div>
            
            <div>
              <div className="text-sm text-neutral-600">Total Referrals</div>
              <div className="text-xl font-semibold text-neutral-900">
                {downlineMembers.reduce((sum, m) => sum + m.referrals, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card mb-6">
        <div className="mb-6 flex items-center">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search members by name or email"
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Member
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Earnings
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Referrals
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {renderDownlineTree(downlineMembers)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Downline;