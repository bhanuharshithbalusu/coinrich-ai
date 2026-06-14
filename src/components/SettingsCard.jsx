import { ChevronRight } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch';

const BADGE_COLORS = {
  Connected: { bg: '#1A2E14', text: '#A8E000' },
  Enabled:   { bg: '#1A2E14', text: '#A8E000' },
  Active:    { bg: '#1A2E14', text: '#A8E000' },
  'Not Connected': { bg: '#1F1F1F', text: '#6B7670' },
  default:   { bg: '#1A2E14', text: '#A8E000' },
};

function BadgePill({ value }) {
  const colors = BADGE_COLORS[value] || BADGE_COLORS.default;
  return (
    <span style={{
      backgroundColor: colors.bg,
      color: colors.text,
      fontSize: '0.72rem',
      fontWeight: 600,
      padding: '2px 8px',
      borderRadius: 20,
      whiteSpace: 'nowrap',
    }}>
      {value}
    </span>
  );
}

function SettingsRow({ row, onToggle, onRowClick }) {
  const isClickable = (row.type === 'chevron' || row.type === 'link') && onRowClick;
  return (
    <div
      onClick={isClickable ? () => onRowClick(row.label) : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '9px 0',
        borderBottom: '1px solid #1F2722',
        cursor: isClickable ? 'pointer' : 'default',
      }}
    >
      <span style={{ color: '#FFFFFF', fontSize: '0.85rem' }}>{row.label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {row.type === 'text' && (
          <span style={{ color: '#8B9890', fontSize: '0.85rem' }}>{row.value}</span>
        )}
        {row.type === 'badge' && <BadgePill value={row.value} />}
        {row.type === 'toggle' && (
          <ToggleSwitch checked={!!row.value} onChange={(v) => onToggle && onToggle(row.key, v)} />
        )}
        {row.type === 'chevron' && (
          <>
            {row.value && <span style={{ color: '#8B9890', fontSize: '0.85rem' }}>{row.value}</span>}
            <ChevronRight size={15} color="#6B7670" />
          </>
        )}
        {row.type === 'link' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
            {row.value && (
              <span style={{ color: row.danger ? '#E5484D' : '#A8E000', fontSize: '0.85rem' }}>
                {row.value}
              </span>
            )}
            <ChevronRight size={15} color={row.danger ? '#E5484D' : '#6B7670'} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SettingsCard({
  icon: Icon,
  iconBg = '#1A2E14',
  iconColor = '#A8E000',
  title,
  description,
  rows = [],
  ctaLabel,
  onCtaClick,
  topRight,
  onToggle,
  onRowClick,
}) {
  return (
    <div
      style={{
        backgroundColor: '#131815',
        border: '1px solid #1F2722',
        borderRadius: 12,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            backgroundColor: iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {Icon && <Icon size={18} color={iconColor} />}
          </div>
          <div>
            <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>{title}</div>
            <div style={{ color: '#8B9890', fontSize: '0.78rem', lineHeight: 1.4, maxWidth: 180 }}>{description}</div>
          </div>
        </div>
        {topRight && <div>{topRight}</div>}
      </div>

      {/* Rows */}
      <div style={{ flex: 1 }}>
        {rows.map((row, i) => (
          <SettingsRow key={i} row={row} onToggle={onToggle} onRowClick={onRowClick} />
        ))}
      </div>

      {/* CTA */}
      {ctaLabel && (
        <button
          onClick={onCtaClick}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '10px 0',
            borderRadius: 8,
            border: '1px solid #2A332D',
            backgroundColor: 'transparent',
            color: '#A8E000',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
