import { CheckCircle2, Clock, Circle } from 'lucide-react';

const statusConfig = {
  completed: {
    label: 'Completed',
    color: '#A8E000',
    badgeBg: 'rgba(168,224,0,0.1)',
    Icon: CheckCircle2,
  },
  in_progress: {
    label: 'In Progress',
    color: '#F5A623',
    badgeBg: 'rgba(245,166,35,0.1)',
    Icon: Clock,
  },
  pending: {
    label: 'Pending',
    color: '#6B7670',
    badgeBg: 'rgba(107,118,112,0.1)',
    Icon: Circle,
  },
};

export default function VerificationStatusList({ steps }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {steps.map((step, i) => {
        const cfg = statusConfig[step.status] || statusConfig.pending;
        const { Icon } = cfg;
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: i < steps.length - 1 ? '1px solid #1F2722' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Icon size={16} color={cfg.color} />
              <span style={{ fontSize: '0.82rem', color: '#FFFFFF', fontWeight: 500 }}>
                {step.label}
              </span>
            </div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: cfg.color,
                backgroundColor: cfg.badgeBg,
                padding: '3px 8px',
                borderRadius: 20,
              }}
            >
              {cfg.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
