import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import FloatingAIButton from './FloatingAIButton';

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#0A0E0C' }}>
      <Navbar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
      <FloatingAIButton />
    </div>
  );
}
