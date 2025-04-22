import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { MatrixProvider } from './contexts/MatrixContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import MatrixView from './pages/Matrix/MatrixView';
import Downline from './pages/Downline/Downline';
import Transactions from './pages/Transactions/Transactions';
import Profile from './pages/Profile/Profile';
import LandingPage from './pages/Landing/LandingPage';
import PrivateRoute from './components/Auth/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <UserProvider>
        <MatrixProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/app" element={<Layout />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="matrix/:level" element={
                  <PrivateRoute>
                    <MatrixView />
                  </PrivateRoute>
                } />
                <Route path="downline" element={
                  <PrivateRoute>
                    <Downline />
                  </PrivateRoute>
                } />
                <Route path="transactions" element={
                  <PrivateRoute>
                    <Transactions />
                  </PrivateRoute>
                } />
                <Route path="profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
              </Route>
            </Routes>
          </NotificationProvider>
        </MatrixProvider>
      </UserProvider>
    </Router>
  );
}

export default App;