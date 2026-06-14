import { Building2, Zap, FileText, Upload, Check } from 'lucide-react';

const iconMap = { bank: Building2, zap: Zap, 'file-text': FileText };

export default function FileUploadCard({ icon, title, description, status, onUpload, selected }) {
  const Icon = iconMap[icon] || FileText;
  const isSelected = status === 'selected' || selected;

  return (
    <div
      style={{
        backgroundColor: '#0A0E0C',
        border: `1px solid ${isSelected ? '#A8E000' : '#1F2722'}`,
        borderRadius: 12,
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        flex: 1,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 18,
            height: 18,
            borderRadius: '50%',
            backgroundColor: '#A8E000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Check size={11} color="#0A0E0C" strokeWidth={3} />
        </div>
      )}

      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: isSelected ? 'rgba(168,224,0,0.12)' : '#1A211C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={22} color={isSelected ? '#A8E000' : '#8B9890'} />
      </div>

      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#6B7670', lineHeight: 1.4 }}>{description}</div>
      </div>

      {isSelected ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#A8E000',
          }}
        >
          <Check size={13} color="#A8E000" />
          Selected
        </div>
      ) : (
        <button
          onClick={onUpload}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 14px',
            backgroundColor: 'transparent',
            border: '1px solid #2A332D',
            borderRadius: 8,
            color: '#FFFFFF',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Upload size={13} />
          Upload Document
        </button>
      )}
    </div>
  );
}
