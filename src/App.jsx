import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { CoinIconsProvider } from './context/CoinIconsContext';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import Screener from './pages/Screener';
import Terminal from './pages/Terminal';
import Portfolio from './pages/Portfolio';
import Wallets from './pages/Wallets';
import KYC from './pages/KYC';
import Settings from './pages/Settings';

export default function App() {
  return (
    <CoinIconsProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="market" element={<Market />} />
          <Route path="screener" element={<Screener />} />
          <Route path="terminal" element={<Terminal />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="wallets" element={<Wallets />} />
          <Route path="kyc" element={<KYC />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CoinIconsProvider>
  );
}
