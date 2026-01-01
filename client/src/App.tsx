import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import LandingPage from './pages/LandingPage'; // <--- New Import
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import WalletPage from './pages/WalletPage';
import SettingsPage from './pages/SettingsPage';
import SimulatorPage from './pages/SimulatorPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CurrencyProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} /> {/* Default Home */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Dashboard Area */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="simulator" element={<SimulatorPage />} />
                <Route path="transactions" element={<TransactionsPage />} />
                <Route path="wallet" element={<WalletPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>

            {/* Default Redirect (Go to Landing if route not found) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CurrencyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;