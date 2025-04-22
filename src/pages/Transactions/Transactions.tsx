import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Filter, Download, Search } from 'lucide-react';
import { useMatrix } from '../../contexts/MatrixContext';

// Mock transaction data for demonstration
const MOCK_TRANSACTIONS = [
  {
    id: 'tx1',
    type: 'purchase',
    amount: -3,
    description: 'Level 1 Matrix Purchase',
    matrixLevel: 1,
    date: new Date(2023, 5, 1),
  },
  {
    id: 'tx2',
    type: 'earning',
    amount: 3,
    description: 'Level 1 Matrix Cycle Earnings',
    matrixLevel: 1,
    date: new Date(2023, 5, 5),
  },
  {
    id: 'tx3',
    type: 'purchase',
    amount: -6,
    description: 'Level 2 Matrix Purchase',
    matrixLevel: 2,
    date: new Date(2023, 5, 5),
  },
  {
    id: 'tx4',
    type: 'purchase',
    amount: -3,
    description: 'Level 1 Matrix Purchase',
    matrixLevel: 1,
    date: new Date(2023, 5, 10),
  },
  {
    id: 'tx5',
    type: 'earning',
    amount: 6,
    description: 'Level 2 Matrix Cycle Earnings',
    matrixLevel: 2,
    date: new Date(2023, 5, 15),
  },
  {
    id: 'tx6',
    type: 'earning',
    amount: 3,
    description: 'Level 1 Pass-Up Bonus',
    matrixLevel: 1,
    date: new Date(2023, 5, 20),
  },
  {
    id: 'tx7',
    type: 'purchase',
    amount: -12,
    description: 'Level 3 Matrix Purchase',
    matrixLevel: 3,
    date: new Date(2023, 5, 20),
  },
  {
    id: 'tx8',
    type: 'referral',
    amount: 1.5,
    description: 'Referral Bonus',
    matrixLevel: null,
    date: new Date(2023, 5, 25),
  },
  {
    id: 'tx9',
    type: 'earning',
    amount: 3,
    description: 'Level 1 Matrix Cycle Earnings',
    matrixLevel: 1,
    date: new Date(2023, 6, 1),
  },
  {
    id: 'tx10',
    type: 'earning',
    amount: 12,
    description: 'Level 3 Matrix Cycle Earnings',
    matrixLevel: 3,
    date: new Date(2023, 6, 10),
  },
];

interface Transaction {
  id: string;
  type: 'purchase' | 'earning' | 'referral';
  amount: number;
  description: string;
  matrixLevel: number | null;
  date: Date;
}

const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const { matrixLevels } = useMatrix();
  
  // For demo, we'll use the mock data
  const transactions = MOCK_TRANSACTIONS;
  
  // Filter transactions based on search and filter type
  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'earnings' && tx.amount > 0) return matchesSearch;
    if (filterType === 'purchases' && tx.amount < 0) return matchesSearch;
    if (filterType === 'referrals' && tx.type === 'referral') return matchesSearch;
    
    return false;
  });
  
  // Calculate totals
  const totalIncome = transactions
    .filter(tx => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalSpent = Math.abs(transactions
    .filter(tx => tx.amount < 0)
    .reduce((sum, tx) => sum + tx.amount, 0));
    
  const netBalance = totalIncome - totalSpent;
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Transactions</h1>
        <p className="text-neutral-600">Track your earnings and purchases</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success bg-opacity-10 text-success mr-4">
              <ArrowDown size={24} />
            </div>
            <div>
              <div className="text-sm text-neutral-600">Total Income</div>
              <div className="text-2xl font-bold text-neutral-900">${totalIncome.toFixed(2)}</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-error bg-opacity-10 text-error mr-4">
              <ArrowUp size={24} />
            </div>
            <div>
              <div className="text-sm text-neutral-600">Total Spent</div>
              <div className="text-2xl font-bold text-neutral-900">${totalSpent.toFixed(2)}</div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-700 mr-4">
              <Download size={24} />
            </div>
            <div>
              <div className="text-sm text-neutral-600">Net Balance</div>
              <div className="text-2xl font-bold text-neutral-900">${netBalance.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search transactions"
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-neutral-500" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="text-sm border-neutral-300 rounded-md"
              >
                <option value="all">All Transactions</option>
                <option value="earnings">Earnings Only</option>
                <option value="purchases">Purchases Only</option>
                <option value="referrals">Referrals Only</option>
              </select>
            </div>
            
            <button className="button button-outline flex items-center text-sm">
              <Download size={14} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Matrix Level
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-neutral-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                    {transaction.date.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm text-neutral-900">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600">
                    {transaction.matrixLevel 
                      ? matrixLevels[transaction.matrixLevel - 1]?.name || `Level ${transaction.matrixLevel}`
                      : '-'
                    }
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {transaction.type === 'purchase' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error bg-opacity-10 text-error">
                        Purchase
                      </span>
                    )}
                    {transaction.type === 'earning' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success bg-opacity-10 text-success">
                        Earning
                      </span>
                    )}
                    {transaction.type === 'referral' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                        Referral
                      </span>
                    )}
                  </td>
                  <td className={`px-4 py-4 whitespace-nowrap text-sm font-medium text-right ${
                    transaction.amount > 0 ? 'text-success' : 'text-error'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-neutral-600">
                    No transactions found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;