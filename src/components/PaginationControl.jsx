export default function PaginationControl({ currentPage, totalPages, onPageChange }) {
  function pages() {
    // Show first 5, ellipsis, last page — matching reference design
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 5) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 4) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  }

  const btnBase = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: 32, height: 32, borderRadius: '6px', fontSize: '0.82rem', fontWeight: 500,
    border: '1px solid #1F2722', background: 'transparent', cursor: 'pointer',
    color: '#8B9890', transition: 'all 0.12s',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {/* Prev */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ ...btnBase, color: currentPage === 1 ? '#3A4440' : '#8B9890', borderColor: currentPage === 1 ? '#1A211C' : '#1F2722' }}
        onMouseEnter={e => { if (currentPage > 1) e.currentTarget.style.backgroundColor = '#1A211C'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        ‹
      </button>

      {pages().map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} style={{ color: '#8B9890', padding: '0 4px', fontSize: '0.82rem' }}>…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            style={{
              ...btnBase,
              backgroundColor: p === currentPage ? '#A8E000' : 'transparent',
              color: p === currentPage ? '#0A0E0C' : '#8B9890',
              borderColor: p === currentPage ? '#A8E000' : '#1F2722',
              fontWeight: p === currentPage ? 700 : 500,
            }}
            onMouseEnter={e => { if (p !== currentPage) e.currentTarget.style.backgroundColor = '#1A211C'; }}
            onMouseLeave={e => { if (p !== currentPage) e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ ...btnBase, color: currentPage === totalPages ? '#3A4440' : '#8B9890', borderColor: currentPage === totalPages ? '#1A211C' : '#1F2722' }}
        onMouseEnter={e => { if (currentPage < totalPages) e.currentTarget.style.backgroundColor = '#1A211C'; }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        ›
      </button>
    </div>
  );
}
