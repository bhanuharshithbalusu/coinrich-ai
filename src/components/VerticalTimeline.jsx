export default function VerticalTimeline({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const date = new Date(item.timestamp);
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

        return (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            {/* Timeline indicator */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: item.done ? '#A8E000' : 'transparent',
                  border: item.done ? 'none' : '2px solid #1F2722',
                  marginTop: 3,
                  flexShrink: 0,
                }}
              />
              {!isLast && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 28,
                    backgroundColor: '#1F2722',
                    marginTop: 4,
                    marginBottom: 4,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: isLast ? 0 : 16 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 500, color: item.done ? '#FFFFFF' : '#6B7670' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#6B7670', marginTop: 2 }}>
                {dateStr} · {time}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
