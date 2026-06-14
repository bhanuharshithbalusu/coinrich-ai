import { Link } from 'react-router-dom';

export default function TableCard({ title, viewAllHref, children, style: styleProp }) {
  return (
    <div
      style={{
        backgroundColor: '#131815',
        border: '1px solid #1F2722',
        borderRadius: '12px',
        padding: '16px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        height: '100%',
        boxSizing: 'border-box',
        ...styleProp,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px 12px 16px',
        }}
      >
        <span style={{ color: '#FFFFFF', fontSize: '0.9375rem', fontWeight: 600 }}>{title}</span>
        {viewAllHref && (
          <Link
            to={viewAllHref}
            style={{
              color: '#A8E000',
              fontSize: '0.8rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#94C700'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#A8E000'; }}
          >
            View all
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
