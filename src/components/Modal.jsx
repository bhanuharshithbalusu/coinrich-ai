import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ title, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: '#131815',
          border: '1px solid #1F2722',
          borderRadius: '14px',
          padding: '28px 32px',
          minWidth: '320px',
          maxWidth: '480px',
          width: '90%',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            color: '#6B7670', display: 'flex', alignItems: 'center',
          }}
        >
          <X size={18} />
        </button>
        <div style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 700, marginBottom: '10px' }}>
          {title}
        </div>
        <div style={{ color: '#8B9890', fontSize: '0.875rem' }}>Coming soon</div>
      </div>
    </div>
  );
}
