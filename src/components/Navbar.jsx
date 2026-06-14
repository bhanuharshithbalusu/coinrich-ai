import { NavLink } from 'react-router-dom';
import { Search, Sun, Bell, ChevronDown, TrendingUp } from 'lucide-react';
import { user, notifications } from '../data/user';

const NAV_LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/market', label: 'Market' },
  { to: '/screener', label: 'Screener' },
  { to: '/terminal', label: 'Terminal' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/wallets', label: 'Wallets' },
  { to: '/kyc', label: 'KYC' },
  { to: '/settings', label: 'Settings' },
];

export default function Navbar() {
  return (
    <header
      className="h-16 flex items-center px-6 border-b shrink-0"
      style={{ backgroundColor: '#0A0E0C', borderColor: '#1F2722' }}
    >
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2 mr-8 shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#A8E000' }}
        >
          <TrendingUp size={16} color="#0A0E0C" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold tracking-wide">
          <span style={{ color: '#FFFFFF' }}>Coin Rich </span>
          <span style={{ color: '#A8E000' }}>AI</span>
        </span>
      </NavLink>

      {/* Nav links */}
      <nav className="flex items-center gap-1 flex-1">
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              [
                'px-3 py-1.5 text-sm font-medium transition-colors relative',
                isActive
                  ? 'text-[#A8E000]'
                  : 'text-[#8B9890] hover:text-white',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                {label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ backgroundColor: '#A8E000' }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-56"
          style={{ backgroundColor: '#0E1310', border: '1px solid #1F2722' }}
        >
          <Search size={14} style={{ color: '#6B7670' }} />
          <input
            type="text"
            placeholder="Search coins, pairs, or contracts..."
            className="bg-transparent outline-none flex-1 text-xs placeholder-[#6B7670] text-white"
          />
          <kbd
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ backgroundColor: '#1F2722', color: '#6B7670' }}
          >
            /
          </kbd>
        </div>

        {/* Theme toggle */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
          style={{ border: '1px solid #1F2722' }}
        >
          <Sun size={16} style={{ color: '#8B9890' }} />
        </button>

        {/* Notification bell */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors" style={{ border: '1px solid #1F2722' }}>
          <Bell size={16} style={{ color: '#8B9890' }} />
          {notifications.count > 0 && (
            <span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
              style={{ backgroundColor: '#A8E000', color: '#0A0E0C' }}
            >
              {notifications.count}
            </span>
          )}
        </button>

        {/* User menu */}
        <button className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold"
            style={{ backgroundColor: '#1A211C', color: '#A8E000', border: '1px solid #1F2722' }}
          >
            {user.name.charAt(0)}
          </div>
          <div className="text-left leading-tight">
            <div className="text-xs font-medium text-white">{user.name}</div>
            {user.verified && (
              <div className="text-[10px] font-medium" style={{ color: '#A8E000' }}>
                Verified
              </div>
            )}
          </div>
          <ChevronDown size={14} style={{ color: '#6B7670' }} />
        </button>
      </div>
    </header>
  );
}
