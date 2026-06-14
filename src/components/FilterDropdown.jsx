export default function FilterDropdown({ label, value, options = [], onChange, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}>
      {label && (
        <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>{label}</span>
      )}
      <select
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        style={{
          backgroundColor: '#0E1310',
          border: '1px solid #1F2722',
          borderRadius: 8,
          color: '#FFFFFF',
          fontSize: '0.8rem',
          padding: '7px 10px',
          outline: 'none',
          cursor: 'pointer',
          appearance: 'none',
          WebkitAppearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B9890' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
          paddingRight: 28,
          minWidth: 0,
        }}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} style={{ backgroundColor: '#131815' }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextInput({ label, value, onChange, placeholder, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, ...style }}>
      {label && (
        <span style={{ color: '#8B9890', fontSize: '0.72rem', fontWeight: 500 }}>{label}</span>
      )}
      <input
        type="text"
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          backgroundColor: '#0E1310',
          border: '1px solid #1F2722',
          borderRadius: 8,
          color: '#FFFFFF',
          fontSize: '0.8rem',
          padding: '7px 10px',
          outline: 'none',
          minWidth: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}
