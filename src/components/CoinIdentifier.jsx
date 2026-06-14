import { useState } from 'react';
import { useCoinIcons } from '../context/CoinIconsContext';

export default function CoinIdentifier({ iconUrl: iconUrlProp, symbol, name }) {
  const [imgFailed, setImgFailed] = useState(false);
  const iconMap = useCoinIcons();
  // Prefer live API URL from context; fall back to prop
  const iconUrl = (symbol && iconMap[symbol]) || iconUrlProp;
  const showImg = iconUrl && !imgFailed;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: '#1F2722',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {showImg ? (
          <img
            src={iconUrl}
            alt={symbol}
            style={{ width: 32, height: 32, objectFit: 'cover' }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span style={{ color: '#A8E000', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            {symbol?.slice(0, 4)}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', minWidth: 0, overflow: 'hidden' }}>
        <span style={{ color: '#FFFFFF', fontSize: '0.875rem', fontWeight: 700, flexShrink: 0 }}>{symbol}</span>
        <span style={{
          color: '#8B9890', fontSize: '0.8rem', fontWeight: 400,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{name}</span>
      </div>
    </div>
  );
}
