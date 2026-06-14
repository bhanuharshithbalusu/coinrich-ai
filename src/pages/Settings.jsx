import { useState } from 'react';
import {
  User, Shield, Bell, Code2,
  Link2, BarChart2, Palette, HelpCircle, Lock, ChevronRight,
} from 'lucide-react';
import SettingsCard from '../components/SettingsCard';
import ToggleSwitch from '../components/ToggleSwitch';
import Modal from '../components/Modal';
import { settings as initialSettings } from '../data/settings';

function ThemeToggle({ value, onChange }) {
  const options = ['Light', 'Dark', 'System'];
  return (
    <div style={{
      display: 'flex',
      backgroundColor: '#0A0E0C',
      borderRadius: 8,
      border: '1px solid #1F2722',
      padding: 2,
      gap: 2,
    }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt.toLowerCase())}
          style={{
            padding: '4px 10px',
            fontSize: '0.78rem',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            backgroundColor: value === opt.toLowerCase() ? '#2A332D' : 'transparent',
            color: value === opt.toLowerCase() ? '#FFFFFF' : '#6B7670',
            borderRadius: 6,
            transition: 'background-color 0.15s',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function ApiKeysStatsBlock({ activeKeys, requests }) {
  return (
    <div style={{
      backgroundColor: '#0A0E0C',
      border: '1px solid #1F2722',
      borderRadius: 8,
      padding: '10px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      marginBottom: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#8B9890', fontSize: '0.8rem' }}>Active Keys</span>
        <span style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 700 }}>{activeKeys}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#8B9890', fontSize: '0.8rem' }}>API Requests (30d)</span>
        <span style={{ color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 700 }}>
          {requests.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function AppearanceCard({ appearance, onThemeChange, onToggle }) {
  return (
    <div style={{
      backgroundColor: '#131815',
      border: '1px solid #1F2722',
      borderRadius: 12,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          backgroundColor: '#1A2E14',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Palette size={18} color="#A8E000" />
        </div>
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>Appearance</div>
          <div style={{ color: '#8B9890', fontSize: '0.78rem', lineHeight: 1.4 }}>
            Customize the look and feel of the platform.
          </div>
        </div>
      </div>

      {[
        {
          label: 'Theme',
          right: <ThemeToggle value={appearance.theme} onChange={onThemeChange} />,
        },
        {
          label: 'Compact Layout',
          right: <ToggleSwitch checked={appearance.compactLayout} onChange={(v) => onToggle('compactLayout', v)} />,
        },
        {
          label: 'Language',
          right: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <span style={{ color: '#8B9890', fontSize: '0.85rem' }}>{appearance.language}</span>
              <ChevronRight size={15} color="#6B7670" />
            </div>
          ),
        },
        {
          label: 'Color Scheme',
          right: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
              <span style={{ color: '#8B9890', fontSize: '0.85rem' }}>{appearance.colorScheme}</span>
              <ChevronRight size={15} color="#6B7670" />
            </div>
          ),
        },
      ].map(({ label, right }, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '9px 0', borderBottom: '1px solid #1F2722',
        }}>
          <span style={{ color: '#FFFFFF', fontSize: '0.85rem' }}>{label}</span>
          {right}
        </div>
      ))}

      <button style={{
        marginTop: 16, width: '100%', padding: '10px 0', borderRadius: 8,
        border: '1px solid #2A332D', backgroundColor: 'transparent',
        color: '#A8E000', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
      }}>
        Save Preferences
      </button>
    </div>
  );
}

function ApiKeysCard({ apiKeys }) {
  return (
    <div style={{
      backgroundColor: '#131815',
      border: '1px solid #1F2722',
      borderRadius: 12,
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          backgroundColor: '#1A2E14',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Code2 size={18} color="#A8E000" />
        </div>
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>API Keys</div>
          <div style={{ color: '#8B9890', fontSize: '0.78rem', lineHeight: 1.4, maxWidth: 180 }}>
            Create and manage API keys to build with Coin Rich AI.
          </div>
        </div>
      </div>

      <ApiKeysStatsBlock activeKeys={apiKeys.activeKeys} requests={apiKeys.requests30d} />

      <button style={{
        width: '100%', padding: '10px 0', borderRadius: 8,
        backgroundColor: '#A8E000', border: 'none',
        color: '#0A0E0C', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
        marginBottom: 10,
      }}>
        Create API Key
      </button>
      <button style={{
        width: '100%', padding: '6px 0', border: 'none',
        backgroundColor: 'transparent',
        color: '#A8E000', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
      }}>
        View All API Keys &rsaquo;
      </button>
    </div>
  );
}

export default function Settings() {
  const [s, setS] = useState(initialSettings);
  const [modal, setModal] = useState(null);
  const openModal = label => setModal(label);
  const closeModal = () => setModal(null);

  function toggleNotification(key, val) {
    setS((prev) => ({ ...prev, notifications: { ...prev.notifications, [key]: val } }));
  }

  function toggleAppearance(key, val) {
    setS((prev) => ({ ...prev, appearance: { ...prev.appearance, [key]: val } }));
  }

  const profileRows = [
    { label: 'Name',         value: s.profile.name,     type: 'text' },
    { label: 'Email',        value: s.profile.email,    type: 'text' },
    { label: 'Phone Number', value: s.profile.phone,    type: 'text' },
    { label: 'Country',      value: s.profile.country,  type: 'text' },
    { label: 'Timezone',     value: s.profile.timezone, type: 'text' },
  ];

  const securityRows = [
    { label: 'Change Password',           type: 'chevron' },
    { label: 'Two-Factor Authentication', value: s.security.twoFactorEnabled ? 'Enabled' : 'Disabled', type: 'badge' },
    { label: 'Passkeys',         value: `${s.security.passkeysActive} Active`,  type: 'badge' },
    { label: 'Active Sessions',  value: `${s.security.activeSessions} Devices`, type: 'badge' },
    { label: 'Device Management', type: 'chevron' },
  ];

  const notificationRows = [
    { label: 'Price Alerts',        key: 'priceAlerts',        value: s.notifications.priceAlerts,        type: 'toggle' },
    { label: 'Trade Executions',    key: 'tradeExecutions',    value: s.notifications.tradeExecutions,    type: 'toggle' },
    { label: 'Portfolio Alerts',    key: 'portfolioAlerts',    value: s.notifications.portfolioAlerts,    type: 'toggle' },
    { label: 'Email Notifications', key: 'emailNotifications', value: s.notifications.emailNotifications, type: 'toggle' },
    { label: 'Push Notifications',  key: 'pushNotifications',  value: s.notifications.pushNotifications,  type: 'toggle' },
  ];

  const connectedAccountRows = s.connectedAccounts.map((acc) => {
    if (acc.provider === 'Wallet Connections') {
      return { label: acc.provider, value: `${acc.walletCount} Connected`, type: 'badge' };
    }
    return {
      label: acc.provider,
      value: acc.connected ? 'Connected' : 'Not Connected',
      type: acc.connected ? 'badge' : 'chevron',
    };
  });

  const tradingRows = [
    { label: 'Default Currency',     value: s.tradingPreferences.defaultCurrency,                               type: 'text' },
    { label: 'Default Trading Pair', value: s.tradingPreferences.defaultTradingPair,                            type: 'text' },
    { label: 'Chart Preferences',    type: 'chevron' },
    { label: 'Risk Warnings',        value: s.tradingPreferences.riskWarnings ? 'Enabled' : 'Disabled',        type: 'badge' },
    { label: 'Order Confirmations',  value: s.tradingPreferences.orderConfirmations ? 'Enabled' : 'Disabled',  type: 'badge' },
  ];

  const supportRows = [
    { label: 'Help Center',      type: 'chevron' },
    { label: 'Contact Support',  type: 'chevron' },
    { label: 'Privacy Policy',   type: 'chevron' },
    { label: 'Terms of Service', type: 'chevron' },
    { label: 'Delete Account',   type: 'link', danger: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 2×4 grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <SettingsCard
          icon={User}
          title="Profile"
          description="Manage your personal information and account details."
          rows={profileRows}
          ctaLabel="Edit Profile"
          onCtaClick={() => openModal('Edit Profile')}
          onRowClick={openModal}
        />

        <SettingsCard
          icon={Shield}
          title="Security"
          description="Secure your account and manage access."
          rows={securityRows}
          ctaLabel="Manage Security"
          onCtaClick={() => openModal('Manage Security')}
          onRowClick={openModal}
        />

        <SettingsCard
          icon={Bell}
          title="Notifications"
          description="Customize how and when you're notified."
          rows={notificationRows}
          onToggle={toggleNotification}
          ctaLabel="Manage Notifications"
          onCtaClick={() => openModal('Manage Notifications')}
          onRowClick={openModal}
        />

        <ApiKeysCard apiKeys={s.apiKeys} />

        <SettingsCard
          icon={Link2}
          title="Connected Accounts"
          description="Manage your connected third-party accounts and wallets."
          rows={connectedAccountRows}
          ctaLabel="Manage Connections"
          onCtaClick={() => openModal('Manage Connections')}
          onRowClick={openModal}
        />

        <SettingsCard
          icon={BarChart2}
          title="Trading Preferences"
          description="Configure your default trading and display preferences."
          rows={tradingRows}
          ctaLabel="Manage Preferences"
          onCtaClick={() => openModal('Manage Preferences')}
          onRowClick={openModal}
        />

        <AppearanceCard
          appearance={s.appearance}
          onThemeChange={(v) => setS((p) => ({ ...p, appearance: { ...p.appearance, theme: v } }))}
          onToggle={toggleAppearance}
        />

        <SettingsCard
          icon={HelpCircle}
          title="Support & Others"
          description="Get help and manage other account preferences."
          rows={supportRows}
          ctaLabel="View Help Center"
          onCtaClick={() => openModal('View Help Center')}
          onRowClick={openModal}
        />
      </div>

      {/* Bottom security banner */}
      <div style={{
        backgroundColor: '#131815',
        border: '1px solid #1F2722',
        borderRadius: 12,
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            backgroundColor: '#1A2E14',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Lock size={16} color="#A8E000" />
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>
              Your account is protected
            </div>
            <div style={{ color: '#8B9890', fontSize: '0.78rem' }}>
              We use enterprise-grade encryption and security protocols to keep your data safe.
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#8B9890', fontSize: '0.75rem' }}>
              Last login: {s.lastLogin.time}
            </div>
            <div style={{ color: '#8B9890', fontSize: '0.75rem' }}>
              IP Address: {s.lastLogin.ip} &bull; {s.lastLogin.location}
            </div>
          </div>
          <button style={{
            padding: '8px 16px', borderRadius: 8,
            border: '1px solid #2A332D', backgroundColor: 'transparent',
            color: '#A8E000', fontSize: '0.82rem', fontWeight: 600,
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}>
            View Login History
          </button>
        </div>
      </div>

      {modal && <Modal title={modal} onClose={closeModal} />}
    </div>
  );
}
