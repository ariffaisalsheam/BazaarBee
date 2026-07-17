import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../hooks/useLanguage';

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const { t } = useLanguage();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', margin: '20px 0', width: '100%' }}>
      <div style={{ position: 'relative', flexGrow: 1 }}>
        <span style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#9CA3AF',
          fontSize: '18px'
        }}>
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="input-field"
          style={{
            paddingLeft: '45px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)'
          }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
              fontSize: '14px',
              fontWeight: 700
            }}
          >
            ✖
          </button>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{
          borderRadius: 'var(--radius-md)',
          padding: '0 25px',
          whiteSpace: 'nowrap'
        }}
      >
        {t('searchBtn')}
      </button>
    </form>
  );
}
