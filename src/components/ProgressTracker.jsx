export default function ProgressTracker({ steps }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
      {steps.map((step, i) => {
        const isCompleted = step.status === 'completed';
        const isInProgress = step.status === 'in_progress';
        const isLast = i === steps.length - 1;

        const circleColor = isCompleted
          ? '#A8E000'
          : isInProgress
          ? '#A8E000'
          : '#1F2722';

        const circleBorder = isInProgress ? '2px solid #A8E000' : 'none';
        const numberColor = isCompleted ? '#0A0E0C' : isInProgress ? '#A8E000' : '#6B7670';
        const circleBackground = isCompleted ? '#A8E000' : isInProgress ? 'transparent' : '#1A211C';

        return (
          <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start', flex: isLast ? '0 0 auto' : 1 }}>
            {/* Step */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: circleBackground,
                  border: circleBorder,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="#0A0E0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: numberColor }}>
                    {step.id}
                  </span>
                )}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: isInProgress ? '#FFFFFF' : isCompleted ? '#A8E000' : '#6B7670', whiteSpace: 'nowrap' }}>
                  {step.label}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#6B7670', marginTop: 2, whiteSpace: 'nowrap' }}>
                  {step.sublabel}
                </div>
              </div>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div style={{ flex: 1, height: 2, marginTop: 17, backgroundColor: isCompleted ? '#A8E000' : '#1F2722', minWidth: 24 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}
