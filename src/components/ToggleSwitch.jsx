export default function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange && onChange(!checked)}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        backgroundColor: checked ? '#A8E000' : '#2A332D',
        border: 'none',
        padding: 2,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: checked ? 'flex-end' : 'flex-start',
        transition: 'background-color 0.2s',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          backgroundColor: '#fff',
          display: 'block',
          transition: 'transform 0.2s',
        }}
      />
    </button>
  );
}
