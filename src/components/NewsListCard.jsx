import { Link } from 'react-router-dom';

export default function NewsListCard({ title = 'Latest News', items = [], viewAllLink }) {
  return (
    <div
      style={{
        backgroundColor: '#131815',
        border: '1px solid #1F2722',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{ color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 600 }}>{title}</span>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            style={{ color: '#A8E000', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#94C700'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#A8E000'; }}
          >
            View all &rsaquo;
          </Link>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.8'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            <div
              style={{
                width: 56,
                height: 48,
                borderRadius: '8px',
                backgroundColor: '#1F2722',
                flexShrink: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <span style={{ color: '#8B9890', fontSize: '1.2rem' }}>📰</span>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  margin: '0 0 6px 0',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {item.title}
              </p>
              <span style={{ color: '#6B7670', fontSize: '0.72rem' }}>
                {item.source} · {item.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {viewAllLink && (
        <Link
          to={viewAllLink}
          style={{
            display: 'block',
            textAlign: 'center',
            color: '#A8E000',
            fontSize: '0.8rem',
            fontWeight: 500,
            textDecoration: 'none',
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #1F2722',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#94C700'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#A8E000'; }}
        >
          View all news →
        </Link>
      )}
    </div>
  );
}
